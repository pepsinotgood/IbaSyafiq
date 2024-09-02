import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Invitation from './components/Invitation';
import Navbar from './components/Navbar';

const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function App() {
  const [comments, setComments] = useState([]);

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

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Invitation comments={comments} fetchComments={fetchComments} />} />
        </Routes>
        <Navbar fetchComments={fetchComments} />
      </div>
    </Router>
  );
}

export default App;
