import React, { useState, useEffect } from "react";
// import "../index.css"; // Tailwind styles should be imported here.

const SimonSays = () => {
  const [gameSeq, setGameSeq] = useState([]);
  const [userSeq, setUserSeq] = useState([]);
  const [started, setStarted] = useState(false);
  const [level, setLevel] = useState(0);

  const btns = ["yellow", "red", "purple", "green"];

  useEffect(() => {
    const handleKeyPress = () => {
      if (!started) {
        setStarted(true);
        levelUp();
      }
    };

    document.addEventListener("keypress", handleKeyPress);
    return () => document.removeEventListener("keypress", handleKeyPress);
  }, [started]);

  const gameFlash = (btn) => {
    btn.classList.add("flash");
    setTimeout(() => btn.classList.remove("flash"), 250);
  };

  const userFlash = (btn) => {
    btn.classList.add("userflash");
    setTimeout(() => btn.classList.remove("userflash"), 250);
  };

  const levelUp = () => {
    setUserSeq([]);
    setLevel((prevLevel) => prevLevel + 1);

    const randIdx = Math.floor(Math.random() * 4);
    const randColor = btns[randIdx];
    const randBtn = document.getElementById(randColor);

    setGameSeq((prevSeq) => {
      const newSeq = [...prevSeq, randColor];
      setTimeout(() => gameFlash(randBtn), 500);
      return newSeq;
    });
  };

  const checkAns = (idx) => {
    if (userSeq[idx] === gameSeq[idx]) {
      if (userSeq.length === gameSeq.length) {
        setTimeout(levelUp, 1000);
      }
    } else {
      document.body.style.backgroundColor = "red";
      setTimeout(() => (document.body.style.backgroundColor = "white"), 150);
      resetGame();
    }
  };

  const btnPress = (color) => {
    const btn = document.getElementById(color);
    userFlash(btn);

    setUserSeq((prevSeq) => {
      const newSeq = [...prevSeq, color];
      checkAns(newSeq.length - 1);
      return newSeq;
    });
  };

  const resetGame = () => {
    setStarted(false);
    setGameSeq([]);
    setUserSeq([]);
    setLevel(0);
  };

  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold my-4">Simon Says Game</h1>
      <h2 className="text-xl font-medium my-4">
        {started ? `Level ${level}` : "Press any key to start the game"}
      </h2>

      <div className="flex flex-col items-center">
        <div className="flex">
          <div
            id="red"
            className="btn bg-red-400 border-black border-4 m-4"
            onClick={() => btnPress("red")}
          ></div>
          <div
            id="yellow"
            className="btn bg-yellow-400 border-black border-4 m-4"
            onClick={() => btnPress("yellow")}
          ></div>
        </div>
        <div className="flex">
          <div
            id="green"
            className="btn bg-green-400 border-black border-4 m-4"
            onClick={() => btnPress("green")}
          ></div>
          <div
            id="purple"
            className="btn bg-purple-400 border-black border-4 m-4"
            onClick={() => btnPress("purple")}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default SimonSays;
