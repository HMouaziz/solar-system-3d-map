import Canvas from "./components/Canvas/Canvas.jsx";
import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "./components/Loader/Loader.jsx";

function App() {
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
        "https://api.le-systeme-solaire.net/rest/bodies"
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
  }, []);

  return (
    <>
      <main className="app">
        {!planetList ? (
          <Loader />
        ) : (
          <>
            <section className="appHeader">
              A 3D Mapper of The Solar System
            </section>
            <section className="threeRenderer">
              {planetList && <Canvas planetList={planetList} />}
            </section>
            <section className="appFooter">
              Use your mouse to control the map.
            </section>
          </>
        )}
      </main>
    </>
  );
}

export default App;
