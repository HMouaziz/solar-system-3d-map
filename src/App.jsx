import './App.css'
import Canvas from "./components/Canvas/Canvas.jsx";
import axios from "axios";
import {useEffect, useState} from "react";

function App() {
    const [planetList, setPlanetList] = useState(null)

    const getPlanets = async () => {
        const allowedPlanetList = ['Sun', 'Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Neptune', 'Uranus'];
        try {
            const {data} = await axios.get('https://api.le-systeme-solaire.net/rest/bodies?data=englishName,perihelion,meanRadius,semimajorAxis,sideralOrbit,inclination,eccentricity');
            const list = data.bodies.filter((body) => {
                if (allowedPlanetList.includes(body.englishName)) {
                    return body;
                }
            })
            setPlanetList(list)
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        getPlanets()
    }, []);

  return (
    <>
        {planetList &&  <Canvas planetList={planetList}/>}
        {!planetList && "Loading..."}
    </>
  )
}

export default App
