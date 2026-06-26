import React from 'react';

const Mainbar = () => {
  return (
    <div >
    
      {/* Main Content */}
      <div className=" bg-gradient-to-b from-blue-950 via-blue-900 to-cyan-700 min-h-screen w-full">
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
            className="hover:scale-110 duration-300 pt-2 text-center text-slate-100 h-10 font-medium bg-cyan-500 border-blue-700 border-2 rounded w-35 " 
            type="file" 
            placeholder=" Choose File "
          />
          
          <div
            className=' border-blue-300 border-dashed border-2 min-h-screen w-3xl ml-55 '
             
          />
          
        </div>
      </div>

    </div>
  );
}

export default Mainbar;