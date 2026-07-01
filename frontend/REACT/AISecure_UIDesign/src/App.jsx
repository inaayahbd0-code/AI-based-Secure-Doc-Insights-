import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";


const App = () => {
  return (
    
     <Routes>
      
       <Route path="/" element={<Login/>}/> 
       <Route path="/" element={<Signup/>}/> 
       <Route path="/" element={<Dashboard/>}/>
     </Routes>
  );
}
export default App;