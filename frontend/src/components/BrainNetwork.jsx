import React from 'react';
import styles from  "./LandingPage.module.css"

const BrainNetwork = () => {
  return (
    <div className={styles.brainNetwork}>
      <div className={styles.nodes}>
        {Array.from({ length: 12 }).map((_, i) => (
          <div 
            key={i} 
            className={styles.node}
            style={{
              '--delay': `${i * 0.5}s`,
              '--x': `${Math.sin(i * 30 * Math.PI / 180) * 150}px`,
              '--y': `${Math.cos(i * 30 * Math.PI / 180) * 150}px`,
            }}
          />
        ))}
      </div>
      <div className={styles.centerNode} />
    </div>
  );
};

export default BrainNetwork;
