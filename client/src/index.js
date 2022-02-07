import React from 'react';
import { render } from 'react-dom';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import List from './pages/List';
// import './styles/input.css';

render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="list" element={<List />} />
        </Routes>
    </BrowserRouter>
    , document.getElementById('root'));
