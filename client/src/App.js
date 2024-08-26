// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Invitation from './components/Invitation';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Invitation />} />
        </Routes>
        <Navbar />
      </div>
    </Router>
  );
}

export default App;