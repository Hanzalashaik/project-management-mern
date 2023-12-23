import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaRegEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

export default function Table({ edit }) {
    const [projects, setProjects] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const token = localStorage.getItem('token');


    useEffect(() => {
        async function getProjects() {
            try {
                const user = JSON.parse(localStorage.getItem('users'));

                if(user?.uid){
                const response = await axios.get(`http://192.168.0.99:5000/user/getall/${user?.uid}/projects`, {
                    headers: {
                        'access-token': token
                    }
                });
                setProjects(response.data.projects);
            }

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        getProjects();
    }, []);

    async function deleteProject(idToDelete) {
        try {
            const user = JSON.parse(localStorage.getItem('users'));
            if(user?.uid){
            const response = await axios.delete(`http://192.168.0.99:5000/user/delete/${user?.uid}/${idToDelete}/projects`,{
                headers: {
                    'access-token': token
                }
            });
            console.log(response);
        }

            // Update the projects state after deletion
            setProjects(prevProjects => prevProjects.filter(project => project.uid !== idToDelete));
        } catch (error) {
            console.error('Error deleting project:', error);
        }
    }

    return (
        <>
            <table className="min-w-full divide-y divide-gray-200 mt-4 mr-4">
                <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Id</th>
                        <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project Name</th>
                        <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                        <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created by</th>
                        <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned to</th>
                        <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
                        <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Date</th>
                        <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {Array.isArray(projects) && projects.map((project) => (
                        <tr key={project.uid}>
                            <td className="px-2 py-4 whitespace-nowrap">{project.uid}</td>
                            <td className="px-2 py-4 whitespace-nowrap">{project.projectName}</td>
                            <td className="px-2 py-4 whitespace-nowrap">{project.description}</td>
                            <td className="px-2 py-4 whitespace-nowrap">{project.status}</td>
                            <td className="px-2 py-4 whitespace-nowrap">{project.createdBy}</td>
                            <td className="px-2 py-4 whitespace-nowrap">{project.assignedTo}</td>
                            <td className="px-2 py-4 whitespace-nowrap">{project.startDate}</td>
                            <td className="px-2 py-4 whitespace-nowrap">{project.endDate}</td>
                            <td className="px-2 py-4 whitespace-nowrap flex gap-2">
                                <button onClick={() => setShowModal(true)} className='text-orange-500 cursor-pointer'><FaRegEdit /></button>
                                {showModal && edit}
                                <button onClick={() => deleteProject(project.uid)} className='text-red-700 cursor-pointer'><MdDelete /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}
