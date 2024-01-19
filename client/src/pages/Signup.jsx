import React, { useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import config from "../../config.json"


import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function Signup() {
  const URL = config.URL

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

  async function handleSubmit(event) {
    event.preventDefault();

    const selectedRole = roleRef.current.value;

    try {
      const response = await axios.post(`${URL}/public/register/${selectedRole}`, {
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
      console.log(response);

    } catch (error) {
      console.log(error);

      const defaultErrorMessage1 = "Something went wrong";
      const defaultErrorMessage2 = ".";

      const errorMessage1 = error.response?.data?.error?.[0]?.msg || defaultErrorMessage1;
      const errorMessage2 = error.response?.data?.msg || defaultErrorMessage2;
    
      const errorMessage = errorMessage1 ? `${errorMessage1}. ${errorMessage2}` : errorMessage2;

      setErrors(errorMessage);
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
      <div className="flex justify-center items-center h-full  bg-stone-400">
        <div className="sm:w-4/5 rounded-lg flex flex-col justify-center items-center mb-4 bg-stone-300 p-5 m-5">
          <h1 className="text-2xl md:text-3xl font-bold mb-4">Sign Up</h1>
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
                className="p-2 w-96  outline-none rounded text-lg"
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
                className="p-2 w-96  outline-none rounded text-lg"
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
                className="p-2 w-96  outline-none rounded text-lg"
                required
              />
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="phone" className="mb-1">
                Phone:
              </label>
              <input
                type="text"
                id="phone"
                ref={phoneRef}
                className="p-2 w-96  outline-none rounded text-lg"
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
                className="p-2 w-96 outline-none rounded text-lg"
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
                className="p-2 w-96 outline-none rounded text-lg"
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
                  className="p-2 w-96 outline-none rounded text-lg"
                  required
                />
                {showPassword ? (
                  <FaEyeSlash
                    className="absolute right-3 top-4 cursor-pointer"
                    onClick={togglePasswordVisibility}
                  />
                ) : (
                  <FaEye
                    className="absolute right-3 top-4 cursor-pointer"
                    onClick={togglePasswordVisibility}
                  />
                )}

              </div>
            </div>
            <div className="flex justify-center"> {/* Add this container for centering */}
              <button
                type="submit"
                className="p-2 w-32 bg-green-500 font-bold text-white rounded hover:bg-green-600"
              >
                Sign up
              </button>
            </div>
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
