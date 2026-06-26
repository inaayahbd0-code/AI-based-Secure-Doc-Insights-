import React from 'react';

const Sidebar = () => {
  return (
    <div className="min-h-screen bg-gradient-to-t from-blue-800 via-sky-700 to-blue-800 border-r-5 border-blue-900">
      <nav className="min-h-screen text-sky-200 text-center text-xl p-8 font-semibold w-60">
        Recent Activity
        <hr className='border-sky-200 border-t my-4'/>
        <input
          className=' italic text-lg font-normal flex pl-1 mt-5 w-full border-sky-300 border-1 '
          type='search'
          placeholder='Search files...' 
        />
      </nav>
    </div>
  );

}
export default Sidebar;