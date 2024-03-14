import * as THREE from 'three';
import randomColor from 'randomcolor';
import {useEffect, useRef} from "react";
import {OrbitControls} from "three/addons";
// import {TrackballControls} from "three/addons";



// eslint-disable-next-line react/prop-types
const Canvas = ({planetList}) => {
    const mountRef = useRef(null);

    useEffect(() => {

        const createPlanet = (size, color, distanceFromSun) => {
            const geometry = new THREE.SphereGeometry(size, 32, 32);
            const material = new THREE.MeshBasicMaterial({color: color});
            const planet = new THREE.Mesh(geometry, material);
            planet.position.set(distanceFromSun, 0,0);
            return planet;
        };

        const createOrbitLine = (semimajorAxis, segments) => {
            const points = [];
            const orbitRadius = semimajorAxis * 0.000001;
            for (let i = 0; i <= segments; i++) {
                const angle = (i / segments) * 2 * Math.PI;
                points.push(new THREE.Vector3(Math.cos(angle) * orbitRadius, 0, Math.sin(angle) * orbitRadius));
            }

            const geometry = new THREE.BufferGeometry().setFromPoints(points);
            const material = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.5 });
            const orbitLine = new THREE.LineLoop(geometry, material);

            return orbitLine;
        };



        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 10000);
        const renderer = new THREE.WebGLRenderer({antialias: true});
        renderer.setSize(window.innerWidth, window.innerHeight);

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
                let coef = 0.000001;
                let sun = 'Sun';
                let distanceFromSun = planet.perihelion * coef;
                let size = planet.englishName === sun ? planet.meanRadius * 0.0001 : planet.meanRadius * 0.001;
                let color = planet.englishName === sun ? 0xffff00 : randomColor();
                scene.add(createPlanet(size, color, distanceFromSun));

                let semimajorAxis = planet.semimajorAxis;
                scene.add(createOrbitLine(semimajorAxis, 100))
            });
        }

        // Adjust camera
        camera.position.z = 1000;

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

    return <div className='canvas' ref={mountRef}></div>;
};

export default Canvas;