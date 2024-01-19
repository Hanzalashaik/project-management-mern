import React from 'react';

export default function DeleteModal({ setDeleteModal, deleteFunction }) {
  return (
    <>
      <div className="flex justify-center items-center">
        <div className="flex justify-center items-center font-bold gap-5">
          <p>Are you sure?</p>
          <div className='flex gap-3'>
            <button className="px-6 font-semibold bg-green-500 rounded hover:scale-105" onClick={() => setDeleteModal(false)}>
              No
            </button>
            <button className="px-6  font-semibold bg-red-600 rounded hover:scale-105" onClick={() => { deleteFunction(); setDeleteModal(false); }}>
              Yes
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
