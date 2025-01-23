import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import AboutSection from './components/pages/AboutSection';
import  Games  from './components/pages/Games';
import MindfulnessPuzzle from './components/Games/MindfulnessPuzzle';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<AboutSection />} />
          <Route path="/games" element={<Games/>} />
          <Route path="/games/mindfulness-puzzels" element={<MindfulnessPuzzle/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

