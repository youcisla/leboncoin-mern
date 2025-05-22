import { Route, Routes } from 'react-router-dom';
import AllAds from './Components/AllAds/AllAds';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import MyAds from './Components/MyAds/MyAds';
import Navbar from './Components/Navbar/Navbar';
import Profile from './Components/Profile/Profile';
import Register from './Components/Register/Register';
import PrivateRoute from './utils/PrivateRoute';

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/me" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="/my-ads" element={<PrivateRoute><MyAds /></PrivateRoute>} />
        <Route path="/all-ads" element={<PrivateRoute><AllAds /></PrivateRoute>} />
      </Routes>
    </>
  );
};

export default App;
