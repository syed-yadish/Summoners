import React from "react";
import Home from './pages/home';
import Profile from './pages/profile';

import {
  Routes,
  Route
} from "react-router-dom";

import './App.css';

function App() {

  return (

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>

  );
}

export default App;
