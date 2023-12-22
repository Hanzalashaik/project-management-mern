import React, { useEffect, useState } from 'react'
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

// const tableData = [
//     {
//         id: 1,
//         projectName: 'Project 1',
//         description: 'Description of Project 1',
//         status: 'Active',
//         createdBy: 'Hanzala',
//         assignedTo: 'mizan',
//         startDate: '2023-01-01',
//         endDate: '2023-02-01',
//     }

// ];
export default function Table({ tableData }) {

    const [data,setData] = useState([]);
    useEffect(()=>{
        setData(tableData)
    },[tableData])
    console.log(data);
    
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
                        <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Edit</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {data.map((row) => (
                        <tr key={row.id}>
                            <td className="px-2 py-4 whitespace-nowrap">{row.id}</td>
                            <td className="px-2 py-4 whitespace-nowrap">{row.projectName}</td>
                            <td className="px-2 py-4 whitespace-nowrap">{row.description}</td>
                            <td className="px-2 py-4 whitespace-nowrap">{row.status}</td>
                            <td className="px-2 py-4 whitespace-nowrap">{row.createdBy}</td>
                            <td className="px-2 py-4 whitespace-nowrap">{row.assignedTo}</td>
                            <td className="px-2 py-4 whitespace-nowrap">{row.startDate}</td>
                            <td className="px-2 py-4 whitespace-nowrap">{row.endDate}</td>
                            <td className="px-2 py-4 whitespace-nowrap flex gap-2">
                            <FaRegEdit className='text-orange-500 cursor-pointer'  />
                            <MdDelete className='text-red-700 cursor-pointer' />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </>
    )
}
