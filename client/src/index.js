import React from "react";
import { render } from "react-dom";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import List from "./pages/List";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./styles/output.css";

render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="list" element={<List />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
