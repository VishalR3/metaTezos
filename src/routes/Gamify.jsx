import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { gsap } from "gsap";
import { useHistory } from "react-router";

const Gamify = () => {
  const [gameProgress, setGameProgress] = useState(0);
  const houseRef = useRef(null);
  const history = useHistory();
  let scene;
  let camera;
  let obj;
  let cube;

  useEffect(() => {
    let width = window.innerWidth;
    let height = window.innerHeight;

    // Debug Params

    let params = {
      cameraX: 0,
      cameraY: 10,
      cameraZ: 20,
    };
    params.rotationSpeed = 0;

    //Scene
    if (scene === undefined) {
      scene = new THREE.Scene();
    }
    // scene.background = new THREE.Color(0x00ffff);

    //Camera
    if (camera === undefined) {
      camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    }
    camera.position.set(params.cameraX, params.cameraY, params.cameraZ);

    /*
     * Objects
     */
    if (obj === undefined) {
      let loader = new GLTFLoader();
      loader.load("./models/myntraHouse.glb", (gltf) => {
        obj = gltf.scene;
        obj.traverse((child) => {
          // child.castShadow = true;
          // child.receiveShadow = true;
          if (
            child instanceof THREE.Mesh &&
            child.material instanceof THREE.MeshStandardMaterial
          ) {
            if (child.name === "Gate2" || child.name === "Gate1") {
              child.material.transparent = true;
              child.material.color = new THREE.Color("#000000");
            }
            if (child.material.name === "Glass") {
              child.material.transparent = true;
              child.material.transmission = 0.5;
              child.material.color = new THREE.Color("#addce7");
            }
          }
        });
        scene.add(obj);
      });
    }
    const moveCam = () => {
      gsap.to(camera.position, {
        duration: 1,
        x: -1,
        y: 2,
        z: 4,
      });
      gsap.to(camera.position, {
        duration: 0.5,
        delay: 0.95,
        x: -1,
        y: 2,
        z: 1,
      });
      gsap.to(camera.position, {
        duration: 0.5,
        delay: 1.5,
        x: 0,
        y: 2,
        z: 1,
      });
    };
    // Cube
    // if (cube === undefined) {
    //   let geometry = new THREE.BoxBufferGeometry(1, 1, 1);
    //   let material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
    //   cube = new THREE.Mesh(geometry, material);
    //   cube.position.set(6, -1, -2);
    //   // cube.castShadow = true;
    //   // cube.receiveShadow = true;
    //   scene.add(cube);
    // }

    //Plane
    // let planeGeometry = new THREE.PlaneBufferGeometry(50, 50);
    // let planeMaterial = new THREE.MeshStandardMaterial({
    //   color: 0x00ffff,
    //   roughness: 0.7,
    // });
    // let plane = new THREE.Mesh(planeGeometry, planeMaterial);
    // plane.rotation.x = -Math.PI / 2;
    // // plane.position.x = 10;
    // plane.position.y = -2.1336;
    // plane.receiveShadow = true;
    // scene.add(plane);

    /*
     * Lights
     */

    //Ambient Lights
    let ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);
    // let hemiLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
    // scene.add(hemiLight);

    let grLight = new THREE.PointLight(0x0000ff, 1);
    grLight.position.z = 1.52;
    scene.add(grLight);
    let rrLight = new THREE.PointLight(0xff0000, 1);
    rrLight.position.z = -5.78;
    scene.add(rrLight);

    /*
     * Helper
     */
    //Axes Helper
    // let axesHelper = new THREE.AxesHelper(20);
    // scene.add(axesHelper);

    //Renderer
    let domElement = houseRef?.current;
    let renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: domElement,
      alpha: true,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;

    //Controls
    let controls = new OrbitControls(camera, domElement);
    controls.minDistance = 0;
    controls.maxDistance = 20;
    controls.maxPolarAngle = Math.PI / 2;
    controls.update();

    let isGameOver = false;

    //Game Progress Logic
    let raycaster = new THREE.Raycaster();
    let mouse = new THREE.Vector2();
    window.addEventListener("dblclick", () => {
      moveCam();
      setGameProgress(1);
      window.addEventListener("mousedown", castRay);
    });
    window.addEventListener("keydown", (e) => {
      if (e.keyCode === 13) {
        // Cancel the default action, if needed
        e.preventDefault();
        moveCam();
        setGameProgress(1);
        window.addEventListener("mousedown", castRay);
      }
    });
    function castRay(event) {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);

      // calculate objects intersecting the picking ray
      let intersects = raycaster.intersectObjects(obj.children);

      for (let i = 0; i < intersects.length; i++) {
        console.log(intersects[i].object.name);
        if (
          intersects[i].object.name.includes("BoardGames") ||
          intersects[i].object.name.includes("Text")
        ) {
          isGameOver = true;
          window.removeEventListener("mousedown", castRay);
          history.push("/chooseGame");
        } else if (
          intersects[i].object.name.includes("BoardRecycle") ||
          intersects[i].object.name.includes("Text001")
        ) {
          isGameOver = true;
          window.removeEventListener("mousedown", castRay);
          history.push("/recycle");
        }
      }
    }

    //Animate Function
    function animate() {
      if (!isGameOver) {
        requestAnimationFrame(animate);
      }
      controls.update();
      if (obj) {
        camera.lookAt(new THREE.Vector3(0, 2, -3));
      }

      renderer.render(scene, camera);
    }
    animate();
  }, []);

  return (
    <>
      <div className="gameSteps">
        <ActionBar
          gameProgress={gameProgress}
          setGameProgress={setGameProgress}
        />
      </div>
      <canvas ref={houseRef} className="house"></canvas>
    </>
  );
};

const ActionBar = ({ gameProgress, setGameProgress }) => {
  if (gameProgress === 0) {
    return (
      <>
        <div className="actionBar">
          <div className="gameHint">
            Press Enter/ Double Click for Entering the House
          </div>
        </div>
      </>
    );
  } else if (gameProgress === 1) {
    return (
      <>
        <div className="actionBar">
          <div className="gameHint">Tap on Games/ Recycle Board</div>
        </div>
      </>
    );
  } else {
    <>
      <div className="actionBar">
        <div className="gameHint">You Broke the Game</div>
      </div>
    </>;
  }
};

export default Gamify;
