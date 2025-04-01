
import React from 'react'
import { Navigate } from 'react-router-dom';

interface PrivateRouterProps{
    children: React.ReactNode;
}

export const PrivateRoute: React.FC<PrivateRouterProps> = ({children})=>{
    const storedUser = JSON.parse(localStorage.getItem("userInfo") || "null");
    const userid = storedUser?.uid

return userid? <>{children}</> : <Navigate to="/" replace/>
}