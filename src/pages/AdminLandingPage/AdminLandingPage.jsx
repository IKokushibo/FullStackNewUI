import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import SideBard from '../../Components/Sidebar'
import { useNavigate } from 'react-router-dom';

import axios from "../../services/AxiosConfiguration"

// utils
import { isAdminValidForAccessing } from '../../services/UserUtils';

// components
import Loading from '../../Components/LoadingAnimation/Loading';
import Information from '../../Components/Information_Modal/Infomation';

function Dashboard() {
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [registeredEmployees, setRegisteredEmployees] = useState([]);
  const [availableDepartments, setAvailableDepartments] = useState([]);
  const [leaveApplications, setLeaveApplications] = useState([]);

  const [message, setMessage] = useState("");
  const [isInformationModalOpen, setIsInformationModalOpen] = useState(false);

  // user
  const [isLoading, setIsLoading] = useState(false);

  const [user, setUser] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();
    const getAdmin = async () => {
      setIsLoading(true);

      try {
        const url = "/users/me";
        const response = await axios.get(url);
        if (response.status === 200) {
          if (!isAdminValidForAccessing(response.data.role)) {
            navigate("/login-user");
            return;
          }
        }
        setUser(response.data);
      } catch (error) {
        if(error.code === "ERR_NETWORK"){
          setMessage(error.message);
        }else{
          setMessage(error.response.data.message);
        }
        setIsInformationModalOpen(true);
      }
      setIsLoading(false);
    }
    
    getAdmin();
    
    return () => {
      controller.abort();
    }
  }, []);
  
  useEffect(() => {
    const controller = new AbortController();
    const getLeaves = async () => {
      const url = "/users/admin/type-of-leaves";
      const response = await axios.get(url);
      setLeaveTypes(response.data);
      return () => {
        controller.abort();
      }
    }
    
    getLeaves();
  }, []);
  
  useEffect(() => {
    const controller = new AbortController();
    const getEmployees = async () => {
      const url = "/users/admin/all-employees";
      const response = await axios.get(url);
      setRegisteredEmployees(response.data);
      return () => {
        controller.abort();
      }
    }
    
    getEmployees();
  }, []);
  
  useEffect(() => {
    const controller = new AbortController();
    const getDepartments = async () => {
      const url = "/users/departments";
      const response = await axios.get(url);
      setAvailableDepartments(response.data);
    }
    getDepartments();
    
    return () => {
      controller.abort();
    }
  }, []);
  
  useEffect(() => {
    const controller = new AbortController();
    const getLeaveApplications = async () => {
      const url = "/users/all-leaves";
      const response = await axios.get(url);
      setLeaveApplications(response.data);
    }
    getLeaveApplications();
    return () => {
      controller.abort();
    }
  }, []);
  
  const pendingLeaveLength = leaveApplications ? leaveApplications.filter((leave) => leave['leave-status'] === "PENDING").length : 0;
  const approvedLeaveLength = leaveApplications ? leaveApplications.filter((leave) => leave['leave-status'] === "APPROVED").length : 0;
  const disapprovedLeaveLength = leaveApplications ? leaveApplications.filter((leave) => leave['leave-status'] === "DECLINED").length : 0;
  
  if (isLoading) {
    return (
      <>
        <Loading />
      </>
    )
  }

  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>

      <div className="flex h-full ring-1">
        <SideBard />

        {/* Main Content */}
        <main className="w-4/5 p-10">
          <div className='flex justify-between'>
            <h1 className="text-3xl font-bold mb-8">Welcome, {user['first-name']}!</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-blue-400 text-white p-8 rounded-lg shadow-lg flex items-center justify-center">
              <div className="text-center">
                <h2 className="text-5xl font-bold">{leaveTypes.length}</h2>
                <p className="mt-2 text-lg">Leave Types</p>
              </div>
            </div>
            <div className="bg-blue-400 text-white p-8 rounded-lg shadow-lg flex items-center justify-center">
              <div className="text-center">
                <h2 className="text-5xl font-bold">{registeredEmployees.length}</h2>
                <p className="mt-2 text-lg">Registered Employees</p>
              </div>
            </div>
            <div className="bg-blue-400 text-white p-8 rounded-lg shadow-lg flex items-center justify-center">
              <div className="text-center">
                <h2 className="text-5xl font-bold">{availableDepartments.length}</h2>
                <p className="mt-2 text-lg">Available Departments</p>
              </div>
            </div>
            <div className="bg-blue-400 text-white p-8 rounded-lg shadow-lg flex items-center justify-center">
              <div className="text-center">
                <h2 className="text-5xl font-bold">{pendingLeaveLength}</h2>
                <p className="mt-2 text-lg">Pending Applications</p>
              </div>
            </div>
            <div className="bg-blue-400 text-white p-8 rounded-lg shadow-lg flex items-center justify-center">
              <div className="text-center">
                <h2 className="text-5xl font-bold">{disapprovedLeaveLength}</h2>
                <p className="mt-2 text-lg">Declined Applications</p>
              </div>
            </div>
            <div className="bg-blue-400 text-white p-8 rounded-lg shadow-lg flex items-center justify-center">
              <div className="text-center">
                <h2 className="text-5xl font-bold">{approvedLeaveLength}</h2>
                <p className="mt-2 text-lg">Approved Applications</p>
              </div>
            </div>
          </div>
        </main>

        {isInformationModalOpen && (
          <Information name="Ok" information={message} onClick={() => setIsInformationModalOpen(value => !value)}/>
        )}
      </div>
    </>
  );

}

export default Dashboard;
