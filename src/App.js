// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ShowList from './Components/ShowList';
import ShowDetail from './Components/ShowDetail';
import BookTicket from './Components/BookTicket';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ShowList />} />
        <Route path="/show/:id" element={<ShowDetail />} />
        <Route path="/book-ticket/:id" element={<BookTicket />} />
      </Routes>
    </Router>
  );
}

export default App;
