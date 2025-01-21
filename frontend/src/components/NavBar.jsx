import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Brain } from 'lucide-react';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import styles from './LandingPage.module.css';

const Navigation = () => {
  return (
    <Navbar expand="lg" className={styles.navbarGlass}>
      <Container>
        <Navbar.Brand href="#" className="d-flex align-items-center gap-3">
          <div className={styles.logoWrapper}>
            <Brain className="text-white" size={24} />
          </div>
          <span className={styles.brandText}>MindSync</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav">
          <Nav className="ms-auto text-uppercase">
            <Nav.Item>
              <Link to="/" className={styles.navLink} style={{textDecoration : "none"}}>Home</Link> {/* Updated to Link */}
            </Nav.Item>
            <Nav.Item>
              <Link to="/login" className={styles.navLink} style={{textDecoration : "none"}}>Login</Link> {/* Updated to Link */}
            </Nav.Item>
            <Nav.Item>
              <Link to="/signup" className={styles.navLink} style={{textDecoration : "none"}}>Signup</Link> {/* Updated to Link */}
            </Nav.Item>
            <Nav.Item>
              <Link to="/about" className={styles.navLink} style={{textDecoration : "none"}}>About</Link> {/* Updated to Link */}
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;


