import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function SideBar() {
    const data = JSON.parse(localStorage.getItem("data"));
    const navigate = useNavigate();

    function logout() {
        localStorage.clear();
        // Navigate to the login page after clearing local storage
        navigate('/login');
        setTimeout(()=>{
            window.location.reload()
        },2000)
    }

    return (
        <div className={` flex flex-col justify-between items-center sm:w-44  bg-gray-800 `}>
            <div className='flex flex-col items-center w-20'>
                <div className='mt-12'>
                    <ul className='space-y-6'>
                        <li>
                            <Link
                                to='/profile'
                                className='text-gray-300 text-sm hover:text-white transition duration-300 ease-in-out'
                            >
                                Profile
                            </Link>
                        </li>
                        <li>
                            <Link
                                to='/'
                                className='text-gray-300 text-sm  hover:text-white transition duration-300 ease-in-out'
                            >
                                Dashboard
                            </Link>
                        </li>
                        {data.role === "user" ? (
                            <li>
                                <Link
                                    to='/user'
                                    className='text-gray-300 text-sm hover:text-white transition duration-300 ease-in-out'
                                >
                                    User
                                </Link>
                            </li>
                        ) : (
                            <li>
                                <Link
                                    to='/admin'
                                    className='text-gray-300 text-sm hover:text-white transition duration-300 ease-in-out'
                                >
                                    Admin
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
            <button
                className='text-white bg-green-600 mb-6 px-2 py-1  rounded-md hover:bg-green-700'
                onClick={logout}
            >
                Logout
            </button>
        </div>
    );
}
