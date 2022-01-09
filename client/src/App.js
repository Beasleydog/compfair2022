import logo from './logo.svg';
import './App.css';
import Page from './Page.js'
import React, { useState, useEffect } from 'react';
import { Routes, Route, Router } from 'react-router-dom';

function App() {
  const [data, setData] = useState('');

  useEffect(() => {
    fetch("http://localhost:9000/testAPI")
      .then(res => res.text())
      .then(res => setData(res));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {data}
      </header>
    </div>
  );
}

export default App;
