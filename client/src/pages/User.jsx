import React, { useState } from 'react';
import SideBar from '../components/SideBar.jsx';
import Table from '../components/Table.jsx';
import Input from '../components/Input.jsx';
import EditTable from './EditTable.jsx';


export default function User() {
    const [projects, setProjects] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [projectIdCounter, setProjectIdCounter] = useState(1);
    const [UpdateProject, setUpdateProject] = useState('')

    const addProject = (newProject) => {
        const projectWithUniqueId = {
            ...newProject,
            id: projectIdCounter,
        };
        setProjects([...projects, projectWithUniqueId]);
        setProjectIdCounter(projectIdCounter + 1);
        setShowModal(false);
    };
    
    function updateTask(updateProject) {
        setUpdateProject(updateProject);
        console.log(changedProject);
    }



    return (
        <div className='flex'>
            <SideBar />
            <div className='w-full h-screen'>
                <div className="flex justify-between items-center">
                    <h1 className='text-2xl font-bold m-8'>User</h1>
                    <button onClick={() => setShowModal(true)} className='text-white bg-green-600 mb-4 px-2 py-1 mr-5 rounded-md hover:bg-green-700'>
                        + Add
                    </button>
                </div>
                {showModal && <Input onAddProject={addProject} setShowModal={setShowModal} />}
                <Table tableData={projects} updatedData={UpdateProject} edit={<EditTable onupdate={updateTask} onsubmit={updateTask} />} />
            </div>
        </div>
    );
    
}
