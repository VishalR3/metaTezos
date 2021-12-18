import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { gsap } from "gsap";
import * as OIMO from "oimo";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { incrementWinCount } from "../../utils/features/gameSlice";
import axios from 'axios'
// import diceModel from "../assets/models/dice.glb";

export default function Dice({ selectedValue, setSelectedValue, user, setUser }) {
  const diceRef = useRef(null);
  const [diceValue, setDiceValue] = useState(0);
  const [win, setWin] = useState(-1);
  const rounds = useSelector((state) => state.game.rounds);
  const winCount = useSelector((state) => state.game.winCount);
  const dispatch = useDispatch();
  useEffect(() => {
    let width = window.innerWidth;
    let height = window.innerHeight;

    // Debug Params

    let params = {
      cameraX: 1,
      cameraY: 1,
      cameraZ: 1.5,
    };
    params.rotationSpeed = 0;

    // OIMO
    let world = new OIMO.World({
      timestep: 1 / 60,
      iterations: 8,
      broadphase: 2,
      worldscale: 1,
      random: true,
      info: false,
      gravity: [0, -4.8, 0],
    });

    let ground = world.add({
      size: [20, 0.1, 20],
      pos: [0, -0.4, 0],
      density: 1,
    });

    let diceOptions = {
      type: "box",
      size: [0.3048, 0.3058, 0.3048],
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
    let dice = world.add(diceOptions);

    //Scene
    let scene = new THREE.Scene();
    // scene.background = new THREE.Color(0x00ffff);

    //Camera
    let camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(params.cameraX, params.cameraY, params.cameraZ);

    /*
     * Objects
     */
    let obj;
    let loader = new GLTFLoader();
    loader.load("./models/dice.glb", (gltf) => {
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
    const throwDice = () => {
      if (Math.hypot(dice.position.x - 0, dice.position.z - 0) > 3) {
        dice.position.x = 0;
        dice.position.z = 0;
      }
      gsap.to(dice.position, {
        duration: 1,
        y: 2,
      });
      dice.angularVelocity.set(
        Math.random() * 50 + Math.random() * 10,
        Math.random() * 5 + Math.random() * 10,
        Math.random() * 40 + Math.random() * 10
      );
    };

    //Cube
    // let geometry = new THREE.BoxBufferGeometry(0.3, 0.3, 0.3);
    // let material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
    // let cube = new THREE.Mesh(geometry, material);
    // cube.position.set(0, 0.8, 0);
    // cube.castShadow = true;
    // scene.add(cube);

    //Plane
    let planeGeometry = new THREE.PlaneBufferGeometry(20, 20);
    let planeMaterial = new THREE.MeshStandardMaterial({
      color: 0x00ffff,
      roughness: 0.7,
    });
    let plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = -0.375;
    plane.receiveShadow = true;
    scene.add(plane);

    /*
     * Lights
     */

    //Directional Lights
    let directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(2, 2, 2);
    directionalLight.shadow.camera.far = 12;
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    let pointLight = new THREE.PointLight(0xffffff, 10);
    pointLight.castShadow = true;
    pointLight.position.set(0, 5, 0);
    pointLight.shadow.camera.far = 7;
    scene.add(pointLight);

    //Ambient Lights
    let ambientLight = new THREE.AmbientLight(0xffffff, 10);
    scene.add(ambientLight);

    /*
     * Helper
     */

    //Axes Helper
    // let axesHelper = new THREE.AxesHelper( 5 );
    // scene.add( axesHelper );

    // // Light Shadow
    //   let lightHelper  = new THREE.CameraHelper(directionalLight.shadow.camera);
    //   scene.add(lightHelper);

    //Renderer
    let domElement = diceRef?.current;
    let renderer = new THREE.WebGLRenderer({
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
    let controls = new OrbitControls(camera, domElement);
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
    let topValue;
    function castRay() {
      let direction = new THREE.Vector3(0, -1, 0);
      raycaster.set(
        new THREE.Vector3(
          dice.position.x,
          dice.position.y + 2,
          dice.position.z
        ),
        direction.normalize()
      );
      // arrowHelper.setDirection(raycaster.ray.direction);
      // arrowHelper.position.set(
      //   dice.position.x,
      //   dice.position.y + 1,
      //   dice.position.z
      // );
      // arrowHelper.visible = true;

      // calculate objects intersecting the picking ray
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
          game: 'dice'
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
      if (obj) {
        let intersects = raycaster.intersectObjects(obj.children, true);

        // console.log(intersects);
        if (intersects[0].object.name.includes("Dot")) {
          topValue = intersects[0].object.name[3];
          setDiceValue(topValue);
          console.log(`You Got ${topValue}`);
          if (topValue === selectedValue) {
            console.log(`You Win`);
            setWin(1);
            updateCoins(12);
            dispatch(incrementWinCount());
          } else {
            setWin(0);
            updateCoins(-2)
            console.log(`You Lose`);
          }
        } else if (intersects[3].object.name.includes("Dot")) {
          topValue = 7 - Number(intersects[3].object.name[3]);
          setDiceValue(topValue);
          console.log(`You Got ${topValue}`);
          if (topValue === selectedValue) {
            setWin(1);
            updateCoins(12);
            dispatch(incrementWinCount());
            console.log(`You Win`);
          } else {
            setWin(0);
            updateCoins(-2)
            console.log(`You Lose`);
          }
        }

        isGameOver = true;
        document.removeEventListener("dblclick", throwDice);
        // destroy();
        setTimeout(() => {
          setSelectedValue(0);
        }, 1000);
      }
    }

    let loaded = false;
    // window.addEventListener("mousemove", castRay, false);
    let prevSleepState = 0;
    //Animate Function
    function animate() {
      if (!isGameOver) {
        requestAnimationFrame(animate);
      }
      controls.update();
      world.step();
      if (obj) {
        obj.position.copy(dice.getPosition());
        obj.quaternion.copy(dice.getQuaternion());
        camera.lookAt(obj.position);
      }
      if (dice.sleeping && prevSleepState === 0) {
        prevSleepState = 1;
        console.log("Now Resting");
        if (loaded) {
          castRay();
        } else {
          document.addEventListener("dblclick", throwDice);
          loaded = true;
        }
      } else if (!dice.sleeping && prevSleepState === 1) {
        console.log("Started Moving");
        prevSleepState = 0;
      }

      renderer.render(scene, camera);
    }
    function destroy() {
      scene = undefined;
      camera = undefined;
      world = undefined;
      dice = undefined;
      plane = undefined;
      ground = undefined;
      obj = undefined;
      raycaster = undefined;
      directionalLight = undefined;
      pointLight = undefined;
      ambientLight = undefined;
      diceOptions = undefined;
      controls = undefined;
    }
    animate();
  }, []);
  return (
    <>
      <div className="gameStat card">
        <div className="card-body">
          <div className="roundNo">Round: {rounds}</div>
          <div className="winCount">Wins: {winCount}</div>
          <div className="betValue">You Chose {selectedValue}</div>
          {diceValue !== 0 ? (
            <div className="coinValue">You Got {diceValue}</div>
          ) : (
            <div className="mt-3">
              <b>Double Click to throw Dice Up when its resting</b>
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
