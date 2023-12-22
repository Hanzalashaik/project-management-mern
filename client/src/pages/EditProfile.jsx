import React from 'react';
import { Link } from 'react-router-dom';

export default function EditPage() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">

      <div className="bg-white p-8 rounded-lg shadow-md w-80">
        <h2 className="text-2xl font-semibold mb-4">Edit</h2>
        <form method="">
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email:</label>
            <input
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              type="email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Role:</label>
            <input
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              type="text"
            />
          </div>
          <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none focus:bg-blue-600">
            <Link to="/profile">Submit</Link>
          </button>
        </form>
      </div>
    </div>
  );
}
