import cimg from "../image/clogfo.png";
import javaimg from "../image/java0002.png";
import jsimg from "../image/jsLogo.png";
import pyimg from "../image/pyimg.png";
import "./style/home.css";

function Home({ clicked }) {
  return (
    <div className="home">
      <div className="navbar">
        {" "}
        <span>
          <h2>Dev</h2>{" "}
        </span>{" "}
        <h2>HOLIC</h2>
      </div>
      <div className="img_box">
        <div className="img1">
          <img className="c++" src={cimg} alt="imgjava" />
        </div>
        <div className="img2">
          <img className="js" src={javaimg} alt="imgjava" />
        </div>
        <div className="img3">
          <img className="java" src={jsimg} alt="imgjava" />
        </div>
        <div className="img4">
          <img onClick={clicked} className="python" src={pyimg} alt="imgjava" />
        </div>
      </div>
    </div>
  );
}

export default Home;
