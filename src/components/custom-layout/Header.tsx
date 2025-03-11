import React from 'react';
import "../Layout.css";
import { provider, signInWithPopup } from '../../firebase/FirebaseConfig';
import { getAuth, signOut } from 'firebase/auth';
import { toast } from 'react-toastify';


export const Header = () => {
  const  auth= getAuth()
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      toast.success(`Welcome, ${result.user.displayName}!`);
    } catch (error) {
      toast.error("Login failed. Please try again.");
      console.error(error);
    }
  };

  const handleOnLogout = async () => {
    try {
      await signOut(auth);
      toast.info("You have been logged out.");
    } catch (error) {
      toast.error("Logout failed. Please try again.");
      console.error(error);
    }
  };

  return (
    <div>
      <div className='header-container'>
        <div>
          <span className='logo'>Resume Optimization</span>
        {/* <img src={logo} alt="company_logo" className='logo' /> */}
        </div>

        <div className='login-access'> 
          <button onClick={handleGoogleLogin}>
          <svg xmlns="http://www.w3.org/2000/svg" height="24px"  viewBox="0 -960 960 960" width="24px" fill="#0000F5"> <title>login</title><path d="M480-120v-80h280v-560H480v-80h280q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H480Zm-80-160-55-58 102-102H120v-80h327L345-622l55-58 200 200-200 200Z"/></svg>
          </button>
        </div>

        <div className='logout-button'> 
          <button onClick={handleOnLogout}>
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#0000F5"><title>Logout</title><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
};
