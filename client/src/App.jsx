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

  const user = localStorage.getItem("users")
  const admin = localStorage.getItem("admins")
  // console.log(admin);

  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={user || admin ? <Home /> : <Navigate to="/login" />} />
          <Route path="/login" element={user || admin ? <Navigate to="/" /> : <Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/user" element={user || admin ? <User /> : <Navigate to="/login" />} />
          <Route path="/admin" element={user || admin ? <Admin /> : <Navigate to="/login" />} />
          <Route path="/forgetpassword" element={<ForgetPassword />} />
          <Route path="/profile" element={user || admin ? <ProfilePage /> : <Navigate to="/login" />} />
          <Route path="/edit" element={<EditPage />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}
