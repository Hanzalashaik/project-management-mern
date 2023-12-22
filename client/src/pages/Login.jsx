import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import { UserContext } from '../../utils/UserContext.jsx';

const Login = () => {
  const { setUserId, setAdminId } = useContext(UserContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState('');
  const [msg, setMsg] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const postUserLogin = async () => {
    try {
      const response = await axios.post('http://192.168.0.99:5000/user/login', {
        email,
        password,
      });

      console.log(response.data.user.uid);
      const userId = response.data.user.uid;
      setUserId(userId);
      const successMsg = response.data.msg;

      return successMsg
    } catch (error) {
      const errorMessage = error.response?.data?.msg || 'An error occurred';
      setErrors(errorMessage);
    }
  };

  const postAdminLogin = async () => {
    try {
      const response = await axios.post('http://192.168.0.99:5000/admin/login', {
        email,
        password,
      });

      const successMsg = response.data.msg;

      const adminId = response.data.admin.uid;
      setAdminId(adminId);
      console.log(adminId);

      return successMsg;
    } catch (error) {
      const errorMessage = error.response?.data?.msg || 'An error occurred';
      setErrors(errorMessage);
    }
  };

  const handleLogin = async (e, userType) => {
    e.preventDefault();
    let successMsg = '';

    if (userType === 'user') {
      successMsg = await postUserLogin();
    } else if (userType === 'admin') {
      successMsg = await postAdminLogin();
    }
    setMsg(successMsg)
    if (successMsg) {
      toast.success(successMsg);
      setTimeout(() => {
        navigate('/');
      }, 4000);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen bg-stone-400">
        <div className="w-3/4 sm:w-2/4 bg-stone-300 p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-semibold mb-4">Login</h1>
          <form className="flex flex-col space-y-4">
            {errors && !msg && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4">
                {errors}
              </div>
            )}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-2 border rounded"
              required
            />
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="p-2 border rounded"
                required
              />
              {showPassword ? (
                <FaEyeSlash
                  className="absolute right-3 top-3 cursor-pointer"
                  onClick={togglePasswordVisibility}
                />
              ) : (
                <FaEye
                  className="absolute right-3 top-3 cursor-pointer"
                  onClick={togglePasswordVisibility}
                />
              )}
            </div>


            <div className="flex justify-between">
              <p className="text-xs text-stone-800">
                <Link to="/signup">Don't have an account?</Link>
              </p>
              <p className="text-xs text-blue-500">
                <Link to={'/forgetpassword'}>Forgot Password</Link>
              </p>
            </div>
            <button
              onClick={(e) => handleLogin(e, 'user')}
              className="p-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              User Login
            </button>
            <button
              onClick={(e) => handleLogin(e, 'admin')}
              className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Admin Login
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;
