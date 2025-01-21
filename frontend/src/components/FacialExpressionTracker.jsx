import React, { useState, useRef, useEffect } from 'react';
import * as faceapi from 'face-api.js';

const FacialExpressionTracker = () => {
  const [isTracking, setIsTracking] = useState(false);
  const [emotion, setEmotion] = useState(null);
  const [modelLoaded, setModelLoaded] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Load the face-api.js models
  useEffect(() => {
    const loadModels = async () => {
      try {
        const MODEL_URL = 'https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights';
        await Promise.all([
          faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
          faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
          faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
        ]);
        setModelLoaded(true);
        console.log('Models loaded successfully');
      } catch (error) {
        console.error('Error loading models:', error);
      }
    };

    loadModels();
  }, []);

  useEffect(() => {
    let interval;

    if (isTracking && modelLoaded) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch((err) => console.error('Error accessing camera:', err));

      interval = setInterval(async () => {
        if (videoRef.current && canvasRef.current) {
          const video = videoRef.current;
          const canvas = canvasRef.current;
          const displaySize = { width: video.videoWidth, height: video.videoHeight };

          faceapi.matchDimensions(canvas, displaySize);

          const detections = await faceapi
            .detectAllFaces(video, new faceapi.SsdMobilenetv1Options())
            .withFaceLandmarks()
            .withFaceExpressions();

          const resizedDetections = faceapi.resizeResults(detections, displaySize);

          canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
          faceapi.draw.drawDetections(canvas, resizedDetections);
          faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);

          if (resizedDetections.length > 0) {
            const detectedEmotion = resizedDetections[0].expressions.asSortedArray()[0]?.expression;
            const facialFeatures = resizedDetections[0].landmarks.positions; // Example of getting facial landmarks
            setEmotion(detectedEmotion);

            // Send detected emotion data to the backend
            sendEmotionData({
              userId: "user123", // Replace with dynamic user ID if needed
              detectedEmotion,
              facialFeatures,
            });

            // Fetch recommendations based on emotion and send to another backend route
            const recommendations = getRecommendations(detectedEmotion);
            sendRoutineData({
              userId: "user123", // Replace with dynamic user ID if needed
              emotion: detectedEmotion,
              recommendations,
            });
          }
        }
      }, 100);
    } else if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
    }

    return () => clearInterval(interval);
  }, [isTracking, modelLoaded]);

  const toggleTracking = () => {
    if (!modelLoaded) {
      alert('Models are still loading. Please wait...');
      return;
    }
    setIsTracking(!isTracking);
  };

  // Function to send emotion data to the backend
  const sendEmotionData = async (data) => {
    try {
      const token = localStorage.getItem('authToken'); // Retrieve token from localStorage (or another storage mechanism)
      const response = await fetch('http://localhost:3000/api/facial-expressions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Add the token to the Authorization header
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        console.log('Facial expression data sent successfully!');
      } else {
        console.error('Failed to send facial expression data.');
      }
    } catch (error) {
      console.error('Error sending facial expression data:', error);
    }
  };

  // Function to send routine data to the backend
  const sendRoutineData = async (data) => {
    try {
      const token = localStorage.getItem('authToken'); // Retrieve token from localStorage (or another storage mechanism)
      const response = await fetch('http://localhost:3000/api/routine', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Add the token to the Authorization header
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        console.log('Routine data sent successfully!');
      } else {
        console.error('Failed to send routine data.');
      }
    } catch (error) {
      console.error('Error sending routine data:', error);
    }
  };

  // Generate recommendations based on detected emotion
  const getRecommendations = (emotion) => {
    const recommendations = {
      happy: ['Yoga', 'Meditation', 'Cardio Workout'],
      sad: ['Mindfulness Exercises', 'Reading a Book', 'Light Yoga'],
      angry: ['Breathing Exercises', 'Meditation', 'Stretching'],
      surprised: ['Journaling', 'Brainstorming Activities', 'Quick Workouts'],
      neutral: ['Meditation', 'Regular Stretching', 'Evening Walk'],
    };

    return recommendations[emotion] || ['Relaxation Activities'];
  };

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Facial Expression Tracker</h5>
        <div className="video-container" style={{ position: 'relative' }}>
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className="w-100"
            style={{ display: isTracking ? 'block' : 'none' }}
          />
          <canvas
            ref={canvasRef}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              display: isTracking ? 'block' : 'none',
            }}
          />
        </div>
        {isTracking && (
          <div className="mt-3">
            <strong>Detected Emotion:</strong> {emotion || 'None'}
          </div>
        )}
        {!isTracking && <div className="bg-light text-center p-5">Camera is off</div>}
        <button onClick={toggleTracking} className="btn btn-primary mt-3">
          {isTracking ? 'Stop Tracking' : 'Start Tracking'}
        </button>
        {!modelLoaded && (
          <p className="text-muted mt-3">Loading models... Please wait.</p>
        )}
      </div>
    </div>
  );
};

export default FacialExpressionTracker;
