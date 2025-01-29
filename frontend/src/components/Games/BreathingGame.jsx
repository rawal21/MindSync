import React, { useState, useEffect } from 'react';
import styles from './BreathingGame.module.css';

// Customizable Breathing Durations
const defaultBreathingCycles = {
  inhale: 4,
  exhale: 6,
  hold: 2
};

const BreathingGame = () => {
  const [cycle, setCycle] = useState("Inhale");
  const [timer, setTimer] = useState(defaultBreathingCycles.inhale);
  const [isActive, setIsActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const [userInhale, setUserInhale] = useState(defaultBreathingCycles.inhale);
  const [userExhale, setUserExhale] = useState(defaultBreathingCycles.exhale);
  const [userHold, setUserHold] = useState(defaultBreathingCycles.hold);
  const [backgroundColor, setBackgroundColor] = useState('blue');
  const [musicPlaying, setMusicPlaying] = useState(false);
  const totalDuration = userInhale + userExhale + userHold;

  const inhaleDuration = userInhale;
  const exhaleDuration = userExhale;
  const holdDuration = userHold;

  // Sound effects for inhale, exhale, and hold
  const playSound = (action) => {
    const sound = new Audio(action === "inhale" ? '/sounds/inhale.mp3' :
                            action === "exhale" ? '/sounds/exhale.mp3' : '/sounds/hold.mp3');
    sound.play();
  };

  // Background music
  const toggleMusic = () => {
    setMusicPlaying(!musicPlaying);
  };

  useEffect(() => {
    let interval;
    let backgroundInterval;
    
    if (isActive) {
      interval = setInterval(() => {
        setTimer(prev => {
          if (prev === 0) {
            if (cycle === "Inhale") {
              playSound("inhale");
              setCycle("Hold");
              setBackgroundColor('yellow'); // Background color during Hold
              return holdDuration;
            }
            if (cycle === "Hold") {
              setCycle("Exhale");
              setBackgroundColor('green'); // Background color during Exhale
              return exhaleDuration;
            }
            if (cycle === "Exhale") {
              playSound("exhale");
              setCycle("Inhale");
              setBackgroundColor('blue'); // Background color during Inhale
              return inhaleDuration;
            }
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }

    // Visualization animation logic
    backgroundInterval = setInterval(() => {
      if (cycle === "Inhale") {
        setProgress((timer / inhaleDuration) * 100);
      } else if (cycle === "Exhale") {
        setProgress((timer / exhaleDuration) * 100);
      }
    }, 100);

    return () => {
      clearInterval(interval);
      clearInterval(backgroundInterval);
    };
  }, [cycle, isActive, timer]);

  const handleMeditationMode = () => {
    setIsActive(!isActive);
  };

  return (
    <div className={styles.gameContainer} style={{ backgroundColor }}>
      <div className={styles.circle} style={{ 
        transform: `scale(${cycle === "Inhale" ? 1 + (progress / 100) : 1 - (progress / 100)})` 
      }}>
        <span className={styles.cycleText}>{cycle}</span>
      </div>
      <div className={styles.timer}>
        <span>{timer}s</span>
      </div>
      <div className={styles.progressBar}>
        <div className={styles.progress} style={{ width: `${progress}%` }} />
      </div>
      <button className={styles.startButton} onClick={handleMeditationMode}>
        {isActive ? "Pause" : "Start Meditation"}
      </button>
      <button className={styles.musicButton} onClick={toggleMusic}>
        {musicPlaying ? "Stop Music" : "Play Music"}
      </button>
      {/* Music toggle logic */}
      {musicPlaying && <audio loop autoPlay src="/sounds/backgroundMusic.mp3" />}
    </div>
  );
};

export default BreathingGame;
