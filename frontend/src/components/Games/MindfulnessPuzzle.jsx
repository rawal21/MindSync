import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import calmingMusic from "@/assets/calming-music.mp3";
import pieceClickSound from "@/assets/piece-click.mp3";
import img1 from "../images/puzzle-3.jpeg";
import img2 from "../images/3D render of a cute tropical fish in an aquarium on a dark blue background, digital art.webp";
import img3 from "../images/An abstract oil painting of a river.webp";
import img4 from "../images/image puzzle-1.webp";

const puzzleImages = [img1, img2, img3, img4];

const difficulties = {
  Easy: 3,
  Medium: 4,
  Hard: 5,
};

export default function MindfulnessPuzzle() {
  const [difficulty, setDifficulty] = useState("Easy");
  const [gridSize, setGridSize] = useState(difficulties.Easy);
  const [puzzleState, setPuzzleState] = useState([]);
  const [emptyIndex, setEmptyIndex] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    initializePuzzle();
  }, [gridSize, imageIndex]);

  const initializePuzzle = () => {
    const totalPieces = gridSize ** 2;
    const pieces = Array.from({ length: totalPieces }, (_, i) => i);
    const shuffledPieces = shuffleArray(pieces);
    setPuzzleState(shuffledPieces);
    setEmptyIndex(shuffledPieces.indexOf(totalPieces - 1));
    setCompleted(false);
  };

  const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

  const handlePieceClick = (index) => {
    const [row, col] = [Math.floor(index / gridSize), index % gridSize];
    const [emptyRow, emptyCol] = [
      Math.floor(emptyIndex / gridSize),
      emptyIndex % gridSize,
    ];

    const isAdjacent =
      (Math.abs(row - emptyRow) === 1 && col === emptyCol) ||
      (Math.abs(col - emptyCol) === 1 && row === emptyRow);

    if (isAdjacent) {
      const newPuzzleState = [...puzzleState];
      [newPuzzleState[index], newPuzzleState[emptyIndex]] = [
        newPuzzleState[emptyIndex],
        newPuzzleState[index],
      ];
      setPuzzleState(newPuzzleState);
      setEmptyIndex(index);
      playSound(pieceClickSound);

      if (isPuzzleSolved(newPuzzleState)) {
        setCompleted(true);
        alert("Congratulations! You solved the puzzle!");
      }
    }
  };

  const isPuzzleSolved = (puzzle) =>
    puzzle.every((value, index) => value === index);

  const changeImage = () => {
    setImageIndex((prevIndex) => (prevIndex + 1) % puzzleImages.length);
  };

  const completePuzzle = () => {
    const totalPieces = gridSize ** 2;
    const solvedPuzzle = Array.from({ length: totalPieces }, (_, i) => i);
    setPuzzleState(solvedPuzzle);
    setEmptyIndex(totalPieces - 1);
    setCompleted(true);
  };

  return (
    <div className="min-h-screen p-4 flex flex-col items-center bg-green-300">
      <audio src={calmingMusic} autoPlay loop />
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-center">Mindfulness Puzzle</h1>
      <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-4 w-full">
        <select
          value={difficulty}
          onChange={(e) => {
            setDifficulty(e.target.value);
            setGridSize(difficulties[e.target.value]);
          }}
          className="px-3 py-2 rounded text-sm sm:text-base"
        >
          {Object.keys(difficulties).map((level) => (
            <option key={level} value={level}>{level}</option>
          ))}
        </select>
        <Button onClick={initializePuzzle}>Reset</Button>
        <Button onClick={changeImage}>Change Image</Button>
        <Button onClick={completePuzzle}>Complete</Button>
      </div>
      <div
        className="grid gap-1 w-full max-w-[600px]"
        style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}
      >
        {puzzleState.map((piece, index) => (
          <div
            key={index}
            className={`border aspect-square ${piece === gridSize ** 2 - 1 ? "bg-white" : ""}`}
            style={{
              backgroundImage:
                piece !== gridSize ** 2 - 1 ? `url(${puzzleImages[imageIndex]})` : "none",
              backgroundSize: `${gridSize * 100}% ${gridSize * 100}%`,
              backgroundPosition: `${(piece % gridSize) * (100 / (gridSize - 1))}% ${Math.floor(piece / gridSize) * (100 / (gridSize - 1))}%`,
            }}
            onClick={() => handlePieceClick(index)}
          />
        ))}
      </div>
      {completed && <div className="text-lg font-bold text-green-700 mt-4">Puzzle Completed!</div>}
    </div>
  );
}
