import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import Home from './Components/Home/Home';
import Profile from './Components/Profile/Profile';
import PrivateRoute from './utils/PrivateRoute';

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/me" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
};

export default App;
