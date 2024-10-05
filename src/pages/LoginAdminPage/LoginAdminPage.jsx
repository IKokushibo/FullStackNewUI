import { Helmet } from 'react-helmet'
import EnvelopeICO from './Mail.svg'
import Password from './Password.svg'
import Arrow from './Arrow_Right_SM.svg'
import React, { useState, useEffect } from 'react';

import axios from '../../services/AxiosConfiguration'

// componenets
import Loading from "../../Components/LoadingAnimation/Loading"
import { useNavigate } from 'react-router-dom';
import Information from "../../Components/Information_Modal/Infomation";

function LoginAdmin() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [isInformationModalOpen, setIsInformationModalOpen] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const emailHandler = (event) => {
    setEmail(event.target.value)
  }

  const passwordHandler = (event) => {
    setPassword(event.target.value)
  }

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible); // Toggle the password visibility
  }
  
  const loginHandler = async () => {
    try {
      setIsLoading(true);
      const loginApiUrl = `/users/auth/authenticate`;
      const response = await axios.post(loginApiUrl, {
        "username": email,
        password
      });
      localStorage.setItem("accessToken", response.data['access-token'])
      if (response.status === 200) {
        navigate("/admin/landing-page");
      }
    } catch (error) {
      setIsError(true);
      setError(error);
      setIsInformationModalOpen(true);
    }
    
    setIsLoading(false);
  }

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        loginHandler();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [email,password]);

  if (isLoading) {
    return (
      <>
        <Loading />
      </>
    )
  }

  if (isError) {
    if(error.status === 401){
      setMessage(error.response.data.message);
    }
    if (error.code === "ERR_NETWORK") {
      setMessage("No Internet Connection");
    }

    setIsError(value => !value);
  }

  return (
    <>
      <Helmet>
        <title>Login Admin Page</title>
      </Helmet>

      <div className="w-full h-screen flex justify-center items-center flex-col">
        <div className="w-542px h-567px bg-pageBg1 bg-opacity-50 rounded-xl drop-shadow-2xl
        flex justify-between items-center flex-col">
          <div className="flex justify-center items-center flex-col mt-10">
            <h1 className="font-bold text-24px">ADMIN PORTAL</h1>
            <h3 className="text-16px" >Employee Leave Management System</h3>
          </div>

          <div className="flex-col h-300px w-400px flex items-center">

            <div className="flex relative ">
              <input className="rounded-xl w-378px h-67px mb-10 p-5" type="text" id="Email" onChange={(event) => { emailHandler(event) }} placeholder=" Email Address" />
              <img className="size-7 absolute right-3 top-5" src={EnvelopeICO} alt="Envelope" />
            </div>

            <div className="flex relative ">
              <input
                className="rounded-xl w-378px h-67px p-5"
                type={isPasswordVisible ? "text" : "password"} // Toggle input type
                id="Password"
                onChange={passwordHandler}
                placeholder=" Password"
              />
              <button
                type="button"
                className="absolute right-3 top-5 text-blue-500 hover:underline"
                onClick={togglePasswordVisibility}
              >
                {isPasswordVisible ? "Hide" : "Show"}
              </button>
            </div>

            <div className="flex relative top-16 ">
              <button type='button' className='hover:bg-pageBg1 rounded-xl w-378px h-67px p-5 bg-white font-bold text-20px' onClick={loginHandler}>Login</button>
              <img className="size-6 absolute right-32 top-6" src={Arrow} alt="Envelope" />
            </div>
          </div>
        </div>
        <a href='/login-user' className='mt-8 text-16px text-blue-800 font-bold underline'>
          Go Back
        </a>
      </div>
      
      {isInformationModalOpen && (
        <Information information={message} name="Ok" onClick={() => setIsInformationModalOpen(value => !value)}/>
      )}
    </>
  )
}

export default LoginAdmin
