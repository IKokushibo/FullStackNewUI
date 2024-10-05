import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import SideBard from '../../Components/Sidebar'; // Adjust the import path as needed

function EmployeeDetails() {
  const [profileImage, setProfileImage] = useState(null); // State for storing uploaded profile image
  const [searchTerm, setSearchTerm] = useState(''); // State for search input

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const leaveApplications = [
    {
      name: 'Juan Dela Cruz',
      employeeId: 'CZL - 001',
      role: 'Employee',
      department: 'Department 1',
      position: 'General Services',
      typeOfLeave: 'Sick Leave',
      startDate: '01/01/2024',
      endDate: '01/05/2024',
      status: 'Pending',
    },
    {
      name: 'Juan Dela Cruz',
      employeeId: 'CZL - 001',
      role: 'Employee',
      department: 'Department 1',
      position: 'General Services',
      typeOfLeave: 'Mandatory Leave',
      startDate: '01/09/2024',
      endDate: '01/15/2024',
      status: 'Pending',
    },
    {
      name: 'Juan Dela Cruz',
      employeeId: 'CZL - 001',
      role: 'Employee',
      department: 'Department 1',
      position: 'General Services',
      typeOfLeave: 'Sick Leave',
      startDate: '01/11/2024',
      endDate: '01/15/2024',
      status: 'Pending',
    },
  ];

  const filteredApplications = leaveApplications.filter((application) =>
    Object.values(application).some((value) =>
      value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Function to handle printing only the leave applications table (excluding search and button)
  const handlePrint = () => {
    const printContent = document.getElementById('leave-applications-table');
    const newWindow = window.open('', '', 'width=800,height=600');
    newWindow.document.write('<html><head><title>Print</title></head><body>');
    newWindow.document.write(printContent.innerHTML);
    newWindow.document.write('</body></html>');
    newWindow.document.close();
    newWindow.focus();
    newWindow.print();
    newWindow.close();
  };

  return (
    <>
      <Helmet>
        <title>Employee Details</title>
      </Helmet>

      <div className="flex h-full">
        <SideBard />

        {/* Main Content */}
        <main className="w-4/5 p-8">
          <h1 className="text-3xl font-bold mb-8">Employee Details</h1>

          {/* Employee Information */}
          <div className="bg-gray-100 p-8 rounded-lg shadow-md mb-8 flex flex-col items-center">
            <div className="flex items-center w-full">
              {/* Profile Image Upload Section */}
              <label htmlFor="upload" className="relative cursor-pointer">
                <input
                  id="upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <div className="relative">
                  {/* Display uploaded image or default placeholder */}
                  <img
                    src={profileImage || '/default-profile.png'}
                    alt="Employee Profile"
                    className="w-40 h-40 rounded-full object-cover border-4 border-gray-400"
                  />
                  {/* Overlay with a click-to-upload prompt */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-25 text-white opacity-0 hover:opacity-100 transition-opacity duration-200">
                    <p className="text-sm">Click to upload</p>
                  </div>
                </div>
              </label>

              {/* Employee Info */}
              <div className="ml-12">
                <h2 className="text-3xl font-semibold">Juan Dela Cruz</h2> {/* Increased font size */}
                <p className="text-xl">
                  <span className="font-bold">Employee ID:</span> CZL - 001
                </p>
                <p className="text-xl">
                  <span className="font-bold">Email:</span> juandelacruz@gmail.com
                </p>
                <p className="text-xl">
                  <span className="font-bold">Department:</span> Department 1
                </p>
                <p className="text-xl">
                  <span className="font-bold">Position:</span> General Services
                </p>
                <p className="text-xl">
                  <span className="font-bold">Role:</span> Employee
                </p>
              </div>
            </div>
          </div>

          {/* Type of Leave and Credits Remaining */}
          <div className="bg-white p-4 rounded-lg shadow-md mb-8">
            <table className="w-full table-auto border text-left">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2">Type of Leave</th>
                  <th className="px-4 py-2">Credits Remaining</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="px-4 py-2">Sick Leave</td>
                  <td className="px-4 py-2">5</td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-2">Vacation Leave</td>
                  <td className="px-4 py-2">10</td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-2">Mandatory Leave</td>
                  <td className="px-4 py-2">10</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Leave Applications */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">Leave Applications</h3>
            
            {/* Search Input (Excluded from print) */}
            <input
              type="text"
              placeholder="Search leave applications"
              className="mb-4 px-4 py-2 border rounded w-full print-ignore"
              value={searchTerm}
              onChange={handleSearch}
            />
            
            {/* Leave Applications Table */}
            <div id="leave-applications-table">
              <table className="w-full table-auto border text-left">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Employee ID</th>
                    <th className="px-4 py-2">Role</th>
                    <th className="px-4 py-2">Department</th>
                    <th className="px-4 py-2">Position</th>
                    <th className="px-4 py-2">Type of Leave</th> {/* New Column */}
                    <th className="px-4 py-2">Start Date</th>
                    <th className="px-4 py-2">End Date</th>
                    <th className="px-4 py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredApplications.map((application, index) => (
                    <tr key={index} className="border-t">
                      <td className="px-4 py-2">{application.name}</td>
                      <td className="px-4 py-2">{application.employeeId}</td>
                      <td className="px-4 py-2">{application.role}</td>
                      <td className="px-4 py-2">{application.department}</td>
                      <td className="px-4 py-2">{application.position}</td>
                      <td className="px-4 py-2">{application.typeOfLeave}</td> {/* New Data */}
                      <td className="px-4 py-2">{application.startDate}</td>
                      <td className="px-4 py-2">{application.endDate}</td>
                      <td className="px-4 py-2">{application.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Print Button (Excluded from print) */}
            <div className="mt-8 text-right print-ignore">
              <button
                className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={handlePrint}
              >
                Print
              </button>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default EmployeeDetails;
