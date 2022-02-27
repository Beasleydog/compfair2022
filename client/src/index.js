import React from 'react';
import { render } from 'react-dom';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Levels from './pages/Levels';
import List from './pages/List';
import Play from './pages/Play';
import './styles/output.css';

render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="levels" element={<Levels />} />
            <Route path="list" element={<List />} />
            <Route path="play/:attemptNumber/:id/:mode/:number" element={<Play />} />
        </Routes>
    </BrowserRouter>
    , document.getElementById('root'));
