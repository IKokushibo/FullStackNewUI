import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Sidebar from '../../Components/Sidebar';
import axios from "../../services/AxiosConfiguration";

import Information from '../../Components/Information_Modal/Infomation';

function DepartmentSection() {
  const [departments, setDepartments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDepartment, setCurrentDepartment] = useState({});
  const [departmentName, setDepartmentName] = useState("");
  const [shortForm, setShortForm] = useState("");
  const [code, setCode] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  const [message, setMessage] = useState("");
  const [isInformationModalOpen, setIsInformationModalOpen] = useState(false);

  const navigateAddType = () => {
    window.location.href = "/admin/add-department";
  };

  const openModal = (department) => {
    setCurrentDepartment(department);
    setDepartmentName(department.name);
    setShortForm(department['short-form']);
    setCode(department.code);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleEditSubmit = async () => {
    try {
      const url = `/users/admin/update-department/${currentDepartment.id}`;
      const response = await axios.put(url, {
        name: departmentName,
        'short-form': shortForm,
        code: code,
      });
      if (response.status === 200) {
        closeModal();
        setMessage(response.data);
        setIsInformationModalOpen(true);
        setIsMounted(value => !value);
      }
    } catch (error) {
      setMessage(response.data);
      setIsInformationModalOpen(true);
    }
  };

  const handleRemove = async (departmentId) => {
    try {
      const url = `/users/admin/delete-department/${departmentId}`;
      const response = await axios.delete(url);
      if (response.status === 200) {
        setIsMounted(value => !value);
        setMessage(response.data);
        setIsInformationModalOpen(true);
      }
    } catch (error) {
      setMessage(response.data);
      setIsInformationModalOpen(true);
    }
  };

  useEffect(() => {
    const getDepartments = async () => {
      try {
        const url = "/users/departments";
        const response = await axios.get(url);
        setDepartments(response.data);
      } catch (error) {
        setMessage(error.response.data.message);
        setIsInformationModalOpen(true);
      }
    };

    getDepartments();
  }, [isMounted]);

  return (
    <>
      <Helmet>
        <title>Department Section</title>
      </Helmet>

      <div className="flex h-full bg-pageBg1">
        <Sidebar />

        {/* Main Content */}
        <main className="w-4/5 p-10">
          <h1 className="text-3xl font-bold mb-8">Department Section</h1>

          <div className="bg-white p-8 shadow-lg rounded-md">
            <h2 className="text-2xl font-bold mb-6">Department Management</h2>
            <button onClick={navigateAddType} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md mb-6">
              Add New Department
            </button>

            <div className="overflow-x-auto">
              <table className="min-w-full bg-white text-center">
                <thead className="bg-blue-500 text-white">
                  <tr>
                    <th className="border px-4 py-2">#</th>
                    <th className="border px-4 py-2">Department</th>
                    <th className="border px-4 py-2">Shortform</th>
                    <th className="border px-4 py-2">Code</th>
                    <th className="border px-4 py-2">Created Date</th>
                    <th className="border px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(departments) && departments.map((element, index) => (
                    <tr key={index}>
                      <td className="border px-4 py-2">{index+1}</td>
                      <td className="border px-4 py-2">{element.name}</td>
                      <td className="border px-4 py-2">{element['short-form']}</td>
                      <td className="border px-4 py-2">{element.code}</td>
                      <td className="border px-4 py-2">{element['created-date']}</td>
                      <td className="border px-4 py-2">
                        <button
                          disabled={isInformationModalOpen}
                          onClick={() => openModal(element)}
                          className="bg-yellow-500 text-white font-bold py-1 px-3 rounded-md hover:bg-yellow-700 mx-1"
                        >
                          Edit
                        </button>
                        <button
                          disabled={isInformationModalOpen}
                          onClick={() => handleRemove(element.id)}
                          className="bg-red-500 text-white font-bold py-1 px-3 rounded-md hover:bg-red-700 mx-1"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {isInformationModalOpen && (
        <Information name="Ok" information={message} onClick={() => setIsInformationModalOpen(value => !value)} />
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Edit Department</h2>
            <div>
              <label className="block text-sm font-bold mb-2">Department Name</label>
              <input
                type="text"
                className="border w-full p-2 rounded mb-4"
                value={departmentName}
                onChange={(event) => setDepartmentName(event.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-2">Shortform</label>
              <input
                type="text"
                className="border w-full p-2 rounded mb-4"
                value={shortForm}
                onChange={(event) => setShortForm(event.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-2">Code</label>
              <input
                type="text"
                className="border w-full p-2 rounded mb-4"
                value={code}
                onChange={(event) => setCode(event.target.value)}
              />
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleEditSubmit}
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 mr-2"
              >
                Save
              </button>
              <button
                onClick={closeModal}
                className="bg-gray-500 text-white font-bold py-2 px-4 rounded-md hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DepartmentSection;
