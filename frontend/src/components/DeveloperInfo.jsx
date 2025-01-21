import React from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import { Github, Linkedin, Mail } from 'lucide-react';
import img1 from "./images/developer.jpg";
import styles from "./pages/AboutSection.module.css"  // Import the existing AboutSection module CSS

const DeveloperInfo = () => {
  return (
    <div className={styles.developerInfo}>
      <Row className="g-0">
        <Col md={4} className={styles.developerImageContainer}>
          <Image
            src=""  // Set the image source to img1
            fluid
            className={styles.developerImage}
            alt="Developer"
          />
        </Col>
        <Col md={8}>
          <div className="p-4 p-md-5">
            <h3 className={`${styles.display6} mb-3 text-muted`}>Dikshit Kumar</h3>
            <p className="text-muted fs-5 mb-3">Full Stack Developer & AI Enthusiast</p>
            <p className="mb-4">
              I am a passionate developer with over 1 year of experience in creating innovative solutions.
              I'm specialized in AI-driven applications and mental health technologies, bringing a unique perspective to MindSync's development.
              My mission is to leverage technology to make a positive impact on people's lives and well-being.
            </p>
            <div className="d-flex">
              <a href="https://github.com/johndoe" className={`me-3 ${styles.socialIcon}`} target="_blank" rel="noopener noreferrer">
                <Github size={24} />
              </a>
              <a href="https://linkedin.com/in/johndoe" className={`me-3 ${styles.socialIcon}`} target="_blank" rel="noopener noreferrer">
                <Linkedin size={24} />
              </a>
              <a href="mailto:john@mindsync.com" className={styles.socialIcon}>
                <Mail size={24} />
              </a>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default DeveloperInfo;
