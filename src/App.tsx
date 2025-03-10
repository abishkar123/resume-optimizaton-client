import react from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router";
import { Dashboard } from './pages/dashboard/Dashboard'

function App() {
 

  return (
   <div>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Dashboard/>} />
    </Routes>
    </BrowserRouter>
    

   </div>
  )
}

export default App
