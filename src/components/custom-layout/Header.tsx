import React, { useState } from "react";
import "../Layout.css";
import { provider, signInWithPopup } from "../../firebase/FirebaseConfig";
import { getAuth, signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { Modal } from "react-bootstrap";

const auth = getAuth();

export const Header: React.FC = () => {
  const [show, setShow] = useState<boolean>(false);

  const handleGoogleLogin = async (): Promise<void> => {
    try {
      const result = await signInWithPopup(auth, provider);
      if (result.user?.displayName) {
        toast.success(`Welcome, ${result.user.displayName}!`);
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
      toast.info("You have been logged out.");
    } catch (error) {
      toast.error("Logout failed. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="header-container">
      <span className="logo">Resume Optimization</span>

      <div className="login-access">
        <button className="bg-blue-600 w-24 h-8 rounded" onClick={() => setShow(true)}>
          <span className="font-semibold font-nunit ">Log in</span>
        </button>
      </div>

      <div className="logout-button">
        <button onClick={handleOnLogout}>
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

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title className="text-center">Signup Here</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <button className="font-bold font-nunito bg-blue-200" onClick={handleGoogleLogin}>
            Login with Google
          </button>
        </Modal.Body>
      </Modal>
    </div>
  );
};
