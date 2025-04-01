import React from 'react'
import '../custom-layout/Layout.css'
import { Link } from 'react-router'
import { toast } from 'react-toastify'



export const HomeBody : React.FC = () => {


  const handleOnçlick = ()=>{
    const storedUser = JSON.parse(localStorage.getItem("userInfo") || "null");
    const userid = storedUser?.uid
    
   if(!userid){
    toast.error("Please login before uploading a resume!")
   }

  }

  return (
    <div>
      <main className='container'>
      <div className='font-inter text-5xl hero'>
            <h1 className='font-inter font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight'>Optimizing Resumes with <span className='text-blue-600'> AI</span>
             <p className='p-2'>Delivering 
              <span className='text-blue-600'> Superior Results</span></p></h1>
            
        </div>

        <div className='homebody'>
            <Link to="/upload">
            <button  onClick={handleOnçlick}
            className='bg-blue-500 w-28 h-11 rounded-md text-white font-semibold font-nunito'>
              Try for Free
            </button> </Link>

          <button className='bg-white w-28 h-11 rounded-md text-black border-2 font-semibold font-nunito ml-3'>
            Sign up
          </button>
        </div>

      </main>

      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Deliver Superior Results
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Our AI-powered resume optimizer helps you create a professional resume that stands out.
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div className="ml-16">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">ATS Optimization</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Get your resume past Applicant Tracking Systems with our smart keyword analysis.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <div className="ml-16">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Custom Templates</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Choose from professionally designed templates optimized for your industry.
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="ml-16">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">Actionable Insights</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Get personalized feedback on how to improve your resume content and structure.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
        

    </div>
  )
}
 