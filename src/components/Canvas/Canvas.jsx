import * as THREE from "three";
import randomColor from "randomcolor";
import { useEffect, useRef } from "react";
import { OrbitControls } from "three/addons";
import "./Canvas.scss";
import CelestialObject from "../../classes/CelestialObject.js";

// eslint-disable-next-line react/prop-types
const Canvas = ({ planetList }) => {
  const mountRef = useRef(null);

  useEffect(() => {

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.01,
      10000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight / 2);
    camera.aspect = window.innerWidth / (window.innerHeight / 2);
    camera.updateProjectionMatrix();

    let controls = new OrbitControls(camera, renderer.domElement);
    controls.listenToKeyEvents(window);

    mountRef.current.appendChild(renderer.domElement);

    // Lighting
    const light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(10, 10, 10);
    scene.add(light);

    // Solar System Bodies
    if (planetList) {
      // eslint-disable-next-line react/prop-types
      planetList.forEach((planet) => {
        const scaleFactor = 1e-6;
        const geometry = new THREE.SphereGeometry(1000000, 32, 32);
        const material = new THREE.MeshBasicMaterial({ color: randomColor() });
        const newPlanet = new CelestialObject(geometry, material, planet, scaleFactor)
        newPlanet.addMesh(scene)
        console.log(planet.englishName + ' added')
      });
    }

    // Adjust camera
    camera.position.z = 10; // Adjusted based on scale
    camera.aspect = window.innerWidth / (window.innerHeight / 2);
    camera.updateProjectionMatrix();

    controls.enablePan =false;

    mountRef.current.appendChild(renderer.domElement);

    const gridHelper = new THREE.GridHelper(100, 100);
    scene.add(gridHelper);
    const animate = function () {
      requestAnimationFrame(animate);

      renderer.render(scene, camera);

      controls.update();
    };

    animate();

    return () => {
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return <div className="canvas" ref={mountRef}></div>;
};

export default Canvas;
