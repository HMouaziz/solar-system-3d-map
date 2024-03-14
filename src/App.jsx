import Canvas from "./components/Canvas/Canvas.jsx";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import Loader from "./components/Loader/Loader.jsx";

function App() {
  let canvasRef = useRef(null);
  const [canvasProp, setCanvasProp] = useState(null);
  const [planetList, setPlanetList] = useState(null);

  const getPlanets = async () => {
    const allowedPlanetList = [
      "Sun",
      "Mercury",
      "Venus",
      "Earth",
      "Mars",
      "Jupiter",
      "Saturn",
      "Neptune",
      "Uranus",
    ];
    try {
      const { data } = await axios.get(
        "https://api.le-systeme-solaire.net/rest/bodies?data=englishName,perihelion,meanRadius,semimajorAxis,sideralOrbit,inclination,eccentricity"
      );
      const list = data.bodies.filter((body) => {
        if (allowedPlanetList.includes(body.englishName)) {
          return body;
        }
      });
      setPlanetList(list);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getPlanets();
    setCanvasProp(canvasRef.current);
  }, [canvasRef]);

  return (
    <>
      <main>
        {!planetList && <Loader />}
        <section className="threeRenderer" ref={canvasRef}>
          {planetList && (
            <Canvas planetList={planetList} parentElement={canvasProp} />
          )}
        </section>
      </main>
    </>
  );
}

export default App;
