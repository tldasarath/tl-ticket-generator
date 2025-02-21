// import React, { useState } from 'react';

// const UserDetailsForm = ({ phoneNumber, onSubmitSuccess }) => {
//   const [formData, setFormData] = useState({
//     name: '',
//     sex: '',
//     age: '',
//     seatCategory: ''
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prevData => ({
//       ...prevData,
//       [name]: value
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Add phone number to form data
//     const completeFormData = {
//       ...formData,
//       phoneNumber
//     };
//     onSubmitSuccess(completeFormData);
//   };

//   return (
//     <div className="flex justify-center items-center h-full w-full bg-gray-500 mt-2 bg-opacity-40 p-4">
//       <div className="w-full    ">
//         <h2 className="text-xl font-bold text-gray-800 mb-1 text-start">User Details</h2>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
//               Name
//             </label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               required
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
//               placeholder="Enter your name"
//             />
//           </div>
//           <div className='flex justify-between gap-4'>
//             <div className="w-[45%]">
//               <label htmlFor="sex" className="block text-sm font-medium text-gray-700 mb-1">
//                 Sex
//               </label>
//               <select
//                 id="sex"
//                 name="sex"
//                 value={formData.sex}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
//               >
//                 <option value="">Select gender</option>
//                 <option value="male">Male</option>
//                 <option value="female">Female</option>
//                 <option value="other">Other</option>
//               </select>
//             </div>

//             <div className="w-[45%]">
//               <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
//                 Age
//               </label>
//               <input
//                 type="number"
//                 id="age"
//                 name="age"
//                 value={formData.age}
//                 onChange={handleChange}
//                 required
//                 min="0"
//                 max="120"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
//                 placeholder="Enter your age"
//               />
//             </div>
//           </div>
//           <div>
//             <label htmlFor="seatCategory" className="block text-sm font-medium text-gray-700 mb-1">
//               Seat Category
//             </label>
//             <select
//               id="seatCategory"
//               name="seatCategory"
//               value={formData.seatCategory}
//               onChange={handleChange}
//               required
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
//             >
//               <option value="">Select seat category</option>
//               <option value="general">General</option>
//               <option value="premium">Premium</option>
//               <option value="vip">VIP</option>
//             </select>
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
//           >
//             Generate Ticket
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default UserDetailsForm;

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, MapPin, Calendar, Users, Crown } from 'lucide-react';

// interface UserDetailsFormProps {
//   phoneNumber: string;
//   onSubmitSuccess: (formData: any) => void;
// }

const UserDetailsForm = ({ phoneNumber, onSubmitSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    sex: '',
    age: '',
    location: '',
    preferredDate: '',
    seatCategory: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitSuccess(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Full Name :
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              name="name"
              id="name"
              required
              className="block w-full pl-10 px-4 py-3 text-black rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="sex" className="block text-sm font-medium text-gray-700 mb-1">
              Sex :
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Users className="h-5 w-5 text-gray-400" />
              </div>
              <select
                id="sex"
                name="sex"
                value={formData.sex}
                onChange={handleChange}
                required
                className="block w-full pl-10 px-4 py-3 rounded-lg text-black border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none bg-white"
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
              Age :
            </label>
            <div className="relative">
              <div className="absolute inset-y-0  left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
                min="0"
                max="120"
                className="block w-full pl-10 px-4 py-3  text-black rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter age"
              />
            </div>
          </div>
        </div>

        {/* <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPin className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              name="location"
              id="location"
              required
              className="block w-full pl-10 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Enter your location"
              value={formData.location}
              onChange={handleChange}
            />
          </div>
        </div> */}

        <div>
          <label htmlFor="seatCategory" className="block text-sm font-medium text-gray-700 mb-1">
            Seat Category
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Crown className="h-5 w-5 text-gray-400" />
            </div>
            <select
              id="seatCategory"
              name="seatCategory"
              value={formData.seatCategory}
              onChange={handleChange}
              required
              className="block w-full pl-10 px-4 py-3 rounded-lg border text-black border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none bg-white"
            >
              <option value="">Select seat category</option>
              <option value="general">General</option>
              <option value="premium">Premium</option>
              <option value="vip">VIP</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="preferredDate" className="block text-sm font-medium text-gray-700 mb-1">
            Preferred Visit Date
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Calendar className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="date"
              name="preferredDate"
              id="preferredDate"
              required
              className="block w-full pl-10 text-black px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={formData.preferredDate}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-lg shadow-sm text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
      >
        Complete Registration
      </button>
    </motion.form>
  );
};

export default UserDetailsForm;