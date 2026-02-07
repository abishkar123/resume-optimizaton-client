import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import './components/custom-layout/Layout.css';
import { Dashboard } from './pages/dashboard/Dashboard';
import { PrivateRoute } from './components/private-route/PrivateRoute';
import UploadPage from './pages/upload/Upload';
import AnalysisPage from './pages/Analysis/AnalysisPage';
import { AuthModalProvider } from './context/AuthModalContext';




const App: React.FC = () => {
  return (
    <div>
      <BrowserRouter>
        <AuthModalProvider>
          <Routes>
            <Route path="/" element={<Dashboard />} />

            <Route path='/upload' element={
              <PrivateRoute>
                <UploadPage />
              </PrivateRoute>

            } />


            <Route path='/analysi' element={
              <PrivateRoute>
                <AnalysisPage />
              </PrivateRoute>
            } />
          </Routes>
        </AuthModalProvider>


      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

    </div>
  );
};

export default App;
