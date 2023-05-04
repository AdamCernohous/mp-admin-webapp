import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import TermsAndConditions from './TermsAndConditions';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/app/:userToken" element={<App />} />
        <Route path="/termsandconditions" element={<TermsAndConditions />} />
      </Routes>
    </Router>
  </React.StrictMode>
);