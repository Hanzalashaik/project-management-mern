import React, { useState, useEffect } from 'react';
import StatusBar from '../components/StatusBar.jsx';
import SideBar from '../components/SideBar.jsx';
import BarChart from '../../utils/BarChart.jsx';
import axios from 'axios';

export default function Home() {
  const user = JSON.parse(localStorage.getItem('users'));
  const admin = JSON.parse(localStorage.getItem('admins'));
  const token = localStorage.getItem('token');
  const [data, setData] = useState({});

  useEffect(() => {
    async function getProfile() {
      try {
        let apiUrl = '';

        if (admin?.uid) {
          apiUrl = `http://192.168.0.99:5000/admin/getbyid/${admin?.uid}`;
        } else if (user?.uid) {
          apiUrl = `http://192.168.0.99:5000/user/getbyid/${user?.uid}`;
        } else {
          throw new Error('Invalid user or admin');
        }

        const response = await axios.get(apiUrl, {
          headers: {
            'access-token': token,
          },
        });

        setData(response.data.userverified);
      } catch (error) {
        console.log(error);
      }
    }

    getProfile();
  }, []);

  useEffect(() => {
    // Check if email and phone are not verified
    if (data && data.email === false && data.phone === false) {
      alert('Please Verify email and phone number');
    }
  }, [data]);

  return (
    <div className='flex '>
      <SideBar />
      <div className='w-full'>
        <StatusBar />
        <div>
          <h1 className='mx-9 my-4 text-2xl italic'>Dashboard</h1>
          <div>
            <BarChart />
          </div>
        </div>
      </div>
    </div>
  );
}
