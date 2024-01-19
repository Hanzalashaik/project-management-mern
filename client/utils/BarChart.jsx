import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS } from "chart.js/auto"
import config from "../config.json"

export default function BarChart() {
  const token = localStorage.getItem('token');
  const info = JSON.parse(localStorage.getItem('data'));
  const [userData, setUserData] = useState(null);
  const [data, setData] = useState(null);

  const URL = config.URL;

  const countProjects = (projects) => {
    if (!Array.isArray(projects)) {
      return {};
    }

    return projects.reduce((count, project) => {
      count[project.status] = (count[project.status] || 0) + 1;
      return count;
    }, {});
  };

  const fetchData = async () => {
    try {
      let role = info.role
      const apiUrl = role === 'admin' ? `${URL}/admin/getbyid/${info?.uid}` : `${URL}/user/getbyid/${info?.uid}`;

      const response = await axios.get(apiUrl, {
        headers: {
          'access-token': token,
        },
      });

      // console.log(response);

      setData(response.data.projects);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token, info?.uid]);

  useEffect(() => {
    if (data) {
      const projectsCount = countProjects(data);
      setUserData({
        labels: Object.keys(projectsCount),
        datasets: [
          {
            label: 'Projects',
            data: Object.values(projectsCount),
            backgroundColor: [
              'rgba(75, 192, 192, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(153, 102, 255, 0.6)',
              'rgba(255, 99, 132, 0.6)',
            ],
          },
        ],
      });
    }
  }, [data]);

  return <>{userData && <Bar data={userData} />}</>;
}
