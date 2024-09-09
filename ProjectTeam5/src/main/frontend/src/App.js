// src/App.js
import React, { useEffect, useState } from 'react';
import './App.css';
import MainPanel from './components/mainPanel/MainPanel';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login/Login';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  // onLoginSuccess={() => setIsLoggedIn(true)}

  return (
    
      <div className="App">
         <MainPanel />
      </div>
    
  );
}

export default App;
