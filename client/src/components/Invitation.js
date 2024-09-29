import React, { useEffect, useState } from 'react';
import './Invitation.css';
import Navbar from './Navbar';

const images = [
  '/images/invite-page-1.svg',
  '/images/invite-page-2.svg',
  '/images/invite-page-3.svg',
];

function formatDate(date) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  const year = String(date.getFullYear());

  return `${day} . ${month} . ${year}`;
}

function capitalizeName(name) {
  return name.replace(/\b\w/g, (char) => char.toUpperCase());
}

const Invitation = ({ comments, fetchComments }) => {

  const [audioPlaying, setAudioPlaying] = useState(false);  // Track whether the audio is playing

  useEffect(() => {
    fetchComments();

    const audio = document.getElementById('background-audio');

    const playAudio = () => {
      if (!audioPlaying) {
        audio.play().then(() => {
          setAudioPlaying(true);  // Mark audio as playing to prevent multiple triggers
        }).catch((error) => {
          console.error('Audio play failed:', error);
        });
      }
    };

    document.addEventListener('click', playAudio);
    document.addEventListener('keydown', playAudio);
    document.addEventListener('scroll', playAudio);
    document.addEventListener('touchstart', playAudio);

    return () => {
      document.removeEventListener('click', playAudio);
      document.removeEventListener('keydown', playAudio);
      document.removeEventListener('scroll', playAudio);
      document.removeEventListener('touchstart', playAudio);
    };
  }, [audioPlaying, fetchComments]);

  const handleImageClick = () => {
    const audio = document.getElementById('background-audio');
    audio.play().catch((error) => {
      console.error('Audio play failed:', error);
    });
  };

  return (
    <div className="invitation-container">
      <audio id="background-audio" src="/akad.mp3" loop></audio>
      {images.map((image, index) => (
        <div key={index} className="image-wrapper">
          <img src={image} alt="" className="invitation-image" onClick={handleImageClick} />
        </div>
      ))}
      <div className="before-scrollable-image">
        <img src="/images/border-atas.svg" alt="" className="additional-image" />
      </div>
      <div className="scrollable-container">
        <div className="comments-container">
          {comments.map((comment, index) => (
            <div key={index} className="comment-box">
              <p>" {comment.comment} "</p>
              <span className="comment-meta">
                - <strong>{capitalizeName(comment.name)},</strong> <span className="date">{formatDate(new Date(comment.timestamp))}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="after-scrollable-image">
        <img src="/images/border-bawah.svg" alt="" className="additional-image" />
      </div>

      <Navbar fetchComments={fetchComments} />
    </div>
  );
};

export default Invitation;
