import React, { useState, useEffect ,useContext } from 'react';
import axios from 'axios';
import { FaRegEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import EditTable from '../pages/EditTable';
import { UserContext } from "../../utils/UserContext.jsx"
import config from "../../config.json"
import DeleteModal from './DeleteModal.jsx';

export default function Table() {
    const URL = config.URL
    const [projects, setProjects] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [projectUid, setProjectUid] = useState('');
    const token = localStorage.getItem('token');
    const { count , setCount } = useContext(UserContext);
    const [deleteModal, setDeleteModal] = useState(false);

    
    useEffect(() => {
        async function getProjects() {
            try {
                const data = JSON.parse(localStorage.getItem('data'));
                // console.log(admin);
                
                if (data?.uid) {
                    const response = await axios.get(`${URL}/admin/getall/${data?.uid}/projects`, {
                        headers: {
                            'access-token': token
                        }
                    });
                    setProjects(response.data.projects);
                    // console.log(response);
                    let projectCount = response.data.projects
                    let count1 = projectCount.length
                    setCount(count1)
                    // console.log(count1);
                    // console.log(count);
                }

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        getProjects();
    }, [[showModal]]);

    

    async function deleteProject(idToDelete) {
        try {
            const data = JSON.parse(localStorage.getItem('data'));
            if (data?.uid) {
                const response = await axios.delete(`${URL}/admin/delete/${data?.uid}/${idToDelete}/projects`, {
                    headers: {
                        'access-token': token
                    }
                });
                console.log(response.data.success);
            }


            setProjects(prevProjects => prevProjects.filter(project => project.uid !== idToDelete));
        } catch (error) {
            console.error('Error deleting project:', error);
        }
    }

    function editProject(e,id){
        e.preventDefault();
        setShowModal(true)
        setProjectUid(id)
        // console.log(id);
    }
    function openDeleteModal(id) {
        setProjectUid(id);
        setDeleteModal(true);
    }



    return (
        <>
        {deleteModal && <DeleteModal setDeleteModal={setDeleteModal} deleteFunction={() => deleteProject(projectUid)} />}
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
                    {Array.isArray(projects) && projects.map((project, index) => (
                        <tr key={index + 1}>
                            <td className="px-2 py-4 whitespace-nowrap">{index+1}</td>
                            <td className="px-2 py-4 whitespace-nowrap">{project.projectName}</td>
                            <td className="px-2 py-4 whitespace-nowrap">{project.description}</td>
                            <td className="px-2 py-4 whitespace-nowrap">{project.status}</td>
                            <td className="px-2 py-4 whitespace-nowrap">{project.createdBy}</td>
                            <td className="px-2 py-4 whitespace-nowrap">{project.assignedTo}</td>
                            <td className="px-2 py-4 whitespace-nowrap">{project.startDate}</td>
                            <td className="px-2 py-4 whitespace-nowrap">{project.endDate}</td>
                            <td className="px-2 py-4 whitespace-nowrap flex gap-2">
                                <button onClick={(e)=>editProject(e,project.uid)} className='text-orange-500 cursor-pointer'><FaRegEdit /></button>
                               
                                <button onClick={() => openDeleteModal(project.uid)} className='text-red-700 cursor-pointer'><MdDelete /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {showModal && <EditTable projectUid={projectUid} setShowModal={setShowModal} />}
        </>
    );
}

