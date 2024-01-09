import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import {Chart as ChartJS} from "chart.js/auto"
import config from "../config.json"

export default function BarChart() {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('users'));
  const admin = JSON.parse(localStorage.getItem('admins'));
  const [userData, setUserData] = useState(null);
  const [data, setData] = useState(null);
  const URL = config.URL

  function countProjects(projects) {
    if (!Array.isArray(projects)) {
      // If projects is not an array, return an empty object or handle accordingly
      return {};
    }

    const total = projects.length;
    const inProgress = projects.filter(project => project.status === 'In Progress').length;
    const completed = projects.filter(project => project.status === 'Completed').length;
    const cancelled = projects.filter(project => project.status === 'Cancelled').length;
    const pending = projects.filter(project => project.status === 'Pending').length;
    const notStarted = projects.filter(project => project.status === 'Not Started').length;

    return { total, inProgress, cancelled, pending, notStarted, completed };
  }

  useEffect(() => {
    async function getStatus() {
      try {
        let apiUrl = '';

        if (admin?.uid) {
          apiUrl = `${URL}/admin/getbyid/${admin?.uid}`;
        } else if (user?.uid) {
          apiUrl = `${URL}/user/getbyid/${user?.uid}`;
        } else {
          throw new Error('Invalid user or admin');
        }

        const response = await axios.get(apiUrl, {
          headers: {
            'access-token': token
          }
        });

        setData(response.data.projects);
      } catch (error) {
        console.log(error);
      }
    }

    getStatus();
  }, [admin?.uid, token, user?.uid]);

  useEffect(() => {
    if (data) {
      const projectsCount = countProjects(data);
      setUserData({
        labels: ['Completed', 'Pending', 'In Progress', 'Not Started', 'Cancelled'],
        datasets: [
          {
            label: 'Projects',
            data: [
              projectsCount.completed || 0,
              projectsCount.pending || 0,
              projectsCount.inProgress || 0,
              projectsCount.notStarted || 0,
              projectsCount.cancelled || 0
            ],
            backgroundColor: [
              'rgba(75, 192, 192, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(153, 102, 255, 0.6)',
              'rgba(255, 99, 132, 0.6)'
            ]
          }
        ]
      });
    }
  }, [data]);

  return (
    <>
      {userData && <Bar data={userData}  />}
    </>
  );
}
