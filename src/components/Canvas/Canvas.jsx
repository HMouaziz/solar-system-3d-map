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
            planet.position.x = distanceFromSun;
            return planet;
        };



        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
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
                console.log(planet)
                let coef = 0.000001;
                let sun = 'Sun';
                let distanceFromSun = planet.perihelion * coef;
                let size = planet.englishName === sun ? planet.meanRadius * 0.0001 : planet.meanRadius * 0.001;
                let color = planet.englishName === sun ? 0xffff00 : randomColor();
                scene.add(createPlanet(size, color, distanceFromSun));
            });
        }

        // Adjust camera
        camera.position.z = 1000;

        // const controls = new THREE.TrackballControls( camera );
        // controls.target.set( 0, 0, 0 );
        //
        // controls.rotateSpeed = 1.0;
        // controls.zoomSpeed = 1.2;
        // controls.panSpeed = 0.8;
        //
        // controls.noZoom = false;
        // controls.noPan = false;
        //
        // controls.staticMoving = false;
        // controls.dynamicDampingFactor = 0.15;
        //
        // controls.keys = [ 65, 83, 68 ];

        // Animation loop
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