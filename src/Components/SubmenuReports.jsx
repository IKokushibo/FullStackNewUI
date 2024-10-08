import React, { useState } from 'react';

function Submenu() {
  const navigatePending = () => {
    window.location.href = '/admin/pending-leave-type';
  }
  const navigateApproved = () => {
    window.location.href = '/admin/approved-leave-type';
  }
  const navigateDeclined = () => {
    window.location.href = '/admin/declined-leave-type';
  }
  const navigateLeaveHistory = () => {
    window.location.href = '/admin/leave-history';
  }
  return (
    <>
      <div className='flex flex-col w-buttonss left-10 gap-1'>
        <button onClick={navigatePending} className='w-full pl-2 rounded-md text-xl h-12 hover:bg-blue-700 text-left'>Employee Leave History</button>
        <button onClick={navigateApproved} className='w-full pl-2 rounded-md text-xl h-12 hover:bg-blue-700 text-left' >Leave History</button>
      </div>
    </>
  )
}
export default Submenu;
