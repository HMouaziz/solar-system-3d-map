import * as THREE from "three";

export const Planet = () => {

    const createPlanet = (size, color, distanceFromSun) => {
        const geometry = new THREE.SphereGeometry(size, 32, 32);
        const material = new THREE.MeshBasicMaterial({ color: color });
        const planet = new THREE.Mesh(geometry, material);
        planet.position.x = distanceFromSun;
        return planet;
    };

    // Sun
    const sun = createPlanet(5, 0xffff00, 0);
    scene.add(sun);

    // Earth
    const earth = createPlanet(1, 0x0000ff, 10);
    scene.add(earth);

    return (
        <>
        </>
    )
}