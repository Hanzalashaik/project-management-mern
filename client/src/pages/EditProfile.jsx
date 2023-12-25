import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios"

export default function EditPage() {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("users"));
  const admin = JSON.parse(localStorage.getItem("admins"));

  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [phone, setPhone] = useState("");
  const [fullName, setFullName] = useState("");
  const [title, setTitle] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
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

      if (admin?.uid) {
        apiUrl = `http://192.168.0.99:5000/admin/updateadmin/${admin?.uid}`;
      } else if (user?.uid) {
        apiUrl = `http://192.168.0.99:5000/user/updateUser/${user?.uid}`;
      } else {
        throw new Error('Invalid user or admin');
      }

      const updateData = {
        email: email,
        role: role

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
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-80">
        <h2 className="text-2xl font-semibold mb-4">Edit</h2>
        <form onSubmit={updateProfile}>
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
          {/* Role field */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Role:</label>
            <input
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              type="text"
              value={role}
              required
              onChange={handleRoleChange}
            />
          </div>
          {/* Add more fields */}
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
              <Link to="/profile">Submit</Link>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
