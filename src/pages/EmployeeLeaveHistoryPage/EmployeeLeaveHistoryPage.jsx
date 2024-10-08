import React, { useEffect, useState } from 'react';
import Sidebar from '../../Components/Sidebar';
import { Helmet } from 'react-helmet';
import Loading from '../../Components/LoadingAnimation/Loading';

const LeaveHistoryReports = () => {
  const mockLeaves = [
    {
      'name': 'Christian James Torres',
      'employee-id': 'EMP001',
      'role': 'Developer',
      'department': 'IT',
      'position': 'Software Engineer',
      'type-of-leave': 'Sick Leave',
      'start-at': '2024-09-01',
      'end-at': '2024-09-03',
      'date-of-filing': '2024-08-25',
      'leave-status': 'Approved'
    },
    {
      'name': 'Michael Angelo Zara',
      'employee-id': 'EMP002',
      'role': 'Manager',
      'department': 'HR',
      'position': 'HR Manager',
      'type-of-leave': 'Vacation Leave',
      'start-at': '2024-09-10',
      'end-at': '2024-09-15',
      'date-of-filing': '2024-09-05',
      'leave-status': 'Pending'
    }
  ];

  const [leaves, setLeaves] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filteredLeaves, setFilteredLeaves] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Simulate data fetching with a delay for mock data
    setTimeout(() => {
      setLeaves(mockLeaves);
      setFilteredLeaves(mockLeaves); // Initialize filteredLeaves with all data
      setIsLoading(false);
    }, 1000); // Simulates loading time
  }, []);

  const handleDepartmentChange = (e) => {
    const department = e.target.value;
    setSelectedDepartment(department);
    filterLeaves(department, searchQuery);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    filterLeaves(selectedDepartment, query);
  };

  const filterLeaves = (department, query) => {
    let filtered = leaves;

    if (department !== "All") {
      filtered = filtered.filter(leave => leave.department === department);
    }

    if (query) {
      filtered = filtered.filter(leave => leave.name.toLowerCase().includes(query.toLowerCase()));
    }

    setFilteredLeaves(filtered);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Helmet>
        <title>Leave History</title>
      </Helmet>

      <div className="flex h-screen min-h-screen bg-pageBg1">
        <Sidebar />

        {/* Main Content */}
        <div className="w-full p-10 overflow-auto">
          <h1 className="text-3xl font-bold mb-6">Employee Leave History</h1>
          
          {/* Filter and Search Section */}
          <div className="flex justify-between mb-6">
            <div className="flex-grow"></div>

            {/* Department Filter */}
            <div className="mr-4">
              <label htmlFor="department-filter" className="mr-2">Filter by Department: </label>
              <select 
                id="department-filter" 
                value={selectedDepartment} 
                onChange={handleDepartmentChange}
                className="p-2 border border-gray-300 rounded"
              >
                <option value="All">All</option>
                <option value="IT">IT</option>
                <option value="HR">HR</option>
              </select>
            </div>

            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search by employee name..."
              className="p-2 border border-gray-300 rounded w-1/4"
            />
          </div>

          <div className="bg-gray-100 p-5 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Employee Leave History Table</h2>
            <table className="min-w-full bg-white border border-gray-300">
              <thead className="bg-gray-200">
                <tr className='bg-blue-500 text-white'>
                  <th className="text-left py-2 px-4">#</th>
                  <th className="text-left py-2 px-4">Name</th>
                  <th className="text-left py-2 px-4">Employee ID</th>
                  <th className="text-left py-2 px-4">Role</th>
                  <th className="text-left py-2 px-4">Department</th>
                  <th className="text-left py-2 px-4">Position</th>
                  <th className="text-left py-2 px-4">Leave Type</th>
                  <th className="text-left py-2 px-4">Applied on</th>
                  <th className="text-left py-2 px-4">Current Status</th>
                  <th className="text-left py-2 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(filteredLeaves) && filteredLeaves.map((element, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4 border-t">{index + 1}</td>
                    <td className="py-2 px-4 border-t">{element['name']}</td>
                    <td className="py-2 px-4 border-t">{element['employee-id']}</td>
                    <td className="py-2 px-4 border-t">{element['role']}</td>
                    <td className="py-2 px-4 border-t">{element['department']}</td>
                    <td className="py-2 px-4 border-t">{element['position']}</td>
                    <td className="py-2 px-4 border-t">{element['type-of-leave']}</td>
                    <td className="py-2 px-4 border-t">{element['date-of-filing']}</td>
                    <td className="py-2 px-4 border-t">{element['leave-status']}</td>
                    <td className="py-2 px-4 border-t">
                      <button className="px-4 py-2 bg-blue-500 text-white rounded">
                        View Leave Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-between mt-4">
              <p>Showing 1 to {filteredLeaves.length} of {filteredLeaves.length} entries</p>
              <div>
                <button className="px-3 py-1 bg-gray-200 text-gray-600 rounded">Previous</button>
                <button className="ml-2 px-3 py-1 bg-gray-200 text-gray-600 rounded">Next</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeaveHistoryReports;
