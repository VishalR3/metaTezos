import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { gsap } from "gsap";
import * as OIMO from "oimo";
import { useDispatch, useSelector } from "react-redux";
import { incrementWinCount } from "../../utils/features/gameSlice";
import axios from 'axios';

export default function Coin({ selectedValue, setSelectedValue, user, setUser }) {
  const diceRef = useRef(null);
  const [coinValue, setCoinValue] = useState(-1);
  const [win, setWin] = useState(-1);
  const rounds = useSelector((state) => state.game.rounds);
  const winCount = useSelector((state) => state.game.winCount);
  const [mynCoin, setMynCoin] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    let width = window.innerWidth;
    let height = window.innerHeight;

    // Debug Params

    const params = {};
    params.rotationSpeed = 0;

    // OIMO
    const world = new OIMO.World({
      timestep: 1 / 60,
      iterations: 8,
      broadphase: 2,
      worldscale: 1,
      random: true,
      info: false,
      gravity: [0, -4.8, 0],
    });

    const ground = world.add({
      size: [20, 0.1, 20],
      pos: [0, -0.4, 0],
      density: 1,
    });

    axios.defaults.withCredentials=true;
    const headers = {
        "Content-Type": "application/json"
    }

    const updateCoins = (x) => {
      var data = {
        username: user.username,
        coins: Number(user.coins+x),
        description: {
          stat: (win)?'won':'lose',
          game: 'coin'
        },
        debit: (x===-2)?2:0,
        credit: (x===4)?4:0
      }
      data = JSON.stringify(data)
      axios.post("http://localhost:3001/updateCoins", data, headers)
      .then((res, err) => {
          setUser(res.data.user);
      })
      .catch(function (error) {
            alert(error.response.data.message);
        });
  }

    const coinOptions = {
      type: "box",
      size: [0.6, 0.06, 0.6],
      pos: [0, 2, 0],
      rot: [Math.random() * 360, Math.random() * 360, Math.random() * 360],
      move: true,
      density: 1,
      friction: 0.2,
      restitution: 0.2,
      belongsTo: 1,
      collideWith: 0xffffffff,
      isKinematic: true,
    };
    const coin = world.add(coinOptions);

    //Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x00ffff);

    //Camera
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(1, 1, 1.5);

    /*
     * Objects
     */
    let obj;
    const loader = new GLTFLoader();
    loader.load("./models/coin.glb", (gltf) => {
      obj = gltf.scene;
      obj.children = obj.children.map((child) => {
        if (child.type === "Mesh") {
          child.castShadow = true;
          // child.receiveShadow=true;
        }
        return child;
      });
      scene.add(obj);
    });
    const flipCoin = () => {
      if (Math.hypot(coin.position.x - 0, coin.position.z - 0) > 3) {
        coin.position.x = 0;
        coin.position.z = 0;
      }
      gsap.to(coin.position, {
        duration: 1,
        y: 2,
      });
      coin.angularVelocity.set(Math.random() * 25 + Math.random() * 50, 0, 0);
    };

    //Cube
    // const geometry = new THREE.BoxBufferGeometry(0.6, 0.06, 0.6);
    // const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
    // const cube = new THREE.Mesh(geometry, material);
    // cube.position.set(0, 0, 0);
    // cube.castShadow = true;
    // scene.add(cube);

    //Plane
    const planeGeometry = new THREE.PlaneBufferGeometry(20, 20);
    const planeMaterial = new THREE.MeshStandardMaterial({
      color: 0x00ffff,
      roughness: 0.7,
    });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = -0.4;
    plane.receiveShadow = true;
    scene.add(plane);

    /*
     * Lights
     */

    //Directional Lights
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(2, 2, 2);
    directionalLight.shadow.camera.far = 12;
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0xffffff, 10);
    pointLight.castShadow = true;
    pointLight.position.set(0, 5, 0);
    pointLight.shadow.camera.far = 7;
    scene.add(pointLight);

    //Ambient Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 10);
    scene.add(ambientLight);

    /*
     * Helper
     */

    //Axes Helper
    // const axesHelper = new THREE.AxesHelper( 5 );
    // scene.add( axesHelper );

    // // Light Shadow
    //   const lightHelper  = new THREE.CameraHelper(directionalLight.shadow.camera);
    //   scene.add(lightHelper);

    //Renderer
    const domElement = diceRef?.current;
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: domElement,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Shadows
    // directionalLight.castShadow = true;
    // cube.castShadow = true;
    // // cube.receiveShadow = true;
    // plane.receiveShadow = true;

    //Controls
    const controls = new OrbitControls(camera, domElement);
    controls.update();

    //RayCaster

    let raycaster = new THREE.Raycaster();
    // let arrowHelper = new THREE.ArrowHelper(
    //   raycaster.ray.direction,
    //   raycaster.ray.origin,
    //   12,
    //   0xff0000
    // );
    // arrowHelper.visible = false;
    // scene.add(arrowHelper);
    let isGameOver = false;

    function castRay() {
      let direction = new THREE.Vector3(0, -1, 0);
      raycaster.set(
        new THREE.Vector3(
          coin.position.x,
          coin.position.y + 2,
          coin.position.z
        ),
        direction.normalize()
      );
      // arrowHelper.setDirection(raycaster.ray.direction);
      // arrowHelper.position.set(
      //   coin.position.x,
      //   coin.position.y + 1,
      //   coin.position.z
      // );
      // arrowHelper.visible = true;

      // calculate objects intersecting the picking ray
      if (obj) {
        let intersects = raycaster.intersectObjects(obj.children, true);
        if (intersects[0].object.name.includes("Tail")) {
          console.log(`You Got Tail`);
          setCoinValue(1);
          if (selectedValue === 1) {
            console.log(`You Win`);
            setWin(1);
            setMynCoin(4);
            updateCoins(4);
            dispatch(incrementWinCount());
          } else {
            setWin(0);
            setMynCoin(-2);
            updateCoins(-2);
            console.log(`You Lose`);
          }
        } else {
          setCoinValue(0);
          console.log("You Got Head");
          if (selectedValue === 0) {
            setWin(1);
            setMynCoin(4);
            updateCoins(4);
            dispatch(incrementWinCount());
            console.log(`You Win`);
          } else {
            setWin(0);
            setMynCoin(-2)
            updateCoins(-2);
            console.log(`You Lose`);
          }
        }

        isGameOver = true;
        document.removeEventListener("dblclick", flipCoin);
        setTimeout(() => {
          setSelectedValue(-1);
        }, 1000);
      }
    }
    let loaded = false;
    let prevSleepState = 0;
    //Animate Function
    function animate() {
      if (!isGameOver) {
        requestAnimationFrame(animate);
      }
      controls.update();
      world.step();
      if (obj) {
        obj.position.copy(coin.getPosition());
        obj.quaternion.copy(coin.getQuaternion());
        camera.lookAt(obj.position);
      }
      if (coin.sleeping && prevSleepState === 0) {
        prevSleepState = 1;
        console.log("Now Resting");
        if (loaded) {
          castRay();
        } else {
          document.addEventListener("dblclick", flipCoin);
          loaded = true;
        }
      } else if (!coin.sleeping && prevSleepState === 1) {
        console.log("Started Moving");
        prevSleepState = 0;
      }

      renderer.render(scene, camera);
    }

    animate();
  }, []);
  return (
    <>
      <div className="gameStat card">
        <div className="card-body">
          <div className="roundNo">Round: {rounds}</div>
          <div className="winCount">Wins: {winCount}</div>
          <div className="betValue">
            You Chose <b>{selectedValue === 0 ? "Head" : "Tail"}</b>
          </div>
          {coinValue !== -1 ? (
            <div className="coinValue">
              You Got <b>{coinValue === 0 ? "Head" : "Tail"}</b>
            </div>
          ) : (
            <div className="mt-3">
              <b>Double Click to Flip Coin when its resting</b>
            </div>
          )}
          {win !== -1 ? (
            <div className="winStat">You {win === 0 ? "Lose" : "Win"}</div>
          ) : (
            ""
          )}
        </div>
      </div>
      <canvas ref={diceRef} className="dice"></canvas>
    </>
  );
}
