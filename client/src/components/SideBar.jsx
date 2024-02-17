import React from 'react';
import { Link } from 'react-router-dom';

export default function SideBar() {
    const data = JSON.parse(localStorage.getItem("data"));
    // console.log(data.role);

    function logout() {
        localStorage.clear();
        window.location.reload();
    }

    return (
        <div className={` flex flex-col justify-between items-center w-44 bg-gray-800 `}>
            <div className='flex flex-col items-center'>
                <div className='mt-12'>
                    <ul className='space-y-6'>
                        <li>
                            <Link
                                to='/profile'
                                className='text-gray-300 hover:text-white transition duration-300 ease-in-out'
                            >
                                Profile
                            </Link>
                        </li>
                        <li>
                            <Link
                                to='/'
                                className='text-gray-300 hover:text-white transition duration-300 ease-in-out'
                            >
                                Dashboard
                            </Link>
                        </li>
                        {data.role === "user" ? (
                            <li>
                                <Link
                                    to='/user'
                                    className='text-gray-300 hover:text-white transition duration-300 ease-in-out'
                                >
                                    User
                                </Link>
                            </li>
                        ) : (
                            <li>
                                <Link
                                    to='/admin'
                                    className='text-gray-300 hover:text-white transition duration-300 ease-in-out'
                                >
                                    Admin
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
            <button
                className='text-white bg-green-600 mb-6 px-2 py-1 rounded-md hover:bg-green-700'
                onClick={logout}
            >
                Logout
            </button>
        </div>
    );
}
