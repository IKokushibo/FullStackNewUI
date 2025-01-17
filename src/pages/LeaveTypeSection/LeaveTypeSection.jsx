import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Sidebar from '../../Components/Sidebar';
import axios from "../../services/AxiosConfiguration";
import { useNavigate } from 'react-router-dom'; // <-- Import useNavigate

import Information from '../../Components/Information_Modal/Infomation';

function LeaveTypeSection() {

  const [isInformationModalOpen, setIsInformationModalOpen] = useState(false);
  const [message, setMessage] = useState("");

  const [typeOfLeaves, setTypeOfLeaves] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentLeave, setCurrentLeave] = useState(null); // To store the leave type being edited
  const [formData, setFormData] = useState({
    id: '',
    leaveType: '',
    description: '',
    requirements: '',
    defaultDuration: ''
  });

  const [isMounted, setIsMounted] = useState(false);

  const navigate = useNavigate(); // <-- Initialize useNavigate hook

  // Fetch leave types from the API
  useEffect(() => {
    const getTypeOfLeave = async () => {
      try {
        const url = "/users/admin/type-of-leaves";
        const response = await axios.get(url);
        setTypeOfLeaves(response.data);
      } catch (error) {
        setMessage(error.response.data.message);
        setIsInformationModalOpen(true);
      }
    };

    getTypeOfLeave();
  }, [isMounted]);

  // Open the edit modal with pre-filled data
  const handleEdit = (leave) => {
    setCurrentLeave(leave);
    setFormData({
      id: leave.id,
      leaveType: leave['leave-type'],
      description: leave.description,
      requirements: leave.requirements,
      defaultDuration: leave['default-duration']
    });
    setIsModalOpen(true);
  };

  // Remove leave type
  const handleRemove = async (id) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to remove this leave type?");
      if (confirmDelete) {
        const url = `/users/admin/type-of-leaves/delete-type-of-leave/${id}`;
        const response = await axios.delete(url);
        if (response.status === 200) {
          setTimeout(() => {
            setIsMounted(value => !value);
          }, 3000);
          setMessage(response.data);
          setIsInformationModalOpen(true);
        }
      }
    } catch (error) {
      setMessage(error.response.data.message);
      setIsInformationModalOpen(true);
    }
  };

  // Save updated leave type
  const handleSave = async () => {
    try {
      const url = `/users/admin/type-of-leaves/update-type-of-leave/${formData.id}`;
      const response = await axios.put(url, {
        'leave-type': formData.leaveType,
        description: formData.description,
        requirements: formData.requirements,
        'default-duration': formData.defaultDuration
      });

      if (response.status === 200) {
        setMessage(response.data);
        setIsInformationModalOpen(true);
        setIsModalOpen(false); // Close modal after successful update
        setIsMounted(value => !value);
      }
    } catch (error) {
      setMessage(error.response.data.message);
      setIsInformationModalOpen(true);
    }
  };

  return (
    <>
      <Helmet>
        <title>Leave Types Section</title>
      </Helmet>

      <div className="flex h-full bg-pageBg1">
        <Sidebar />

        {/* Main Content */}
        <main className="w-4/5 p-10">
          <h1 className="text-3xl font-bold mb-8">Leave Types Section</h1>

          <div className="bg-white p-8 shadow-lg rounded-md">
            <h2 className="text-2xl font-bold mb-6">Leave Types</h2>

            {/* Updated this button to use navigate */}
            <button onClick={() => navigate("/admin/add-leave-type")} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md mb-6">
              Add New Leave Type
            </button>

            <table className="table-auto w-full text-left border-collapse">
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="p-4">#</th>
                  <th className="p-4">Leave Type</th>
                  <th className="p-4">Description</th>
                  <th className="p-4">Requirements</th>
                  <th className="p-4">Leave Credit Available</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(typeOfLeaves) && typeOfLeaves.map((leave, index) => (
                  <tr key={leave.id} className="border-b">
                    <td className="p-4">{index+1}</td>
                    <td className="p-4">{leave['leave-type']}</td>
                    <td className="p-4">{leave.description}</td>
                    <td className="p-4">{leave.requirements}</td>
                    <td className="p-4">{leave['default-duration']}</td>
                    <td className="p-4">
                      <button
                        onClick={() => handleEdit(leave)}
                        className="bg-yellow-400 hover:bg-yellow-600 text-white font-bold py-1 px-3 rounded mr-2"
                      >
                        Edit
                      </button>
                      <button
                        disabled={isInformationModalOpen}
                        onClick={() => handleRemove(leave.id)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>

      {isInformationModalOpen && (
        <Information name="Ok" information={message} onClick={() => setIsInformationModalOpen(value => !value)}/>
      )}

      {/* Modal for Editing Leave */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Edit Leave Type</h2>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Leave Type</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={formData.leaveType}
                onChange={(e) => setFormData({ ...formData, leaveType: e.target.value })}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Requirements</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={formData.requirements}
                onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Leave Credit Available</label>
              <input
                type="number"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={formData.defaultDuration}
                onChange={(e) => setFormData({ ...formData, defaultDuration: e.target.value })}
              />
            </div>

            <div className="flex justify-end">
              <button onClick={() => setIsModalOpen(false)} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2">
                Cancel
              </button>
              <button onClick={handleSave} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default LeaveTypeSection;
