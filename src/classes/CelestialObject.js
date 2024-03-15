import * as THREE from 'three';


export default class CelestialObject extends THREE.Mesh {
    constructor(geometry, material, data, scaleFactor) {
        super(geometry, material);
        // Basic information
        this.name = data.englishName;
        this.isPlanet = data.isPlanet;
        this.bodyType = data.bodyType;
        this.scaleFactor = scaleFactor;

        // Orbit parameters
        this.semiMajorAxis = data.semimajorAxis;
        this.perihelion = data.perihelion;
        this.aphelion = data.aphelion;
        this.eccentricity = data.eccentricity;
        this.inclination = data.inclination;
        this.sideralOrbit = data.sideralOrbit;
        this.sideralRotation = data.sideralRotation;
        this.meanAnomaly = data.meanAnomaly;
        this.argPeriapsis = data.argPeriapsis;
        this.longAscNode = data.longAscNode;
        this.axialTilt = data.axialTilt;

        // Physical characteristics
        this.mass = data.mass.massValue * Math.pow(10, data.mass.massExponent);
        this.volume = data.vol.volValue * Math.pow(10, data.vol.volExponent);
        this.density = data.density;
        this.gravity = data.gravity;
        this.escapeVelocity = data.escape;
        this.meanRadius = data.meanRadius;
        this.equaRadius = data.equaRadius;
        this.polarRadius = data.polarRadius;
        this.flattening = data.flattening;
        this.avgTemp = data.avgTemp;

        // Moons
        this.moons = data.moons;

        // Modifications
        this.geometry.scale(scaleFactor, scaleFactor, scaleFactor)
    }

    addMesh(scene) {
        // Create orbit geometry
        const curve = new THREE.EllipseCurve(
            0, 0,                                    // center x, center y
            this.semiMajorAxis, this.semiMajorAxis * Math.sqrt(1 - this.eccentricity ** 2), // xRadius, yRadius
            0, 2 * Math.PI,                          // start angle, end angle
            false,                                   // clockwise
            0                                        // rotation
        );

        // Convert the curve to a THREE.Geometry
        const points = curve.getPoints(100);
        const orbitGeometry = new THREE.BufferGeometry().setFromPoints(points);
        const orbitMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
        const orbitLine = new THREE.Line(orbitGeometry, orbitMaterial);

        // Adjust orbit inclination
        orbitLine.rotateX(this.inclination);

        // Add the orbit line to the scene
        scene.add(orbitLine);

        // Position the mesh based on mean anomaly (simplified example)
        // This is a simplified example. For accurate positioning based on mean anomaly,
        // more complex calculations involving Kepler's laws would be needed.
        const radius = this.semiMajorAxis; // Assuming a circular orbit for simplicity
        this.position.set(radius * Math.cos(this.meanAnomaly), radius * Math.sin(this.meanAnomaly), 0);

        // Adjust mesh orientation for axial tilt
        this.rotateZ(this.axialTilt);

        // Add the celestial object mesh to the scene
        scene.add(this);
    }

}
