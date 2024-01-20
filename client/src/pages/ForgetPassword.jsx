import React, { useState } from 'react';
import axios from 'axios';
import config from "../../config.json"

export default function ForgetPassword() {
    const [email, setEmail] = useState('');
    const URL = config.URL

    const handleForgetPassword = async (e) => {
        e.preventDefault();
        try {
            try {
                const userResponse = await axios.post(`${URL}/public/forgot-password`, { email });
                console.log(userResponse);
            } catch (error) {
                const adminResponse = await axios.post(`${URL}/public/forgot-password/`, { email });
                console.log(adminResponse);
            }
        } catch (error) {
            console.error(error);

        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-stone-400">
            <div className="w-3/4 sm:w-2/4 bg-stone-300 p-8 rounded-lg shadow-md">
                <form className="flex flex-col space-y-2" onSubmit={handleForgetPassword}>
                    <h1 className="text-2xl font-semibold mb-4">Forget Password</h1>
                    <label className="flex">
                        Email<p className="text-red-800">*</p>
                    </label>
                    <input
                        type="email"
                        className="p-2 border rounded"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <button type="submit" className="p-2 bg-green-500 text-white rounded hover:bg-green-600">
                        Forget Password
                    </button>
                </form>
            </div>
        </div>
    );
}