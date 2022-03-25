import React from "react"
import  render  from "react-dom"
import  Route, Routes, BrowserRouter  from "react-router-dom"
import Home from "./pages/Home"
import Levels from "./pages/Levels"
import Play from "./pages/Play"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Shop from "./pages/Shop"
import "./styles/output.css"

Test
Display:
  Content of Home if url starts with "/"
  Content of Levels if url starts with "levels"
  Content of Shop if url starts with "Shop"
  Content of Login if url starts with "login"
  Content of Register if url starts with "register"
  Content of Play if url starts with "play/:attemptNumber/:id/:mode/:number"
