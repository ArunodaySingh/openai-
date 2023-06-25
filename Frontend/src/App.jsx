import { useState } from "react";
import Home from "./Home";
import Python from "./Python";

function App() {
  const [state, changeState] = useState(false);
  const [Homestate, changeStateHome] = useState(true);

  function clicked() {
    changeState(true);
    changeStateHome(false);
  }

  return (
    <>
      {state && <Python />}
      {Homestate && <Home clicked={clicked} />}
    </>
  );
}

export default App;
