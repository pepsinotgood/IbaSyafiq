import React, {  useState } from 'react';
import './Navbar.css';
const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000'; // Fallback to local if REACT_APP_API_URL is not set || process.env.REACT_APP_API_URL 

const Navbar = ({ activePopup, setActivePopup, fetchComments, audioPlaying, setAudioPlaying, audioRef }) => {

  const [formData, setFormData] = useState({
    nama: '',
    gelaranDikenali: '',
    bilanganPax: '',
    slotMasa: '',
  });
  const [commentData, setCommentData] = useState({
    name: '',
    comment: '',
  });
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [commentStatus, setCommentStatus] = useState(null);
  const [activeButton, setActiveButton] = useState(null);


  const handleLaguClick = () => {
    if (!audioRef || !audioRef.current) {
      console.error('Audio ref is undefined or not attached');
      return;
    }

    const audio = audioRef.current;

    // Check the current state of the audio (playing or not)
    if (audioPlaying) {
      audio.pause(); // Pause the audio if it’s playing
      setAudioPlaying(false); // Update state to reflect pause
    } else {
      audio.play() // Play the audio if it’s paused
        .then(() => {
          setAudioPlaying(true); // Update state to reflect play
        })
        .catch((error) => {
          console.error('Audio playback failed:', error);
        });
    }
  };

  const handleButtonClick = (popupName) => {

    setActiveButton(popupName); // Track the active button

    if (activePopup === popupName) {
      setActivePopup(null);
    } else {
      setActivePopup(popupName);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCommentChange = (e) => {
    const { name, value } = e.target;
    setCommentData({
      ...commentData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all fields are filled
    if (!formData.nama || !formData.gelaranDikenali || !formData.bilanganPax || !formData.slotMasa) {
      alert('Sila isi ruangan ini.');
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/api/rsvp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmissionStatus('RSVP dihantar!');
        setFormData({ nama: '', gelaranDikenali: '', bilanganPax: '', slotMasa:''});
      } else {
        setSubmissionStatus('RSVP gagal dihantar.');
      }
    } catch (error) {
      console.error('Error:', error);
      setSubmissionStatus('Error submitting RSVP.');
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    // Check if all fields are filled
    if (!commentData.name || !commentData.comment) {
      alert('Sila isi ruangan ini.');
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/api/comment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(commentData),
      });

      if (response.ok) {
        setCommentStatus('Pesanan dihantar!');
        setCommentData({ name: '', comment: '' });
        fetchComments();
      } else {
        setCommentStatus('Pesanan gagal dihantar.');
      }
    } catch (error) {
      console.error('Error:', error);
      setCommentStatus('Error submitting comment.');
    }
  };

  return (
    <div className="navbar">
      {(activePopup==='contacts' || activePopup==='map' || activePopup==='rsvp' || activePopup==='comment') && <div className="overlay"></div>}

      <div className="guide-box">
    <div className={`logo-container ${activeButton === 'contacts' ? 'active' : ''}`}>
      <button className="logo-button" onClick={() => handleButtonClick('contacts')}>
        <img src="/images/phone.svg" alt="Call Logo" className="logo-image" />
      </button>
      <span className="logo-text">Telefon</span>
    </div>

    <div className={`logo-container ${activeButton === 'map' ? 'active' : ''}`}>
      <button className="logo-button" onClick={() => handleButtonClick('map')}>
        <img src="/images/map.svg" alt="Map Logo" className="logo-image" />
      </button>
      <span className="logo-text">Lokasi</span>
    </div>

    <div className={`logo-container ${activeButton === 'lagu' ? 'active' : ''}`}>
      <button className="logo-button" onClick={handleLaguClick}>
        <img src={audioPlaying ? "/images/pause.png" : "/images/play.png"} alt="Lagu Logo" className="logo-image" />
      </button>
      <span className="logo-text">Lagu</span>
    </div>

    <div className={`logo-container ${activeButton === 'rsvp' ? 'active' : ''}`}>
      <button className="logo-button" onClick={() => handleButtonClick('rsvp')}>
        <img src="/images/rsvp.svg" alt="RSVP Logo" className="logo-image" />
      </button>
      <span className="logo-text">Kehadiran</span>
    </div>

    <div className={`logo-container ${activeButton === 'comment' ? 'active' : ''}`}>
      <button className="logo-button" onClick={() => handleButtonClick('comment')}>
        <img src="/images/comment.svg" alt="Comment Logo" className="logo-image" />
      </button>
      <span className="logo-text">Nota Kasih</span>
    </div>
    </div>
      
      {activePopup === 'contacts' && (
        <div className="contacts-popup">
          <div className='inside-box'>
          <p className="contact-entry">
            <span className="name-wrapper">
              <span className="name">Zubaini</span>
              <span className="gelaran">Ummi</span>
            </span>
            <span className="phone">
              <button className="contact-button" onClick={() => window.location.href = `https://wa.me/60133936906`}>
                <i className="fa-brands fa-whatsapp"></i>
              </button>
              <button className="contact-button" onClick={() => window.location.href = `tel:60133936906`}>
                <i className="fa-solid fa-phone-flip fa-sm"></i>
              </button>
            </span>
          </p>

          <p className="contact-entry">
            <span className="name-wrapper">
              <span className="name">Azlan</span>
              <span className="gelaran">Ayah</span>
            </span>
            <span className="phone">
              <button className="contact-button" onClick={() => window.location.href = `https://wa.me/60192807762`}>
                <i className="fa-brands fa-whatsapp"></i>
              </button>
              <button className="contact-button" onClick={() => window.location.href = `tel:60192807762`}>
                <i className="fa-solid fa-phone-flip fa-sm"></i>
              </button>
            </span>
          </p>

          <p className="contact-entry">
            <span className="name-wrapper">
              <span className="name">Atikah</span>
              <span className="gelaran">Adik</span>
            </span>
            <span className="phone">
              <button className="contact-button" onClick={() => window.location.href = `https://wa.me/60133506905`}>
                <i className="fa-brands fa-whatsapp"></i>
              </button>
              <button className="contact-button" onClick={() => window.location.href = `tel:60133506905`}>
                <i className="fa-solid fa-phone-flip fa-sm"></i>
              </button>
            </span>
          </p>
          </div>
        </div>
      )}

{activePopup === 'map' && (
  <div className="map-popup">
    <img src="/images/abangjamil.svg" alt="Rumah Abang Jamil" className="map-image" />
    <div className="map-address">Rumah Abang Jamil Klang, Plot 8, Lot 142770, Jalan Langat, Bandar Botanik, 42000 Klang, Selangor</div>
    <div className="map-links-container">
      <div className="map-list" align="left">
        <a href="https://shorturl.at/gvu21" target="_blank" rel="noopener noreferrer">
          <img src="/images/waze.svg" alt="Waze Icon" className="logo-map-image" />
          buka di Waze
        </a>
      </div>
      <div className="map-list" align="right">
        <a href="https://maps.app.goo.gl/k7xvN97KtJcGBRCMA" target="_blank" rel="noopener noreferrer">
          <img src="/images/gmap.svg" alt="Gmap Icon" className="logo-map-image" />
          buka di Google Map
        </a>
      </div>
    </div>
  </div>
)}

      {activePopup === 'rsvp' && (
        <div className="rsvp-popup">
          {submissionStatus ? (
            <p className="submission-status">{submissionStatus}</p>
          ) : (
            <div className='inside-box'>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="nama"
                placeholder="Nama"
                value={formData.nama}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="gelaranDikenali"
                placeholder="Nombor Telefon"
                value={formData.gelaranDikenali}
                onChange={handleChange}
                required
              />
              <select
                name="bilanganPax"
                value={formData.bilanganPax}
                onChange={handleChange}
                required
              >
                <option value="" disabled>Bilangan Kehadiran</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
              <select
                name="slotMasa"
                value={formData.slotMasa}
                onChange={handleChange}
                required
              >
                <option value="" disabled>Angaran Masa Kehadiran</option>
                <option value="6">6pm - 7pm</option>
                <option value="7">7pm - 8pm</option>
                <option value="8">8pm - 9pm</option>
                <option value="9">9pm - 10pm</option>
                <option value="10">10pm - 11pm</option>
              </select>
              <button className="submit-button" type="submit">Hantar Kehadiran</button>
            </form>
            </div>
          )}
        </div>
      )}

{activePopup === 'comment' && (
  <div className="comment-popup">
    {commentStatus ? (
      <p className="comment-status">{commentStatus}</p>
    ) : (
      <div className='inside-box'>
      <form onSubmit={handleCommentSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Nama"
          value={commentData.name}
          onChange={handleCommentChange}
          required
        />
        <textarea
          name="comment"
          placeholder="Pesanan"
          value={commentData.comment}
          onChange={handleCommentChange}
          required
        />
        <button className="submit-button" type="submit">Hantar Pesanan</button>
      </form>
      </div>
    )}
  </div>
)}

    </div>
  );
};

export default Navbar;
