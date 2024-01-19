import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios"
import config from "../../config.json"

export default function EditPage() {

  const URL = config.URL

  const token = localStorage.getItem("token");
  const data = JSON.parse(localStorage.getItem("data"));


  const [email, setEmail] = useState("");

  const [phone, setPhone] = useState("");
  const [fullName, setFullName] = useState("");
  const [title, setTitle] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handleFullNameChange = (event) => {
    setFullName(event.target.value);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  async function updateProfile(event) {
    event.preventDefault();

    try {
      let apiUrl = '';
      let role = data.role
      if (role === "admin") {
        apiUrl = `${URL}/admin/updateAdmin/${data?.uid}`;
      } else if (role === "user") {
        apiUrl = `${URL}/user/updateUser/${data?.uid}`;
      } else {
        throw new Error('Invalid user or admin');
      }

      const updateData = {
        email,
        phone,
        fullName,
        title
      };

      const response = await axios.put(apiUrl, updateData, {
        headers: {
          "access-token": token
        }
      });


      console.log("Profile Updated Successfully", response.status);
    } catch (error) {

      console.error("Error updating profile:", error);
    }
    window.location.reload();
  }


  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-80">
        <h2 className="text-2xl font-semibold mb-4">Edit</h2>
        <form onSubmit={updateProfile} >
          {/* Email field */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email:</label>
            <input
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              type="email"
              value={email}
              required
              onChange={handleEmailChange}
            />
          </div>
          {/* Phone field */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Phone:</label>
            <input
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              type="text"
              value={phone}
              required
              onChange={handlePhoneChange}
            />
          </div>
          {/* Full Name field */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Full Name:</label>
            <input
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              type="text"
              value={fullName}
              required
              onChange={handleFullNameChange}
            />
          </div>
          {/* Title field */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Title:</label>
            <input
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              type="text"
              value={title}
              required
              onChange={handleTitleChange}
            />
          </div>
          <div className='flex justify-center mt-7 space-x-4'>
            {/* Back button */}
            <button className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-green-600'>
              <Link to="/profile">Back</Link>
            </button>
            {/* Submit button */}
            <button type="submit" className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md focus:outline-none focus:bg-blue-600">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
