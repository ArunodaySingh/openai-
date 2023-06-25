import { useState, useEffect } from "react";
import "./style/home.css";
import pyimg from "../image/pyimg.png";

function Python() {
  let finalQuerry = null;
  const [count, setCount] = useState(null);
  const [promptval, setPrompt] = useState(
    `Ask one random  Basic Level File Handling Question related to python`
  );
  const [storeData, setstoreData] = useState(" ");
  const [acctext, setacctext] = useState(" ");
  const [qusText, setqusText] = useState(" ");

  //fetch the value of count

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/levelhandler"); // Replace with your API endpoint
        let data = await response.json();
        // console.log(data.count);
        setCount(data.count);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  // handle the level
  useEffect(() => {
    if (count !== null) {
      (async () => {
        const option = {
          method: "POST",
          body: JSON.stringify({
            title: "Python",
            count: count,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        };
        try {
          const result = await fetch(
            "http://localhost:3000/levelhandler",
            option
          );
          console.log("i m called");
          const data = await result();
          console.log(data);
        } catch (err) {
          console.log(err);
        }
      })();
    }

    if (count >= 2 && count <= 3) {
      const level1Elements = document.querySelectorAll(".level1");
      const level2Elements = document.querySelectorAll(".level2");

      level1Elements.forEach((element) => {
        element.style.opacity = "0.1";
      });

      level2Elements.forEach((element) => {
        element.style.opacity = "1";
      });

      setPrompt(
        `Ask one random Moderate level File Handling Question related to python`
      );
    } else if (count > 3) {
      const level1Elements = document.querySelectorAll(".level2");
      const level2Elements = document.querySelectorAll(".level3");

      level1Elements.forEach((element) => {
        element.style.opacity = "0.1";
      });

      level2Elements.forEach((element) => {
        element.style.opacity = "1";
      });
      setPrompt(
        `Ask one random  hard level File Handling Question related to python`
      );
    } else {
      setPrompt(
        `Ask one random  Basic Level File Handling Question related to python`
      );
    }
  }, [count]);

  // handle the event
  const handleSubmit = () => {
    console.log(count);
    console.log(promptval);

    setacctext(" ");
    setstoreData(" ");

    const getMessage = async () => {
      const option = {
        method: "POST",
        body: JSON.stringify({
          message: promptval,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      };
      try {
        const result = await fetch("http://localhost:3000/", option);
        const data = await result.json();
        console.log(data.content);
        setqusText(data.content);
      } catch (err) {
        console.log(err);
      }
    };
    getMessage();
  };

  //handle the solution accuracy

  const handleAccuracy = () => {
    const getMessage = async () => {
      const option = {
        method: "POST",
        body: JSON.stringify({
          message: finalQuerry,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      };
      try {
        const result = await fetch("http://localhost:3000", option);
        const data = await result.json();
        console.log(
          `%c${data.content}`,
          "color: blue; font-weight: bold; background-color: yellow"
        );
        // setacctext(data.content);
        const numbers = data.content.match(/\d+/g);
        // console.log(numbers);
        setacctext(numbers[0] + "%");
        // console.log(typeof Number(numbers[0]));
        if (Number(numbers[0]) > 75) {
          setCount(count + 1);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getMessage();
  };

  // handle answer
  const handleAns = () => {
    finalQuerry = `lets play a game, i will answer a question,
    you just have to cross-check my answer and 
    rate this answer in % format out of 100% accuracy,
    no explanation needed, give 0% if answer is totally 
    irrelevant, 25% if somehow relevant, 75% -80% if almost 
    relevant and correct and 95%-100% if answer is totally 
    correct and relevant, rest use your own logic,
    Question= ${qusText} Answer= ${storeData}`;

    handleAccuracy();
  };

  // store solution here
  const ansWrite = async (e) => {
    setstoreData(e.target.value);
  };

  // hide one part
  function generateQus() {
    const quesElements = document.getElementsByClassName("bodypy");
    for (let i = 0; i < quesElements.length; i++) {
      quesElements[i].style.display = "none";
    }
    handleSubmit(); // Pass a dummy event object
  }

  return (
    <div className="pythonHome">
      <div className="navbar">
        <span>
          <h2>Dev</h2>{" "}
        </span>{" "}
        <h2>HOLIC</h2>
      </div>
      <div className="bodypy">
        <div className="imgpy">
          <div className="img4">
            <img className="python" src={pyimg} alt="imgjava" />
          </div>
        </div>
        <div className="contentpy">
          <button onClick={generateQus} id="1" className="fs">
            File Handling
          </button>
          <button id="2" className="oops">
            OOPS
          </button>
          <button id="3" className="ds">
            DS
          </button>
          <button id="4" className="stl">
            Loops
          </button>
        </div>
      </div>

      <div className="ques">
        <div className="left">
          <textarea
            id="ta1"
            readOnly
            type="text"
            value={qusText}
            className="qus"
            placeholder="QUS:"
            cols="30"
            rows="5"
          />
          <br />
          <textarea
            onChange={ansWrite}
            value={storeData}
            name=""
            id="ta2"
            cols="30"
            rows="10"
          ></textarea>
          <button onClick={handleSubmit} className="next">
            Next
          </button>
        </div>
        <div className="right">
          <div className="level">
            <span className="level1">Easy</span>
            <span className="level2">Moderate</span>
            <span className="level3">Hard</span>
          </div>

          <div id="putAccu" style={{ position: "relative" }}>
            <input value={acctext} type="text" className="accuracy" readOnly />
            <label
              style={{
                position: "absolute",
                top: "50%",
                transform: "translateY(-50%)",
                left: "10px",
              }}
            >
              Accuracy:
            </label>
          </div>

          <button onClick={handleAns} className="check">
            Check Accuracy
          </button>
        </div>
      </div>
    </div>
  );
}

export default Python;
