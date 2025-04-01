import React, { useState } from "react";
import "./Layout.css";
import { provider, signInWithPopup } from "../../firebase/FirebaseConfig";
import { getAuth, signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { Modal } from "react-bootstrap";
import { Link } from "react-router";

const auth = getAuth();

export const Header: React.FC = () => {
  const [show, setShow] = useState<boolean>(false);

  const handleGoogleLogin = async (): Promise<void> => {
    try {
      const result = await signInWithPopup(auth, provider);
      
      if (result.user) {
        const userInfo = {
          displayName: result.user.displayName,
          email: result.user.email,
          photoURL: result.user.photoURL,
          uid: result.user.uid,
        };
  
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
  
        toast.success(`Welcome, ${result.user.displayName || "User"}!`);
      } else {
        toast.success("Welcome!");
      }
    } catch (error) {
      toast.error("Login failed. Please try again.");
      console.error(error);
    }
  };
  

  const handleOnLogout = async (): Promise<void> => {
    try {
      await signOut(auth);
  
      localStorage.removeItem("userInfo");
      localStorage.removeItem("authToken");
  
      toast.info("You have been logged out.");
    } catch (error) {
      toast.error("Logout failed. Please try again.");
      console.error(error);
    }
  };
  

  return (
    <div className="flex items-center justify-between px-4 md:px-8 h-20 w-full shadow-md">
  
  <Link to="/" className="no-underline">
    <span className="font-bold text-xl text-blue-600 font-['Trebuchet_MS',_sans-serif]">
      Resume Optimization
    </span>
  </Link>
  
  
  <div className="flex items-center gap-4">
    <button 
      className="bg-blue-600 w-24 h-8 rounded hidden md:block" 
      onClick={() => setShow(true)}
    >
      <span className="font-semibold font-nunito text-white">Log in</span>
    </button>
    
    <button 
      className="bg-blue-600 w-20 h-8 rounded md:hidden" 
      onClick={() => setShow(true)}
    >
      <span className="font-semibold font-nunito text-white text-sm">Log in</span>
    </button>
    
    <button onClick={handleOnLogout} className="flex items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        fill="#0000F5"
      >
        <title>Logout</title>
        <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" />
      </svg>
    </button>
  </div>
  
 
  <Modal show={show} onHide={() => setShow(false)} centered>
    <Modal.Header closeButton className="border-bottom-0">
      <Modal.Title className="w-100 text-center font-inter fw-bold">Sign Up</Modal.Title>
    </Modal.Header>
    <Modal.Body className="px-4 py-4">
      <div className="d-flex flex-column align-items-center">
        <p className="text-muted mb-4">Create an account to continue</p>
        
        <button
          className="btn d-flex align-items-center justify-content-center gap-2 w-100 py-2 mb-3 border rounded-3 shadow-sm"
          onClick={handleGoogleLogin}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <path d="M8 12 h8"/>
            <path d="M12 8 v8"/>
          </svg>
          <span className="font-inter fw-medium">Continue with Google</span>
        </button>
        
        <div className="position-relative w-100 my-3">
          <hr className="w-100" />
          <span className="position-absolute top-50 start-50 translate-middle bg-white px-3 text-muted small">or</span>
        </div>
        
        <button
          className="btn btn-primary d-flex align-items-center justify-content-center w-100 py-2 rounded-3"
          // onClick={() => {/* Handle email signup */}}
        >
          <span className="font-inter fw-medium">Sign up with Email</span>
        </button>
        
        <p className="mt-4 mb-0 text-center small text-muted">
          Already have an account? <a href="#" className="text-decoration-none">Log in</a>
        </p>
      </div>
    </Modal.Body>
  </Modal>
</div>
  );
};
