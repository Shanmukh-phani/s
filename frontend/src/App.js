// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Home';
import AdminLogin from './admin/AdminLogin';
import Dashboard from './admin/Dashboard';
import Hostel from './Hostel';
import AddingHostel from './admin/AddingHostel';
import AddBuddie from './admin/AddBuddie';
import AddRoom from './admin/AddRoom';
import HostelProfile from './admin/HostelProfile';
import ThankYouScreen from './admin/ThankYouScreen';
import Hostels from './Hostels';
import AboutUs from './AboutUs';
import Login from './Login';

import ProtectedRoute from './ProtectedRoute';
import TermsAndConditions from './TermsAndConditions';
import Settings from './admin/settings';
import HostelFees from './admin/HostelFees';
import FoodMenu from './admin/FoodMenu';

const App = () => {
  const isAuthenticated = !!localStorage.getItem('authToken');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hostel/:id" element={<Hostel />} />
        <Route path="/a" element={<AddingHostel />} />
        <Route path="/thanks" element={<ThankYouScreen />} />
        <Route path="/hostels" element={<Hostels />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/terms" element={<TermsAndConditions />} />

        



        {/* Protected Routes */}
        <Route path="/admin/*" element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route path="home" element={<Dashboard />} />
          <Route path="add-buddie" element={<AddBuddie />} />
          <Route path="add-room" element={<AddRoom />} />
          <Route path="settings" element={<Settings />} />
          <Route path="profile" element={<HostelProfile />} />
          <Route path="hostel-fees" element={<HostelFees />} />
          <Route path="food-menu" element={<FoodMenu />} />



          </Route>
               
        {/* Redirect if no match */}
        {/* <Route path="*" element={<Navigate to="/" />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
