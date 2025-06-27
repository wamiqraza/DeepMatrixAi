import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Service from './pages/Service';
import ContactUs from './pages/ContactUs';
import Blog from './pages/Blog';
import './App.css'; 
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Error from './pages/Error';
import ServiceDetail from './pages/ServiceDetail';
import BlogDetail from './pages/BlogDetail';

// Use to protect dashboard route from direct access
const PrivateRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  return isLoggedIn ? children : <Navigate to="/login" />;
};

const App = () => {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Service />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>}></Route>
        <Route path="/services/:slug" element={<ServiceDetail />} />
        <Route path="/blogs/:slug" element={<BlogDetail />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
};


export default App;