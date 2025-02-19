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
import MemoryGame from './components/Games/MemoryGame';
import BreathingGame from './components/Games/BreathingGame';
import ColorTherapyGame from './components/Games/ColorTherapyGame';
import ChatPage from "./components/pages/ChatPage";
import AITherapist from './components/AITherapist';

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
          <Route path="/games/memory-game" element={<MemoryGame/>} />
          <Route path='/games/breathing-rhythm-game' element={<BreathingGame/>} />
          <Route path='/games/mood-quiz' element={<ColorTherapyGame/>} />
          <Route path='/chat/:groupId'  element={<ChatPage/>} />
          <Route path='/aitherepist'  element={<AITherapist/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

