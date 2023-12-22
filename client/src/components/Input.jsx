import React, { useRef, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../../utils/UserContext.jsx';

const generateUniqueId = (() => {
    let projectIdCounter = 1; 

    return () => {
        const uniqueId = projectIdCounter.toString();
        projectIdCounter++; 
        return uniqueId;
    };
})();

export default function Input({ onAddProject, setShowModal }) {
    const projectName = useRef();
    const description = useRef();
    const status = useRef();
    const createdBy = useRef();
    const assignedTo = useRef();
    const startDate = useRef();
    const endDate = useRef();

    const { userId, adminId } = useContext(UserContext);

    async function handleSave(e) {
        e.preventDefault();

        const newProject = {
            uid: generateUniqueId(),
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


            if (adminId) {

                apiUrl = `http://192.168.0.99:5000/admin/addprojects/${adminId}/projects`;
            } else if (userId) {
                apiUrl = `http://192.168.0.99:5000/user/addprojects/${userId}/projects`;
            } else {

                throw new Error('Invalid user or admin');
            }

            const response = await axios.post(apiUrl, newProject);

            console.log(response.data);

            onAddProject(newProject);

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
                            <h2 className="text-lg font-bold mb-4">Add New Project</h2>
                            <div className="grid grid-cols-1 gap-4">
                                <div className="flex flex-col">
                                    <label className="text-gray-600 mb-1">Project Name:</label>
                                    <input
                                        className="border rounded-md px-2 py-1 w-full focus:outline-none focus:border-blue-500"
                                        ref={projectName}
                                        type="text"
                                        required
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-gray-600 mb-1">Description:</label>
                                    <input
                                        className="border rounded-md px-2 py-1 w-full focus:outline-none focus:border-blue-500"
                                        ref={description}
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
                                    </select>
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-gray-600 mb-1">Created By:</label>
                                    <input
                                        className="border rounded-md px-2 py-1 w-full focus:outline-none focus:border-blue-500"
                                        ref={createdBy}
                                        type="text"
                                        required
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-gray-600 mb-1">Assigned To:</label>
                                    <input
                                        className="border rounded-md px-2 py-1 w-full focus:outline-none focus:border-blue-500"
                                        ref={assignedTo}
                                        type="text"
                                        required
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-gray-600 mb-1">Start Date:</label>
                                    <input
                                        className="border rounded-md px-2 py-1 w-full focus:outline-none focus:border-blue-500"
                                        ref={startDate}
                                        type="date"
                                        required
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-gray-600 mb-1">End Date:</label>
                                    <input
                                        className="border rounded-md px-2 py-1 w-full focus:outline-none focus:border-blue-500"
                                        ref={endDate}
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