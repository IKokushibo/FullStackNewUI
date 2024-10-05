import React from 'react';
import { Helmet } from 'react-helmet';
import Sidebar from '../../Components/Sidebar';
import { useState } from 'react';
import { useEffect } from 'react';

import Loading from '../../Components/LoadingAnimation/Loading';
import { backToLoginAdmin } from '../../services/UserUtils';

import axios from "../../services/AxiosConfiguration"
import { useNavigate } from 'react-router-dom';

function DeclinedLeaves() {

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState();

  const [leaves, setLeaves] = useState([]);

  const navigate = useNavigate();

  const handlerLeaveDetails = async(leaveId) => {
    navigate(`/admin/leave-details/${leaveId}`);
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const url = "/users/all-leaves/DECLINED";
        const response = await axios.get(url);
        setLeaves(response.data);
      } catch (error) {
        setError(error);
        setIsError(true);
      }
      setIsLoading(false);
    }

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <>
        <Loading />
      </>
    )
  }

  if (isError) {

    const status = error.status;
    if (status === 401) {
      backToLoginAdmin();
      return;
    }
  }

  return (
    <>
      <Helmet>
        <title>Manage Leave - Declined</title>
      </Helmet>

      <div className="flex h-full bg-pageBg1">
        <Sidebar />

        {/* Main Content */}
        <main className="w-4/5 p-10">
          <h1 className="text-3xl font-bold mb-8">Declined Leaves</h1>

          <div className="bg-white p-8 shadow-lg rounded-md">
            <table className="min-w-full table-auto">
              <thead>
                <tr>
                  <th className="px-4 py-2">#</th>
                  <th className="px-4 py-2">Employee ID</th>
                  <th className="px-4 py-2">Full Name</th>
                  <th className="px-4 py-2">Leave Type</th>
                  <th className="px-4 py-2">Applied On</th>
                  <th className="px-4 py-2">Current Status</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(leaves) && leaves.map((element, index) => (
                  <tr key={index} className="text-center h-14">
                    <td className="border px-4 py-2">{index+1}</td>
                    <td className="border px-4 py-2">{element.user['employee-id']}</td>
                    <td className="border px-4 py-2 text-blue-500 hover:underline cursor-pointer">{element.user['first-name'] + " " + element.user['last-name']}</td>
                    <td className="border px-4 py-2">{element['type-of-leave']}</td>
                    <td className="border px-4 py-2">{element['date-of-filing']}</td>
                    <td className="border px-4 py-2 text-red-500">{element['leave-status']}</td>
                    <td className="border px-4 py-2">
                      <button onClick={() => handlerLeaveDetails(element.id)} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </>
  );
}

export default DeclinedLeaves;
