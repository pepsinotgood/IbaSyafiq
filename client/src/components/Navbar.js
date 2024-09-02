import React, {  useState } from 'react';
import './Navbar.css';
const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000'; // Fallback to local if REACT_APP_API_URL is not set || process.env.REACT_APP_API_URL 

const Navbar = ({ fetchComments }) => {
  const [activePopup, setActivePopup] = useState(null);
  const [formData, setFormData] = useState({
    nama: '',
    gelaranDikenali: '',
    bilanganPax: '',
  });
  const [commentData, setCommentData] = useState({
    name: '',
    comment: '',
  });
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [commentStatus, setCommentStatus] = useState(null);

  const handleButtonClick = (popupName) => {
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
    if (!formData.nama || !formData.gelaranDikenali || !formData.bilanganPax) {
      alert('Please fill out all fields.');
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
        setFormData({ nama: '', gelaranDikenali: '', bilanganPax: '' });
      } else {
        setSubmissionStatus('RSVP gagal dihantar/');
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
      alert('Please fill out all fields.');
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
      <div className="guide-box">
        <button className="logo-button" onClick={() => handleButtonClick('contacts')}>
          <img src="/images/phone.svg" alt="Call Logo" className="logo-image" />
        </button>
        <button className="logo-button" onClick={() => handleButtonClick('map')}>
          <img src="/images/map.svg" alt="Map Logo" className="logo-image" />
        </button>
        <button className="logo-button" onClick={() => handleButtonClick('rsvp')}>
          <img src="/images/rsvp.svg" alt="RSVP Logo" className="logo-image" />
        </button>
        <button className="logo-button" onClick={() => handleButtonClick('comment')}>
          <img src="/images/comment.svg" alt="Comment Logo" className="logo-image" />
        </button>
      </div>

      {activePopup === 'contacts' && (
        <div className="contacts-popup">
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
      )}

      {activePopup === 'map' && (
        <div className="map-popup">
          <span className="mapTitle">Rumah Abang Jamil Klang</span>
          <div className="map-links-container">
            <span className="map-list">
              <a href="https://shorturl.at/gvu21" target="_blank" rel="noopener noreferrer">
                <img src="/images/waze.svg" alt="Waze Icon" className="logo-map-image" />
                : buka di Waze
              </a>
            </span>
            <br/>
            <span className="map-list">
              <a href="https://maps.app.goo.gl/k7xvN97KtJcGBRCMA" target="_blank" rel="noopener noreferrer">
                <img src="/images/gmap.svg" alt="Gmap Icon" className="logo-map-image" />
                : buka di Google Map
              </a>
            </span>
          </div>
        </div>
      )}

      {activePopup === 'rsvp' && (
        <div className="rsvp-popup">
          {submissionStatus ? (
            <p className="submission-status">{submissionStatus}</p>
          ) : (
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
                placeholder="Gelaran dikenali"
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
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
              <button type="submit">Hantar RSVP</button>
            </form>
          )}
        </div>
      )}

      {activePopup === 'comment' && (
        <div className="comment-popup">
          {commentStatus ? (
            <p className="comment-status">{commentStatus}</p>
          ) : (
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
              <button type="submit">Hantar Pesanan</button>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
