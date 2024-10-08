import React from 'react';
import CKWDLogo from './ckwdlogo.svg';  // Ensure this path is correct
import UKASLogo from './ukas.svg';      // Ensure this path is correct

const Header = () => {
  return (
    <div className="w-full flex flex-col items-center p-4 border-b-2 border-gray-300">
      <div className="flex justify-center items-center w-full">
        {/* Left logo */}
        <img src={CKWDLogo} alt="CKWD Logo" className="h-20 w-auto mr-4" />
        
        {/* Center text */}
        <div className="text-center mx-4">
          <h1 className="text-lg font-bold uppercase">Republic of the Philippines</h1>
          <h1 className="text-lg font-bold uppercase">City of Koronadal Water District</h1>
          <p className="text-sm">Blk. 1, Casa Subd., Zone 3, City of Koronadal</p>
          <p className="text-sm">Tel. Nos. (083)228-8141, 520-0674, 228-4049</p>
          <p className="text-sm">
            Email Add: <a href="mailto:ckwd_koronadalcity@yahoo.com" className="text-blue-500">ckwd_koronadalcity@yahoo.com</a>
          </p>
        </div>

        {/* Right logo */}
        <img src={UKASLogo} alt="UKAS Logo" className="h-20 w-auto ml-4" />
      </div>

      {/* Title */}
      <h2 className="text-xl font-semibold mt-2">Leave Application</h2>
    </div>
  );
};

export default Header;
