import React, { useState, useEffect, useCallback, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Invitation from './components/Invitation';
import Navbar from './components/Navbar';
import './App.css';

const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function App() {
  const [comments, setComments] = useState([]);
  const [activePopup, setActivePopup] = useState(null);
  const [audioPlaying, setAudioPlaying] = useState(false); // Keep track of whether the audio is playing
  const [isContentVisible, setIsContentVisible] = useState(false); // Track if the main content is visible
  const [isEnvelopeVisible, setIsEnvelopeVisible] = useState(true); // Track if the envelope is still visible
  const audioRef = useRef(null); // Create a ref for the audio element

  const fetchComments = useCallback(async () => {
    try {
      const response = await fetch(`${apiUrl}/api/comments`);
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error('Failed to fetch comments:', error);
    }
  }, []);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  // Function to play the audio
  const playAudio = () => {
    if (audioRef.current && !audioPlaying) {
      audioRef.current.play()
        .then(() => {
          setAudioPlaying(true); // Set the state to true if audio starts playing successfully
        })
        .catch((error) => {
          console.error('Audio playback failed:', error); // Catch any playback errors
        });
    }
  };

  // Handle the click on the envelope image
  const handleEnvelopeClick = () => {
    setIsEnvelopeVisible(false); // Hide the envelope
    setTimeout(() => {
      setIsContentVisible(true); // Reveal the main content with a slight delay for the animation
      playAudio(); // Play the audio when user clicks on the envelope
    }, 500); // Wait 500ms for the envelope to fade out before showing content
  };

  return (
    <Router>
      <div className="App">
        {/* The audio element, with ref attached */}
        <audio ref={audioRef} src="/MalamBulan.mp3" loop></audio>

        {/* Envelope Image */}
        {isEnvelopeVisible && (
          <div className="envelope-container" onClick={handleEnvelopeClick}>
            <img
              src="/images/envelope.png"
              alt="Envelope with Seal Wax"
              className="envelope-image"
            />
          </div>
        )}

        {/* Main Content */}
        {isContentVisible && (
          <div className="fade-in-content"> {/* Apply animation here */}
            <Routes>
              <Route path="/" element={<Invitation comments={comments} fetchComments={fetchComments} />} />
            </Routes>
            <Navbar
              activePopup={activePopup}
              setActivePopup={setActivePopup}
              fetchComments={fetchComments}
              audioPlaying={audioPlaying}         // Pass audioPlaying state
              setAudioPlaying={setAudioPlaying}   // Pass setAudioPlaying function
              audioRef={audioRef}                 // Pass audioRef to Navbar
            />
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
