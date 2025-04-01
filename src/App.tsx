import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import './components/custom-layout/Layout.css';
import { Dashboard } from './pages/dashboard/Dashboard';
import { PrivateRoute } from './components/private-route/PrivateRoute';
import UploadPage from './pages/upload/Upload';




const App: React.FC = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard/>} />

          <Route path='/upload' element={
            <PrivateRoute>
               <UploadPage/>
            </PrivateRoute>
            
            }/>
        </Routes>
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
