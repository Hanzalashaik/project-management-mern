import React from 'react';
import Home from "./pages/Home.jsx"
import Login from "./pages/Login.jsx"
import Signup from './pages/Signup.jsx';
import User from "./pages/User.jsx"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ForgetPassword from './pages/ForgetPassword.jsx';
import Admin from "./pages/Admin.jsx"
import ProfilePage from "./pages/ProfilePage.jsx"
import EditPage from "./pages/EditProfile.jsx"

import { UserProvider } from '../utils/UserContext.jsx';

export default function App() {

  return (
    <Router>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/user" element={<User />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/forgetpassword" element={<ForgetPassword />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/edit" element={<EditPage />} />


        </Routes>
      </UserProvider>
    </Router>
  );
}
