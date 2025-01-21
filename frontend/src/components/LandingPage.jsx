import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Navigation from "../components/NavBar";
import BrainNetwork from '../components/BrainNetwork';
import FeatureIcon from '../components/FeatureIcon';
import styles from  "./LandingPage.module.css";
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className={`${styles.landingPage} landing-page`}>
      <div className={styles.gradientBg}>
        <div className={styles.wavePattern} />
      </div>
      
      <Navigation />

      <main>
        <section className={styles.heroSection}>
          <Container>
            <Row className="align-items-center min-vh-100">
              <Col lg={6} className={styles.heroContent}>
                <h1 className={styles.heroTitle}>
                  Revolutionizing
                  <span className="d-block">Monitoring & Improvement</span>
                </h1>
                <p className={styles.heroSubtitle}>
                  Transform your mental well-being with AI-powered insights and personalized support
                </p>
                <Link to= '/login' className={styles.getStartedBtn} >
                  GET STARTED
                </Link>
              </Col>
              <Col lg={6} className="position-relative d-none d-lg-block">
                <BrainNetwork />
              </Col>
            </Row>
          </Container>
        </section>

        <section className={styles.featuresSection}>
          <Container>
            <Row className="g-4">
              {[{
                type: 'mental', title: 'MENTAL HEALTH', desc: 'Advanced cognitive analysis and support'
              }, {
                type: 'health', title: 'HEALTH', desc: 'Personalized well-being strategies'
              }, {
                type: 'monitoring', title: 'MONITORING', desc: 'Real-time emotional tracking'
              }, {
                type: 'technology', title: 'TECHNOLOGY', desc: 'AI-powered mental health solutions'
              }].map((feature, index) => (
                <Col key={index} md={6} lg={3}>
                  <div className={styles.featureCard}>
                    <FeatureIcon type={feature.type} />
                    <h3>{feature.title}</h3>
                    <p>{feature.desc}</p>
                  </div>
                </Col>
              ))}
            </Row>
          </Container>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;
