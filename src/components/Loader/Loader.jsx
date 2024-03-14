import "./Loader.scss";
import { RingLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="loader">
      <div className="loader__spinner">
        <RingLoader size={250} color="#858db6" />
      </div>
      <div className="loader__text">Painting</div>
    </div>
  );
};

export default Loader;
