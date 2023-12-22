import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { MdOutlinePendingActions } from 'react-icons/md';
import { FaRegCircleDot } from 'react-icons/fa6';
import { FcCancel } from 'react-icons/fc';

export default function StatusBar() {
  return (
    <>
      <h1 className='mx-9 my-1 text-2xl italic'>Status</h1>
      <div className='h-40 bg-stone-600 rounded-3xl mx-5 flex justify-around items-center p-5'>
        <div className='flex flex-col items-center'>
          <FaCheckCircle className='text-4xl text-green-700 mb-2' />
          <h1 className='text-blue-100 text-lg font-semibold'>344 Completed</h1>
        </div>

        <div className='flex flex-col items-center'>
          <FaRegCircleDot className='text-4xl text-blue-700 mb-2' />
          <h1 className='text-blue-100 text-lg font-semibold'>20 In progress</h1>
        </div>

        <div className='flex flex-col items-center'>
          <FcCancel className='text-4xl text-red-700 mb-2' />
          <h1 className='text-blue-100 text-lg font-semibold'>2 Cancelled</h1>
        </div>

        <div className='flex flex-col items-center'>
          <MdOutlinePendingActions className='text-4xl text-yellow-700 mb-2' />
          <h1 className='text-blue-100 text-lg font-semibold'>28 Pending</h1>
        </div>

        <div className='flex flex-col items-center'>
          <FaRegCircleDot className='text-4xl text-red-700 mb-2' />
          <h1 className='text-blue-100 text-lg font-semibold'>10 Not Started</h1>
        </div>
      </div>
    </>
  );
}
