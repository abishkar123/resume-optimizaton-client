import react from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router";
import { Dashboard } from './pages/dashboard/Dashboard'
import { ToastContainer } from 'react-toastify';

function App() {
 

  return (
   <div>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Dashboard/>} />
    </Routes>
    </BrowserRouter>
    <ToastContainer position="top-right" autoClose={3000} />
   </div>
  )
}

export default App
