import React, { useState, useEffect } from "react";
import "./Layout.css";
import { provider, signInWithPopup } from "../../firebase/FirebaseConfig";
import { getAuth, signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuthModal } from "../../context/AuthModalContext";

const auth = getAuth();

interface UserInfo {
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  uid: string;
}

export const Header: React.FC = () => {
  const { showSignupModal, closeSignupModal, openSignupModal } = useAuthModal();
  const navigate = useNavigate();
  const [user, setUser] = useState<UserInfo | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Check for logged in user
    const storedUser = localStorage.getItem("userInfo");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // Handle scroll effect
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleGoogleLogin = async (): Promise<void> => {
    try {
      const result = await signInWithPopup(auth, provider);

      if (result.user) {
        const userInfo: UserInfo = {
          displayName: result.user.displayName,
          email: result.user.email,
          photoURL: result.user.photoURL,
          uid: result.user.uid,
        };

        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        setUser(userInfo);

        toast.success(`Welcome, ${result.user.displayName || "User"}!`);
        closeSignupModal();
        navigate("/upload");
      } else {
        toast.success("Welcome!");
        closeSignupModal();
        navigate("/upload");
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
      setUser(null);
      toast.info("You have been logged out.");
      navigate("/");
    } catch (error) {
      toast.error("Logout failed. Please try again.");
      console.error(error);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 no-underline group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <span className="font-outfit font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ResumeAI
              </span>
            </Link>


            {/* Navigation - Desktop */}
            <nav className="hidden md:flex items-center gap-8">
              <a
                href="#features"
                className="text-gray-600 hover:text-blue-600 font-medium transition-colors no-underline"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="text-gray-600 hover:text-blue-600 font-medium transition-colors no-underline"
              >
                How It Works
              </a>
            </nav>

            {/* Auth Buttons */}
            <div className="flex items-center gap-3">
              {user ? (
                <>
                  <div className="hidden sm:flex items-center gap-3 mr-2">
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt={user.displayName || "User"}
                        className="w-9 h-9 rounded-full border-2 border-blue-500"
                      />
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                        {user.displayName?.charAt(0) || "U"}
                      </div>
                    )}
                    <span className="text-gray-700 font-medium text-sm">
                      {user.displayName?.split(" ")[0]}
                    </span>
                  </div>
                  <Link to="/upload">
                    <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold text-sm hover:shadow-lg hover:shadow-blue-500/30 transition-all">
                      Dashboard
                    </button>
                  </Link>
                  <button
                    onClick={handleOnLogout}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    title="Logout"
                  >
                    <svg
                      className="w-5 h-5 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={openSignupModal}
                    className="px-4 py-2 text-gray-700 font-semibold text-sm hover:text-blue-600 transition-colors hidden sm:block"
                  >
                    Log in
                  </button>
                  <button
                    onClick={openSignupModal}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold text-sm hover:shadow-lg hover:shadow-blue-500/30 transition-all hover:-translate-y-0.5"
                  >
                    Get Started Free
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Auth Modal */}
      <Modal show={showSignupModal} onHide={closeSignupModal} centered size="sm">
        <div className="p-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 font-outfit">
              Welcome to ResumeAI
            </h2>
            <p className="text-gray-500 mt-2">
              Sign in to optimize your resume with AI
            </p>
          </div>

          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 border-2 border-gray-200 rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-all font-medium"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 48 48"
            >
              <path
                fill="#EA4335"
                d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
              />
              <path
                fill="#4285F4"
                d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
              />
              <path
                fill="#FBBC05"
                d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
              />
              <path
                fill="#34A853"
                d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
              />
              <path fill="none" d="M0 0h48v48H0z" />
            </svg>
            <span className="text-gray-700">Continue with Google</span>
          </button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">or</span>
            </div>
          </div>

          <button className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all">
            Sign up with Email
          </button>

          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{" "}
            <button className="text-blue-600 font-semibold hover:underline">
              Log in
            </button>
          </p>
        </div>
      </Modal>
    </>
  );
};
