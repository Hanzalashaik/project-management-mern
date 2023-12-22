import React, { useContext, useState, useEffect } from 'react';
import { FaRegCircleDot } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";
import { MdOutlinePendingActions } from 'react-icons/md';
import { FcCancel } from 'react-icons/fc';
import axios from 'axios';
import { UserContext } from '../../utils/UserContext.jsx';

export default function StatusBar() {
  const { userId, adminId } = useContext(UserContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getStatus() {
      try {
        let apiUrl = '';

        if (adminId) {
          apiUrl = `http://192.168.0.99:5000/user/getbyid/${adminId}`;
        } else if (userId) {
          apiUrl = `http://192.168.0.99:5000/user/getbyid/${userId}`;
        } else {
          throw new Error('Invalid user or admin');
        }

        const response = await axios.get(apiUrl);
        console.log(response.data.projects);
        setData(response.data.projects);
      } catch (error) {
        console.log(error);
      }
    }

    getStatus();
  }, [userId, adminId]);

  function countProjects(projects) {
    const total = projects.length;
    const inProgress = projects.filter(project => project.status === 'In Progress').length;
    const cancelled = projects.filter(project => project.status === 'Cancelled').length;
    const pending = projects.filter(project => project.status === 'Pending').length;
    const notStarted = projects.filter(project => project.status === 'Not Started').length;

    return { total, inProgress, cancelled, pending, notStarted };
  }

  const projectsCount = countProjects(data);

  return (
    <>
      <h1 className='mx-9 my-1 text-2xl italic'>Status</h1>
      <div className='h-40 bg-stone-600 rounded-3xl mx-5 flex justify-around items-center p-5'>
        <div className='flex flex-col items-center'>
          <FaCheckCircle className='text-4xl text-green-700 mb-2' />
          <h1 className='text-blue-100 text-lg font-semibold'>{projectsCount.total} Total</h1>
        </div>

        <div className='flex flex-col items-center'>
          <FaRegCircleDot className='text-4xl text-blue-700 mb-2' />
          <h1 className='text-blue-100 text-lg font-semibold'>{projectsCount.inProgress} In progress</h1>
        </div>

        <div className='flex flex-col items-center'>
          <FcCancel className='text-4xl text-red-700 mb-2' />
          <h1 className='text-blue-100 text-lg font-semibold'>{projectsCount.cancelled} Cancelled</h1>
        </div>

        <div className='flex flex-col items-center'>
          <MdOutlinePendingActions className='text-4xl text-yellow-700 mb-2' />
          <h1 className='text-blue-100 text-lg font-semibold'>{projectsCount.pending} Pending</h1>
        </div>

        <div className='flex flex-col items-center'>
          <FaRegCircleDot className='text-4xl text-red-700 mb-2' />
          <h1 className='text-blue-100 text-lg font-semibold'>{projectsCount.notStarted} Not Started</h1>
        </div>
      </div>
    </>
  );
}
