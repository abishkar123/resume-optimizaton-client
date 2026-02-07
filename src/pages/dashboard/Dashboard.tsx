import React from 'react'
import { Header } from '../../components/custom-layout/Header'
import { HomeBody } from '../../components/body/HomeBody'


export const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HomeBody />
    </div>
  )
}
