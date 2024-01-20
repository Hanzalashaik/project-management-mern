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
  const data = localStorage.getItem("data");



  return (
    <UserProvider>
  <Router>
    <Routes>
      <Route path="/" element={data ? <Home /> : <Navigate to="/login" />} />
      <Route path="/login" element={data ? <Home /> : <Login />} />
      <Route path="/signup" element={data ? <Navigate to="/" /> : <Signup />} />
      <Route path="/user" element={data ? <User /> : <Navigate to="/login" />} />
      <Route path="/admin" element={data ? <Admin /> : <Navigate to="/login" />} />
      <Route path="/forgetpassword" element={data ? <Navigate to="/" /> : <ForgetPassword />} />
      <Route path="/profile" element={data ? <ProfilePage /> : <Navigate to="/login" />} />
      <Route path="/edit" element={data ? <EditPage /> : <Navigate to="/login" />} />
      <Route path="/reset-password" element={<ResetPassword /> }/>
    </Routes>
  </Router>
</UserProvider>

  );
}
