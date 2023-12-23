import React, { useState } from 'react';
import img from '/profile.jpg';
import { Link } from 'react-router-dom';
import axios from "axios"
import { useEffect } from 'react';

export default function ProfilePage() {

  const [data, setData] = useState('')
  const user = JSON.parse(localStorage.getItem("users"))
  const admin = JSON.parse(localStorage.getItem("admins"))
  const token = localStorage.getItem("token")


  useEffect(() => {
    async function getProfile() {
      try {
        let apiUrl = '';
        // console.log(userId);
        
        if (admin?.uid) {
          
          apiUrl = `http://192.168.0.99:5000/admin/getbyid/${admin?.uid}`;
        } else if (user?.uid) {
          
          apiUrl = `http://192.168.0.99:5000/user/getbyid/${user?.uid}`;
        } else {
          throw new Error('Invalid user or admin');
        }
        // console.log(apiUrl);
        const response = await axios.get(apiUrl,{
          headers: {
              'access-token': token
          }
      })
        console.log(response.data);
        setData(response.data)

      } catch (error) {
        console.log(error);
      }
    }
    getProfile()
  }, [])

  return (
    <>
      <div className='flex justify-center items-center h-screen'>
        <div className='w-3/4 sm:w-2/4 bg-stone-300 p-8 rounded-lg shadow-md'>
          <h1 className='font-bold text-center text-2xl mb-5'>Profile</h1>
          <form method=''>
            <div className='flex justify-evenly items-center'>
              <img
                className='w-36 h-36 ring-2 ring-gray-300 dark:ring-gray-500 rounded-full'
                src={img}
                alt='image'
              />
              <div>
                <h1 className='font-bold'>About</h1>
                <div className='flex flex-col space-y-4 mt-4'>
                  <div className='flex items-center space-x-4'>
                    <div>
                      <label className='font-semibold text-gray-600'>User ID</label>
                    </div>
                    <div className='text-blue-700 font-bold'>{data.uid}</div>
                  </div>
                  <div className='flex items-center space-x-4'>
                    <div>
                      <label className='font-semibold text-gray-600'>Email</label>
                    </div>
                    <div className='text-blue-700 font-bold'>{data.email}</div>
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
            <button className='px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600'>
              <Link to={"/edit"}>Edit</Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
