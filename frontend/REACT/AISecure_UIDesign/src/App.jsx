import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

const Sidebar = () => {
  return (
    <div className="min-h-screen bg-gradient-to-t from-blue-800 via-sky-700 to-blue-800 border-r-5 border-blue-900">
      <nav className="min-h-screen text-sky-200 text-center text-xl p-8 font-semibold w-60">
        Recent Activity
        <hr className='border-sky-200 border-t my-4'
        /><input
          className=' italic text-lg font-normal flex pl-1 mt-5 w-full border-sky-300 border-1 '
          type='search'
          placeholder='Search files...' 
        />
      </nav>
    </div>
  )
}
const Copilot = () => {
  return (
    <div>
      <div className='fixed bottom-0 border-b border-l border-blue-900 border-4 p-4 w-screen h-25 bg-gradient-to-t from-cyan-800 to-teal-300'>
        
        <input 
          className="absolute top-0 left-0 right-0 text-2xl text-sky-100 italic text-center pr-50 justify-center items-center h-full w-full rounded font-normal border-cyan-800 border-1"
          type="text"
          placeholder="What's on your mind today..?"
        />
      </div>
    </div>
  )
}

const App = () => {
  return (
    <div className="flex">
      
      {/* Sidebar */}
      <Sidebar />
      <Copilot/>
      {/* Main Content */}
      <div className=" bg-gradient-to-b from-blue-950 via-blue-900 to-cyan-700 min-h-screen w-screen">
        <div className="text-3xl font-bold text-center text-cyan-500 font-bold pt-8  justify-center items-center ">
          AI SECURE DOCUMENT INSIGHTS
        </div>

        <div>
          <input 
            className="text-slate-100 m-4 ml-80 font-medium border-blue-700 border-2 rounded w-100 h-10" 
            type="url" 
            placeholder=" Enter URL..."
          />
          
          <input 
            className="pt-2 text-center text-slate-100 h-10 font-medium bg-cyan-500 border-blue-700 border-2 rounded w-35 " 
            type="file" 
            placeholder=" Choose File "
          />
          
          <div
            className='border-blue-300 border-dashed border-2 min-h-screen w-3xl ml-55 '
             
          />
          
        </div>
      </div>

    </div>
  )
}

export default App