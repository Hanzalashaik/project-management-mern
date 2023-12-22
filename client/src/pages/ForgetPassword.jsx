import React, { useState } from 'react';

export default function ForgetPassword() {
    const [otp, setOtp] = useState('');
    const [showNewPassword, setShowNewPassword] = useState(false);

    function handleChange(e) {
        setOtp(e.target.value);
    }

    function handleClick() {
        setShowNewPassword(true);
    }

    return (
        <div className="flex justify-center items-center h-screen bg-stone-400">
            <div className="w-3/4 sm:w-2/4 bg-stone-300 p-8 rounded-lg shadow-md">
                <form className="flex flex-col space-y-2">
                    {showNewPassword ? (
                        <>

                            <h1 className="text-2xl font-semibold mb-4">Reset Password</h1>
                            <div className="flex flex-col space-y-2">
                                <label className='flex'>New Password<p className='text-red-800'>*</p></label>
                                <input
                                    type="password"
                                    className="p-2 border rounded"
                                    required
                                />
                            </div>
                            <div className="flex flex-col space-y-2">
                                <label className='flex'>Re-Type Password<p className='text-red-800'>*</p></label>
                                <input
                                    type="password"
                                    className="p-2 border rounded"
                                    required
                                />
                            </div>
                            <button onClick={handleClick} className="p-2 bg-green-500 text-white rounded hover:bg-green-600">
                                Reset Password
                            </button>
                        </>
                    ) : (
                        <>
                            <h1 className="text-2xl font-semibold mb-4">Forget Password</h1>
                            <label className='flex'>Email<p className='text-red-800'>*</p></label>
                            <input
                                type="email"
                                className="p-2 border rounded"
                                required
                            />
                            <label className='flex'>OTP<p className='text-red-800'>*</p></label>
                            <input
                                type="number"
                                className="p-2 border rounded"
                                required
                                value={otp}
                                onChange={(e) => handleChange(e)}

                            />
                            <button onClick={handleClick} className="p-2 bg-green-500 text-white rounded hover:bg-green-600">
                                Forget Password
                            </button>
                        </>
                    )}

                </form>
            </div>
        </div>
    );
}
