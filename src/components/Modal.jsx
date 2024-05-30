import React from 'react';

const Modal = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <p className="mb-4">{message}</p>
        <div className="flex justify-center">
          <button
            className="bg-red-600 text-white px-4 py-2 rounded mr-2"
            onClick={onConfirm}
          >
            כן
          </button>
          <button
            className="bg-gray-600 text-white px-4 py-2 rounded"
            onClick={onCancel}
          >
            לא
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
