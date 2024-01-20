import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import config from "../../config.json"

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate()
    const URL = config.URL

    const handleResetPassword = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match');
            return;
        }

        try {
            try {
                const token = new URLSearchParams(window.location.search).get('token');
                console.log(token);

                const userResponse = await axios.post(`${URL}/public/reset-password?token=${token}`, {
                    password,
                });
                if (userResponse?.status === 200) {

                    console.log('UserPassword reset successful');

                    setTimeout(() => {
                        navigate("/login")
                    }, 1000)
                }

            } catch (error) {
                const token = new URLSearchParams(window.location.search).get('token');

                const adminResponse = await axios.post(`${URL}/public/reset-password?token=${token}`, {
                    password,
                });
                if (adminResponse?.status === 200) {

                    console.log('UserPassword reset successful');

                    setTimeout(() => {
                        navigate("/login")
                    }, 1000)
                }
            }

        } catch (error) {
            console.error('Error resetting password:', error);
            setErrorMessage('Failed to reset password. Please try again.');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-stone-400">
            <div className="w-3/4 sm:w-2/4 bg-stone-300 p-8 rounded-lg shadow-md">
                <form className="flex flex-col space-y-2" onSubmit={handleResetPassword}>
                    <h1 className="text-2xl font-semibold mb-4">Reset Password</h1>
                    {errorMessage && <p className="text-red-600">{errorMessage}</p>}
                    <div className="flex flex-col space-y-2">
                        <label className="flex">
                            New Password <p className="text-red-800">*</p>
                        </label>
                        <input
                            type="password"
                            className="p-2 border rounded"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="flex flex-col space-y-2">
                        <label className="flex">
                            Re-Type Password <p className="text-red-800">*</p>
                        </label>
                        <input
                            type="password"
                            className="p-2 border rounded"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="p-2 bg-green-500 text-white rounded hover:bg-green-600">
                        Reset Password
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
