import React from 'react';
import { render } from 'react-dom';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import List from './pages/List';
import Play from './pages/Play';
import './styles/output.css';

render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="list" element={<List />} />
            <Route path="play/:id/:mode" element={<Play />} />
        </Routes>
    </BrowserRouter>
    , document.getElementById('root'));
