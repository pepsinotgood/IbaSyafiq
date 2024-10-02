import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Invitation from './components/Invitation';
import Navbar from './components/Navbar';

const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function App() {
  const [comments, setComments] = useState([]);
  const [activePopup, setActivePopup] = useState(null); 
  const [audioPlaying, setAudioPlaying] = useState(false);

  const triggerRSVP = () => {
    setActivePopup('rsvp'); // Set activePopup to 'rsvp' to trigger the RSVP popup
  };


  const fetchComments = useCallback(async () => {
    try {
      const response = await fetch(`${apiUrl}/api/comments`);
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error('Failed to fetch comments:', error);
    }
  }, []); // Empty dependency array ensures this function is only created once

  useEffect(() => {
    fetchComments();
  }, [fetchComments]); // Dependency is fetchComments, which is memoized


  useEffect(() => {
    const audio = document.getElementById('background-audio');

    const playAudio = () => {
      if (!audioPlaying) {
        audio.play().then(() => {
          setAudioPlaying(true); // Mark audio as playing to prevent multiple triggers
        }).catch((error) => {
          console.error('Audio play failed:', error);
        });
      }
    };

    // Add event listeners to trigger audio on interaction
    document.addEventListener('click', playAudio);
    document.addEventListener('keydown', playAudio);
    document.addEventListener('scroll', playAudio);
    document.addEventListener('touchstart', playAudio);

    return () => {
      // Clean up event listeners when the component unmounts
      document.removeEventListener('click', playAudio);
      document.removeEventListener('keydown', playAudio);
      document.removeEventListener('scroll', playAudio);
      document.removeEventListener('touchstart', playAudio);
    };
  }, [audioPlaying]);


  
  return (
    <Router>
      <div className="App">
      <audio id="background-audio" src="/akad.mp3" loop></audio>
        <Routes>
          <Route path="/" element={<Invitation comments={comments} fetchComments={fetchComments} />} />
        </Routes>
        <button onClick={triggerRSVP}>Open RSVP Popup</button>
        <Navbar
          activePopup={activePopup}
          setActivePopup={setActivePopup}
          fetchComments={fetchComments}
          audioPlaying={audioPlaying}         // Pass audioPlaying state
          setAudioPlaying={setAudioPlaying}   // Pass setAudioPlaying function
        />
      </div>
    </Router>
  );
}

export default App;
