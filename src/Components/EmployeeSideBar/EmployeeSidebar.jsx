import React, { useState } from 'react';
import DB from './db.svg';
import Apply from './UserWhite.svg';
import Credit from './User_Card_ID.svg';
import History from './File_Blank.svg';
import Lock from "../lock.svg";
import Logout from "./logout.svg";
import { useNavigate } from 'react-router-dom';
import axios from '../../services/AxiosConfiguration';

function Sidebar1() {
  const navigate = useNavigate();

  const navigateDashboard = () => {
    window.location.href = '/employee/landing-page';
  };

  const navigateApplyLeave = () => {
    window.location.href = '/employee/apply-leave';
  };

  const navigateHistory = () => {
    window.location.href = '/employee/leave-history';
  };

  const navigateCredits = () => {
    window.location.href = '/employee/leave-credits';
  };

  const navigateLandingPage = () => {
    window.location.href = '/employee/landing-page';
  };

  const navigateChangePassword = () => {
    window.location.href = '/account/change-password';
  };

  const logoutHandler = async () => {
    try {
      const url = '/users/auth/logout';
      const response = await axios.post(url);
      if (response.status === 200) {
        localStorage.removeItem('accessToken');
        navigate('/login-user');
      }
      console.log(response);
    } catch (error) {
      console.log(error);
      setError(error);
      setIsError(true);
    }
  };

  return (
    <>
      {/* Sidebar */}
      <div className="w-25% max-w-337.25px min-h-screen h-full bg-blue-500 text-white p-8 flex flex-col">
    
        <h1 onClick={navigateLandingPage} className="text-4xl font-bold mb-20 text-center">
          CKWD Leave Management System
        </h1>

        <nav className="flex-grow">
          <ul>
            <li className="ml-2 mb-5">
              <button onClick={navigateDashboard} className="flex items-center space-x-2 hover:bg-blue-700 p-2 rounded-md w-full">
                <img src={DB} alt="" />
                <span className="text-xl ml-1">Dashboard</span>
              </button>
            </li>
            <li className="mb-5">
              <button onClick={navigateApplyLeave} className="flex items-center space-x-2 hover:bg-blue-700 p-2 rounded-md w-full">
                <img src={Apply} alt="" />
                <span className="text-xl">Apply Leave</span>
              </button>
            </li>
            <li className="mb-5">
              <button onClick={navigateHistory} className="flex items-center space-x-2 hover:bg-blue-700 p-2 rounded-md w-full">
                <img src={History} alt="" />
                <span className="text-xl">Leave History</span>
              </button>
            </li>
            <li className="mb-5">
              <button onClick={navigateCredits} className="flex items-center space-x-2 hover:bg-blue-700 p-2 rounded-md w-full">
                <img src={Credit} alt="" />
                <span className="text-xl">Leave Credits Remaining</span>
              </button>
            </li>

            <li className="mb-5">
              <button onClick={navigateChangePassword} className="flex items-center space-x-2 hover:bg-blue-700 p-2 rounded-md w-full">
                <img src={Lock} className="size-7" alt="" />
                <span className="text-xl">Change Password</span>
              </button>
            </li>
            <li className="mb-5">
              <button onClick={logoutHandler} className="flex items-center space-x-2 hover:bg-blue-700 p-2 rounded-md w-full">
                <img src={Logout} className="size-7" alt="" />
                <span className="text-xl">Logout</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default Sidebar1;
