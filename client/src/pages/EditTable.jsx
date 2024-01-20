import React, { useEffect } from 'react';
import { useRef, useState } from 'react';
import config from "../../config.json";
import axios from "axios";

export default function EditTable({ setShowModal, projectUid }) {
    const URL = config.URL;
    const projectName = useRef();
    const description = useRef();
    const status = useRef();
    const createdBy = useRef();
    const assignedTo = useRef();
    const startDate = useRef();
    const endDate = useRef();

    const token = localStorage.getItem("token");
    const data = JSON.parse(localStorage.getItem("data"));

    const [userfullNames, setUserFullNames] = useState([]);
    const [adminfullNames, setAdminFullNames] = useState([]);
    const [ProjectName, setProjectName] = useState('');
    const [desc, setDesc] = useState('');
    const [StartDate, setStartDate] = useState('')
    const [EndDate, setEndDate] = useState('')

  
    useEffect(() => {
        async function getProjects() {
            let role = data.role;
            try {
                let response = await axios.get(`${URL}/${role}/getbyid/${data.uid}`, {
                    headers: {
                        "access-token": token
                    }
                });

                // Subtract 1 to convert 1-based index to 0-based index
                let id = projectUid - 1;

                // Check if projects exist and have the expected structure
                if (response.data.projects && Array.isArray(response.data.projects)) {
                    setProjectName(response.data.projects[id]?.projectName || '');
                    setDesc(response.data.projects[id]?.description || '');
                    setStartDate(response.data.projects[id]?.startDate || '');
                    setEndDate(response.data.projects[id]?.endDate || '');
                } else {
                    console.error('Unexpected response structure:', response.data);
                }
            } catch (error) {
                console.log(error);
            }
        }
        getProjects();
    }, [projectUid]);

    async function getAllUsers() {
        try {
            const userResponse = await axios.get(`${URL}/user/getall`, {
                headers: {
                    "access-token": token
                }
            });
            const AdminResponse = await axios.get(`${URL}/admin/getall`, {
                headers: {
                    "access-token": token
                }
            });
            const users = userResponse.data;
            const admins = AdminResponse.data;

            const userfullNames = users.map(user => user.fullName);
            const adminfullNames = admins.map(admin => admin.fullName);

            setUserFullNames(userfullNames);
            setAdminFullNames(adminfullNames);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllUsers();
    }, []);

    async function handleSave(e) {
        e.preventDefault();

        const updatedProjects = {
            projectName: projectName.current.value,
            description: description.current.value,
            status: status.current.value,
            createdBy: createdBy.current.value,
            assignedTo: assignedTo.current.value,
            startDate: startDate.current.value,
            endDate: endDate.current.value,
        };

        try {
            let apiUrl = '';
            let role = data.role;

            if (role === "admin") {
                apiUrl = `${URL}/admin/updatebyid/${data?.uid}/${projectUid}/projects`;
            } else if (role === "user") {
                apiUrl = `${URL}/user/updatebyid/${data?.uid}/${projectUid}/projects`;
            } else {
                throw new Error('Invalid user or admin');
            }

            const response = await axios.put(apiUrl, updatedProjects, {
                headers: {
                    "access-token": token
                }
            });

            projectName.current.value = '';
            description.current.value = '';
            status.current.value = '';
            createdBy.current.value = '';
            assignedTo.current.value = '';
            startDate.current.value = '';
            endDate.current.value = '';

            handleCloseModal();
        } catch (error) {
            console.log(error);
        }
    }

    function handleCloseModal() {
        setShowModal(false);
    }

    return (
        <form onSubmit={handleSave}>

            <div className="fixed z-10 inset-0 overflow-y-auto  ">
                <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <div className="fixed inset-0 transition-opacity">
                        <div className="absolute inset-0 bg-stone-400 opacity-80 backdrop-blur-xl"></div>
                    </div>
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
                    <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                        <div className="p-6">
                            <h2 className="text-lg font-bold mb-4">Update Project</h2>
                            <div className="grid grid-cols-1 gap-4">
                                <div className="flex flex-col">
                                    <label className="text-gray-600 mb-1">Project Name:</label>
                                    <input
                                        className="border rounded-md px-2 py-1 w-full focus:outline-none focus:border-blue-500"
                                        ref={projectName}
                                        type="text"
                                        defaultValue={ProjectName}
                                        required
                                    />

                                </div>
                                <div className="flex flex-col">
                                    <label className="text-gray-600 mb-1">Description:</label>
                                    <input
                                        className="border rounded-md px-2 py-1 w-full focus:outline-none focus:border-blue-500"
                                        ref={description}
                                        defaultValue={desc}
                                        type="text"
                                        required
                                    />

                                </div>
                                <div className="flex flex-col">
                                    <label className="text-gray-600 mb-1">Status:</label>
                                    <select
                                        name="status"
                                        ref={status}
                                        id="status"
                                 
                                        className="p-2 rounded border text-lg"
                                        required
                                    >
                                        <option value="Completed">Completed</option>
                                        <option value="Pending">Pending</option>
                                        <option value="Not Started">Not Started</option>
                                        <option value="Cancelled">Cancelled</option>
                                        <option value="In Progress">In Progress</option>
                                    </select>
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-gray-600 mb-1">Created By:</label>
                                    <select
                                        className="border rounded-md px-2 py-1 w-full focus:outline-none focus:border-blue-500"
                                        ref={createdBy}
                  
                                        required
                                    >
                                        {userfullNames.map((userName, index) => (
                                            <option key={`user-${index}`} value={userName}>
                                                {userName}
                                            </option>
                                        ))}
                                        {adminfullNames.map((adminName, index) => (
                                            <option key={`admin-${index}`} value={adminName}>
                                                {adminName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-gray-600 mb-1">Assigned To:</label>
                                    <select
                                        className="border rounded-md px-2 py-1 w-full focus:outline-none focus:border-blue-500"
                                        ref={assignedTo}
                            
                                        required
                                    >
                                        {userfullNames.map((userName, index) => (
                                            <option key={`user-${index}`} value={userName}>
                                                {userName}
                                            </option>
                                        ))}
                                        {adminfullNames.map((adminName, index) => (
                                            <option key={`admin-${index}`} value={adminName}>
                                                {adminName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-gray-600 mb-1">Start Date:</label>
                                    <input
                                        className="border rounded-md px-2 py-1 w-full focus:outline-none focus:border-blue-500"
                                        ref={startDate}
                                        defaultValue={StartDate}
                                        type="date"
                                        required
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-gray-600 mb-1">End Date:</label>
                                    <input
                                        className="border rounded-md px-2 py-1 w-full focus:outline-none focus:border-blue-500"
                                        ref={endDate}
                                        defaultValue={EndDate}
                                        type="date"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                            <button
                                type="submit"
                                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                            >
                                Save Project
                            </button>
                            <button
                                onClick={handleCloseModal}
                                type="button"
                                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                            >
                                Cancel
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}
