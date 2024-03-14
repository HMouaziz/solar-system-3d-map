import * as THREE from 'three';
import randomColor from 'randomcolor';
import { useEffect, useRef } from "react";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const Canvas = ({planetList}) => {
    const mountRef = useRef(null);

    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 10000);
        const renderer = new THREE.WebGLRenderer({antialias: true});
        renderer.setSize(window.innerWidth, window.innerHeight);


        const controls = new OrbitControls(camera, renderer.domElement);
        controls.minDistance = 0.5;  // Minimum zoom distance
        controls.maxDistance = 100; // Maximum zoom distance
        controls.enablePan = false;

        mountRef.current.appendChild(renderer.domElement);

        // Lighting
        const light = new THREE.PointLight(0xffffff, 1, 100);
        light.position.set(10, 10, 10);
        scene.add(light);

        const scale = 0.00000001;

        planetList?.forEach((planet) => {
            const distanceFromSun = planet.semimajorAxis * scale;
            const size = planet.englishName === "Sun" ? planet.meanRadius * scale * 30 : planet.meanRadius * scale * 1000;
            const color = planet.englishName === "Sun" ? 0xffff00 : randomColor();
            let inclination = planet.inclination;
            let semimajorAxis = planet.semimajorAxis * scale;

            const planetMesh = createPlanet(size, color, distanceFromSun);
            planetMesh.userData.isPlanet = true;
            scene.add(planetMesh);

            const orbitLine = createOrbitLine(semimajorAxis, 100, inclination);
            scene.add(orbitLine);
        });

        camera.position.z = 1;

        const animate = function () {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
            controls.update();
        };

        animate();

        return () => {
            mountRef.current.removeChild(renderer.domElement);
        };

        function createPlanet(size, color, distanceFromSun) {
            const geometry = new THREE.SphereGeometry(size, 32, 32);
            const material = new THREE.MeshBasicMaterial({color: color});
            const planet = new THREE.Mesh(geometry, material);
            planet.position.set(distanceFromSun, 0, 0);
            return planet;
        }

        function createOrbitLine(semimajorAxis, segments, inclination) {
            const points = [];
            for (let i = 0; i <= segments; i++) {
                const angle = (i / segments) * 2 * Math.PI;
                points.push(new THREE.Vector3(Math.cos(angle) * semimajorAxis, 0, Math.sin(angle) * semimajorAxis));
            }

            const geometry = new THREE.BufferGeometry().setFromPoints(points);
            const material = new THREE.LineBasicMaterial({color: 0xffffff, transparent: true, opacity: 0.5});
            const orbitLine = new THREE.LineLoop(geometry, material);
            orbitLine.rotation.x = THREE.MathUtils.degToRad(inclination);

            return orbitLine;
        }
    }, [planetList]);

    return <div className='canvas' ref={mountRef}></div>;
};

export default Canvas;
