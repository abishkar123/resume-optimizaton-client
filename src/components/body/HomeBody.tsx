import React from 'react'
import '../custom-layout/Layout.css'

export const HomeBody : React.FC = () => {
  return (
    <div className='container'>
        <div className='font-inter text-5xl hero'>
            <p>Optimizing Resumes with <span className='text-blue-600'> AI</span>
             <p className='p-2'>Delivering 
              <span className='text-blue-600'> Superior Results</span></p></p>

            
        </div>

        <div className='homebody'>
          <button className='bg-blue-500 w-28 h-11 rounded-md text-white font-semibold font-nunito'>
            Try for Free
          </button>
          <button className='bg-white w-28 h-11 rounded-md text-black border-2 font-semibold font-nunito ml-3'>
            Sign up
          </button>
        </div>

    </div>
  )
}
 