import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import config from "../../config.json";

const Login = () => {
  const URL = config.URL;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");
  const [msg, setMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // let navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${URL}/public/login`, {
        email,
        password,
      });

      console.log(response.data.msg);
      const success = response.data.msg;

      if (success) {
        toast.success(success);
      }

      const data = response.data.foundUser;
      localStorage.setItem("data", JSON.stringify(data));

      const jwtsignToken = response.data.token;
      localStorage.setItem("token", jwtsignToken);

      setEmail("");
      setPassword("");

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      const errorMessage =
        error.response.data.msg || "Please Check Your Details";
      setErrors(errorMessage);
      // console.log(error);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen bg-stone-400 relative">
        <div className="w-3/4 sm:w-96 bg-stone-300 p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-semibold mb-4">Login</h1>
          <form className="flex flex-col items-center space-y-4">
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
              className="p-2 border rounded w-80"
              required
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="p-2 border rounded w-80 mt-2"
                required
              />
              {showPassword ? (
                <FaEyeSlash
                  className="absolute right-3 top-5 cursor-pointer"
                  onClick={togglePasswordVisibility}
                />
              ) : (
                <FaEye
                  className="absolute right-3 top-5 cursor-pointer"
                  onClick={togglePasswordVisibility}
                />
              )}
            </div>

            <div className="flex justify-between w-80">
              <p className="text-xs text-stone-800">
                <Link to="/signup">Don't have an account?</Link>
              </p>
              <p className="text-xs text-blue-500">
                <Link to="/forgetpassword">Forgot Password</Link>
              </p>
            </div>
            <button
              onClick={(e) => handleLogin(e)}
              className="p-2 bg-green-500 text-white rounded hover:bg-green-600 w-32 mx-auto"
            >
              Login
            </button>
          </form>
        </div>

        <div className="absolute bottom-4 right-4 bg-white p-4 border rounded shadow-md">
          <h2 className="text-lg font-semibold">Sample Credentials</h2>
          <p>Email: shaikhanzala37@gmail.com</p>
          <p>Password: Hanzala@123</p>
        </div>
      </div>

      <ToastContainer />
    </>
  );
};

export default Login;
