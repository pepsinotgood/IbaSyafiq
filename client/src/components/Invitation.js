// src/components/Invitation.js
import React, { useEffect } from 'react';
import './Invitation.css';
import Navbar from './Navbar'; 

const images = [
  '/images/invite-page-1.svg',
  '/images/invite-page-2.svg',
  '/images/invite-page-3.svg',
];

const Invitation = () => {

  const handleRSVPClick = () => {
    const rsvpButton = document.querySelector('.rsvp-button');
    if (rsvpButton) {
      rsvpButton.click(); // Simulate a click on the RSVP button in the Navbar
    }
  };

  useEffect(() => {
    const audio = document.getElementById('background-audio');
    const playAudio = () => {
      audio.play().catch(error => {
        console.error('Auto-play was prevented. Please click somewhere to start the audio.', error);
      });
    };

    playAudio();

    // Attach event listener to retry playing audio on user interaction
    document.addEventListener('click', playAudio);

    // Cleanup event listener on unmount
    return () => {
      document.removeEventListener('click', playAudio);
    };
  }, []);

  return (
    <div className="invitation-container">
      <audio id="background-audio" src="/akad.mp3" loop></audio>
      {images.map((image, index) => (
        <div key={index} className="image-wrapper">
          <img src={image} alt={`Page ${index + 1}`} className="invitation-image" />
          {index === 2 && ( // Check if it is the third image
          <button className="rsvp-trigger-button" onClick={handleRSVPClick}>
            RSVP Now
          </button>
          )}
        </div>
      ))}
      <Navbar/>
    </div>
  );
};

export default Invitation;
