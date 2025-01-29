import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import styles from './ColorTherapyGame.module.css'; // Import CSS Module

const ColorTherapyGame = () => {
  // State for selected color and progress tracking
  const [color, setColor] = useState("#FF5733");
  const [completedLevels, setCompletedLevels] = useState(0);
  const [achievements, setAchievements] = useState([]);

  // Handle color change
  const handleColorChange = (e) => {
    setColor(e.target.value);
  };

  // Handle level completion
  const handleLevelCompletion = () => {
    setCompletedLevels(completedLevels + 1);
    setAchievements([...achievements, `Completed Level ${completedLevels + 1}`]);
  };

  return (
    <div className={styles.appContainer}>
      {/* Header */}
      <header className={styles.header}>
        <h1>Color Therapy Game</h1>
      </header>

      {/* Calming Music Player */}
      <footer className={styles.footer}>
        <p>Relax with Calming Music</p>
        <ReactPlayer
          url="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
          playing
          loop
          volume={0.3}
        />
      </footer>

      {/* Main Game Section */}
      <div className={styles.gameContainer}>
        <h2>Color the Mandala</h2>
        <div className={styles.colorPicker}>
          <label>Select Color:</label>
          <input type="color" value={color} onChange={handleColorChange} />
        </div>

        {/* Mandala Design (SVG example, can be replaced with complex designs) */}
        <div className={styles.mandala}>
          <svg width="300" height="300">
            <circle cx="150" cy="150" r="100" stroke="black" strokeWidth="4" fill={color} />
          </svg>
        </div>

        <div className={styles.controls}>
          <button className={styles.completeLevel} onClick={handleLevelCompletion}>
            Complete Level
          </button>
        </div>
      </div>

      {/* Progress Tracker */}
      <div className={styles.progressContainer}>
        <h2>Your Progress</h2>
        <div className={styles.achievements}>
          <p>Levels Completed: {completedLevels}</p>
          {achievements.length > 0 && (
            <ul>
              {achievements.map((achievement, index) => (
                <li key={index}>{achievement}</li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className={styles.footerBottom}>
        <p>Thank you for playing! Relax and enjoy the process of coloring.</p>
      </footer>
    </div>
  );
};

export default ColorTherapyGame;
