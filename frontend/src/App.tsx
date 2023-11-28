import React from 'react';
import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import NavBar from './components/Navbar';



function App() {
  return (
    <div className="App">
      <NavBar/>
    </div>
  );
}

export default App;
