import React, { useState, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { Eye, EyeOff, User, Lock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';  // For navigation
import axios from 'axios';
import styles from './Login.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Redirect to dashboard if user is already logged in


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');  // Clear any previous errors

    try {
      // Make an API request to the backend login route
      const response = await axios.post('http://localhost:3000/api/auth/login', {
        email,
        password,
      });

      // If login is successful, store the JWT token
      const { token } = response.data;
      localStorage.setItem('authToken', token);  // Store the token in localStorage

      // Redirect to the dashboard
      navigate('/dashboard');
    } catch (err) {
      // Handle login errors (e.g., invalid credentials)
      setError('Invalid email or password');
    }
  };

  return (
    <Container fluid className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <h2 className={styles.loginTitle}>Welcome Back</h2>
        {error && <div className={styles.errorMessage}>{error}</div>}  {/* Show error if login fails */}
        <Form onSubmit={handleSubmit}>
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

          <div className={styles.rememberForgot}>
            <Form.Check 
              type="checkbox" 
              label="Remember me" 
              id="rememberMe"
              className={styles.rememberMe}
            />
            <a href="#forgot-password" className={styles.forgotPassword}>Forgot password?</a>
          </div>

          <Button type="submit" className={styles.loginButton}>
            Log In
          </Button>
        </Form>
        <div className={styles.signupText}>
          Don't have an account? <Link to="/signup" className={styles.signupLink}>Sign up</Link>
        </div>
      </div>
    </Container>
  );
};

export default Login;
