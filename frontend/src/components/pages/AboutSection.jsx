import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Brain, Smile, Users, Calendar, ChevronRight } from 'lucide-react';
import DeveloperInfo from "../DeveloperInfo"
import img1 from  "../images/logo.png.webp"
import styles from './AboutSection.module.css';

const AboutSection = () => {
  return (
    <div className={styles.aboutSection}>
      <div className={`${styles.heroSection} text-white py-5 mb-5`}>
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="mb-5 mb-lg-0">
              <h1 className={`${styles.display3} fw-bold mb-3 animate__animated animate__fadeInUp`}>MindSync</h1>
              <p className="lead fs-4 mb-4 animate__animated animate__fadeInUp animate__delay-1s">
                Revolutionizing Mental Health Monitoring & Improvement
              </p>
              <Button
                variant="light"
                size="lg"
                className={`${styles.btnLight} rounded-pill px-4 py-2 shadow-sm animate__animated animate__fadeInUp animate__delay-2s`}
              >
                Get Started <ChevronRight size={20} className="ms-2" />
              </Button>
            </Col>
            <Col lg={6} className="text-center">
              <img
                src={img1}
                alt="MindSync Illustration"
                className="img-fluid animate__animated animate__zoomIn"
                style={{width : "32rem"}}
              />
            </Col>
          </Row>
        </Container>
      </div>

      <Container>
        <Row className="mb-5">
          <Col lg={8} className="mx-auto text-center">
            <h2 className={`${styles.display5} mb-4 text-muted`} style={{fontFamily : "monospace"}}>Empowering Your Mental Well-being</h2>
            <p className="lead text-muted">
              MindSync combines cutting-edge AI technology with personalized support to help you understand and improve your mental health. Our innovative platform offers a comprehensive approach to mental well-being, tailored to your unique needs.
            </p>
          </Col>
        </Row>

        <Row className="mb-5 g-4">
          {[ 
            { icon: Brain, title: "AI-Powered Analysis", description: "Advanced sentiment analysis of your mood journal entries." },
            { icon: Smile, title: "Facial Expression Tracking", description: "Real-time monitoring of emotions through webcam." },
            { icon: Calendar, title: "Personalized Routines", description: "Customized wellness activities tailored to your needs." },
            { icon: Users, title: "Community Support", description: "Connect anonymously with others for mutual support." }
          ].map((feature, index) => (
            <Col md={6} lg={3} key={index}>
              <div className={`${styles.featureCard} h-100 p-4 text-center`}>
                <div className={`${styles.iconWrapper} mb-4 mx-auto`}>
                  <feature.icon size={32} />
                </div>
                <h3 className="h4 mb-3">{feature.title}</h3>
                <p className="text-muted mb-0">{feature.description}</p>
              </div>
            </Col>
          ))}
        </Row>

        <Row className="mb-5">
          <Col lg={10} className="mx-auto">
            <h2 className="text-center display-5 mb-5">Meet the Developer</h2>
            <DeveloperInfo />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AboutSection;
