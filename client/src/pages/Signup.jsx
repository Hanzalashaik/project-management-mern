import React, { useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function Signup() {
  const navigate = useNavigate();

  const fullNameRef = useRef(null);
  const displayNameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const roleRef = useRef(null);
  const titleRef = useRef(null);
  const passwordRef = useRef(null);

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState);
  };


  const [errors, setErrors] = useState('');
  const [userId, setUserId] = useState(() => {
    // Retrieve the userId from localStorage or set it to 1 if it doesn't exist
    const storedUserId = localStorage.getItem('userId');
    return storedUserId ? parseInt(storedUserId, 10) : 1;
  });

  useEffect(() => {
    // Store the userId in localStorage whenever it changes
    localStorage.setItem('userId', userId);
  }, [userId]);


  async function handleSubmit(event) {
    event.preventDefault();

    const selectedRole = roleRef.current.value;
    const endpoint =
      selectedRole === 'admin'
        ? 'http://192.168.0.99:5000/admin/register'
        : 'http://192.168.0.99:5000/user/register';

    try {
      const response = await axios.post(endpoint, {
        uid: userId,
        fullName: fullNameRef.current.value,
        displayName: displayNameRef.current.value,
        email: emailRef.current.value,
        phone: phoneRef.current.value,
        role: selectedRole,
        title: titleRef.current.value,
        password: passwordRef.current.value,
      });

      const successMsg = response.data.msg;
      if (successMsg) {
        notify(successMsg);
        setTimeout(() => {
          navigate('/login');
        }, 4000);

      }
      setUserId(prevUserId => prevUserId + 1);


      console.log(response);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errorMessage = error.response.data.error[0].msg;
        setErrors(errorMessage);
      } else {
        console.log('Server error:', error.message);
      }
    }
  }

  const notify = (successMsg) => {
    toast.success(successMsg || 'Registered Successfully', {
      position: 'bottom-left',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  };

  return (
    <>
      <div className="flex justify-center items-center h-full bg-stone-400">
        <div className="w-11/12 sm:w-3/4 md:w-2/4 lg:w-1/3 text-lg rounded-lg flex flex-col mb-4 bg-stone-300 p-5 m-5">
          <h1 className="text-2xl md:text-3xl font-semibold mb-4">Sign Up</h1>
          <form className="space-y-4 flex flex-col" onSubmit={handleSubmit}>
            {errors && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4">
                {errors}
              </div>
            )}
            <div className="flex flex-col mb-4 ">
              <label htmlFor="fullName" className="mb-1">
                Full Name:
              </label>
              <input
                type="text"
                id="fullName"
                ref={fullNameRef}
                className="p-2 outline-none rounded text-lg"
                required
              />
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="displayName" className="mb-1">
                Display Name:
              </label>
              <input
                type="text"
                id="displayName"
                ref={displayNameRef}
                className="p-2 outline-none rounded text-lg"
                required
              />
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="email" className="mb-1">
                Email:
              </label>
              <input
                type="email"
                id="email"
                ref={emailRef}
                className="p-2 outline-none rounded text-lg"
                required
              />
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="phone" className="mb-1">
                Phone:
              </label>
              <input
                type="number"
                id="phone"
                ref={phoneRef}
                className="p-2 outline-none rounded text-lg"
                required
              />
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="role" className="mb-1">
                Role:
              </label>
              <select
                name="role"
                id="role"
                ref={roleRef}
                className="p-2 outline-none rounded text-lg"
                required
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="title" className="mb-1">
                Title:
              </label>
              <input
                type="text"
                id="title"
                ref={titleRef}
                className="p-2 outline-none rounded text-lg"
                required
              />
            </div>
            <div className="flex flex-col mb-4 relative">
              <label htmlFor="password" className="mb-1">
                Password:
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  ref={passwordRef}
                  className="p-2 outline-none rounded text-lg"
                  required
                />
                <button
                  type="button"
                  className="absolute top-2 right-2 text-gray-500 focus:outline-none"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="p-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Sign up
            </button>
            <ToastContainer />
            <p className="text-sm text-center ">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-700">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
