import React, { useState } from 'react';

const UserDetailsForm = ({ phoneNumber, onSubmitSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    sex: '',
    age: '',
    seatCategory: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add phone number to form data
    const completeFormData = {
      ...formData,
      phoneNumber
    };
    onSubmitSuccess(completeFormData);
  };

  return (
    <div className="flex justify-center items-center h-full w-full bg-gray-500 mt-2 bg-opacity-40 p-4">
      <div className="w-full    ">
        <h2 className="text-xl font-bold text-gray-800 mb-1 text-start">User Details</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              placeholder="Enter your name"
            />
          </div>
<div className='flex justify-between gap-4'>
          <div className="w-[45%]">
            <label htmlFor="sex" className="block text-sm font-medium text-gray-700 mb-1">
              Sex
            </label>
            <select
              id="sex"
              name="sex"
              value={formData.sex}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="w-[45%]">
            <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
              Age
            </label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
              min="0"
              max="120"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              placeholder="Enter your age"
            />
          </div>
          </div>
          <div>
            <label htmlFor="seatCategory" className="block text-sm font-medium text-gray-700 mb-1">
              Seat Category
            </label>
            <select
              id="seatCategory"
              name="seatCategory"
              value={formData.seatCategory}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            >
              <option value="">Select seat category</option>
              <option value="general">General</option>
              <option value="premium">Premium</option>
              <option value="vip">VIP</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Generate Ticket
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserDetailsForm;