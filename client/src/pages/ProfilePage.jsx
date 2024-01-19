import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import axios from "axios"
import { useEffect } from 'react';
import config from "../../config.json"
export default function ProfilePage() {
  const URL = config.URL
  const [data, setData] = useState('')
  const info = JSON.parse(localStorage.getItem("data"))

  const token = localStorage.getItem("token")
  const navigate = useNavigate()


  useEffect(() => {
    async function getProfile() {
      try {
        let apiUrl = '';
        // console.log(userId);
        let role = info.role 
        if (role === "admin") {

          apiUrl = `${URL}/admin/getbyid/${info?.uid}`;
        } else if (role === "user") {

          apiUrl = `${URL}/user/getbyid/${info?.uid}`;
        } else {
          throw new Error('Invalid user or admin');
        }
        // console.log(apiUrl);
        const response = await axios.get(apiUrl, {
          headers: {
            'access-token': token
          }
        })
        // console.log(response.data);
        setData(response.data)

      } catch (error) {
        console.log(error);
      }
    }
    getProfile()
  }, [])

  const handleSubmit = (event) =>{
    event.preventDefault();
  }

  return (
    <>
      <div className='flex justify-center items-center h-screen'>
        <div className='w-3/4 sm:w-2/4 bg-stone-300 p-8 rounded-lg shadow-md'>
          <h1 className='font-bold text-center text-2xl mb-5'>Profile</h1>
          <form onSubmit={handleSubmit}>
            <div className='flex justify-evenly items-center'>

              <div>
                <h1 className='font-bold'>About</h1>
                <div className='flex flex-col space-y-4 mt-4'>
                  <div className='flex items-center space-x-4'>
                    <div>
                      <label className='font-semibold text-gray-600'>Name :</label>
                    </div>
                    <div className='text-blue-700 font-bold'>{data.fullName}</div>
                  </div>
                  <div className='flex items-center space-x-4'>
                    <div>
                      <label className='font-semibold text-gray-600'>Phone :</label>
                    </div>
                    <div className='text-blue-700 font-bold'>{data.phone}</div>
                  </div>
                  <div className='flex items-center space-x-4'>
                    <div>
                      <label className='font-semibold text-gray-600'>Email :</label>
                    </div>
                    <div className='text-blue-700 font-bold'>{data.email}</div>
                  </div>
                  <div className='flex items-center space-x-4'>
                    <div>
                      <label className='font-semibold text-gray-600'>Title :</label>
                    </div>
                    <div className='text-blue-700 font-bold'>{data.title}</div>
                  </div>
                  <div className='flex items-center space-x-4'>
                    <div>
                      <label className='font-semibold text-gray-600'>Role</label>
                    </div>
                    <div className='text-blue-700 font-bold'>{data.role}</div>
                  </div>
                </div>
              </div>
            </div>

          </form>
          <div className='flex justify-center mt-7 space-x-4'>
            <button onClick={() => navigate("/")} className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-green-600'>
              Back
            </button>
            <button onClick={() => navigate("/edit")} className='px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600'>
              Edit
            </button>

          </div>
        </div>
      </div>
    </>
  );
}
