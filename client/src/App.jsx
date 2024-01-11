import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from "./pages/Home.jsx"
import Login from "./pages/Login.jsx"
import Signup from './pages/Signup.jsx';
import User from "./pages/User.jsx"
import ForgetPassword from './pages/ForgetPassword.jsx';
import Admin from "./pages/Admin.jsx"
import ProfilePage from "./pages/ProfilePage.jsx"
import EditPage from "./pages/EditProfile.jsx"
import ResetPassword from "./pages/ResetPassword.jsx"
import { UserProvider } from "../utils/UserContext.jsx"

export default function App() {

  const user = localStorage.getItem("users");
  const admin = localStorage.getItem("admins");
  const isAuthenticated = user || admin; // Check if any user or admin is logged in
  // console.log(isAuthenticated);
  return (
    <UserProvider>
      <Router>

        <Routes>
          <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
          <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />} />
          <Route path="/signup" element={isAuthenticated ? <Navigate to="/" /> : <Signup />} />
          <Route path="/user" element={isAuthenticated ? <User /> : <Navigate to="/login" />} />
          <Route path="/admin" element={admin ? <Admin /> : <Navigate to="/login" />} />
          <Route path="/forgetpassword" element={isAuthenticated ? <Navigate to="/" /> : <ForgetPassword />} />
          <Route path="/profile" element={isAuthenticated ? <ProfilePage /> : <Navigate to="/login" />} />
          <Route path="/edit" element={isAuthenticated ? <EditPage /> : <Navigate to="/login" />} />
          <Route path="/reset-password" element={isAuthenticated ? <ResetPassword /> : <Navigate to="/login" />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}
