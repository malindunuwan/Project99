import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import Meeting from './pages/Meeting';
import ProfilePage from './pages/ProfilePage';
import AdminDashboard from './admin_pages/AdminDashboard';
import AddUser from './admin_pages/AddUser';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/add-user" element={<AddUser />} />
          <Route path="/meeting" element={<Meeting />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
