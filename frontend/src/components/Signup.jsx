import React, { useState, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { Eye, EyeOff, User, Lock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './Signup.module.css';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');  // Clear any previous errors

    try {
      // Making an API call to the backend to create a new user
      const response = await axios.post('http://localhost:3000/api/auth/register', {
        name,
        email,
        password,
      });

      // Check if signup is successful
      if (response.status === 201) {
        // Redirect to login page after successful signup
        navigate('/login');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to create an account. Please try again.');  // Show error message
    }
  };

  return (
    <Container fluid className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <h2 className={styles.loginTitle}>Create Account</h2>
        {error && <div className={styles.errorMessage}>{error}</div>}  {/* Show error if signup fails */}
        <Form onSubmit={handleSubmit}>
          <Form.Group className={styles.formGroup}>
            <Form.Control
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className={styles.formControl}
            />
            <User className={styles.inputIcon} size={20} />
          </Form.Group>

          <Form.Group className={styles.formGroup}>
            <Form.Control
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={styles.formControl}
            />
            <User className={styles.inputIcon} size={20} />
          </Form.Group>

          <Form.Group className={styles.formGroup}>
            <Form.Control
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={styles.formControl}
            />
            <Lock className={styles.inputIcon} size={20} />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className={styles.passwordToggle}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </Form.Group>

          <Button type="submit" className={styles.loginButton}>
            Sign Up
          </Button>
        </Form>
        <div className={styles.signupText}>
          Already have an account? <Link to="/login" className={styles.signupLink}>Login</Link>
        </div>
      </div>
    </Container>
  );
};

export default Signup;
