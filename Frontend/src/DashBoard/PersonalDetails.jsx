import React from 'react'

function PersonalDetails() {
  return (
    <div>
      <div className='flex justify-between items-center'>
        <div>
          <h1 className='text-xl font-bold text-gray-800'>Personal Information</h1>
          <p className='text-md text-gray-700'>Time tools streamline productivity, optimize efficiency</p>
        </div>
        <button className='h-8 px-3 rounded-md bg-purple-600 text-white hover:bg-purple-700 cursor-pointer'>Get the app</button>
      </div>
    </div>
  )
}

export default PersonalDetails