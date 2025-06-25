import React from 'react'
import { Link } from 'react-router-dom'

const Error = () => {
  return (
    <div className='min-h-screen bg-gradient-to-r from-[#A55EEA] to-[#648DFD] text-white p-20'>
        <h1 className="text-4xl font-bold text-center">404 - Page Not Found</h1>
        <p className="text-center mt-4">The page you are looking for does not exist.</p>
        <div className="text-center mt-8">
            <Link to="/" className="bg-white text-black p-3 rounded-xl">Go back to Home</Link>
        </div>
    </div>
  )
}

export default Error