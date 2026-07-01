import React from 'react';

const Signup = () => {
  return (
    <div className="min-h-screen bg-indigo-950 flex justify-center items-center">
      <div className="w-[520px] mt-10 bg-indigo-950 border-2 shadow-2xl border-black-950 rounded-xl p-10
                      flex flex-col gap-5
                      transition-all duration-300
                      hover:shadow-[0_0_20px_#22d3ee]">

        <h1 className="text-3xl font-semibold text-indigo-100 text-center mb-2">
          Create a New Account
        </h1>

        <div className="flex flex-col gap-1">
          <label className="text-indigo-100">Name</label>
          <input
            className="w-full p-3 rounded bg-slate-200 text-black italic border-2 border-indigo-700
                       transition-all duration-200 hover:scale-[1.02] focus:outline-none"
            type="text"
            placeholder="Enter your name..."
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-indigo-100">Email</label>
          <input
            className="w-full p-3 rounded bg-slate-200 text-black italic border-2 border-indigo-700
                       transition-all duration-200 hover:scale-[1.02] focus:outline-none"
            type="email"
            placeholder="Enter your email..."
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-indigo-100">Position</label>
          <input
            className="w-full p-3 rounded bg-slate-200 text-black italic border-2 border-indigo-700
                       transition-all duration-200 hover:scale-[1.02] focus:outline-none"
            type="text"
            placeholder="Enter your position..."
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-indigo-100">Username</label>
          <input
            className="w-full p-3 rounded bg-slate-200 text-black italic border-2 border-indigo-700
                       transition-all duration-200 hover:scale-[1.02] focus:outline-none"
            type="text"
            placeholder="Choose a username..."
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-indigo-100">Password</label>
          <input
            className="w-full p-3 rounded bg-slate-200 text-black italic border-2 border-indigo-700
                       transition-all duration-200 hover:scale-[1.02] focus:outline-none"
            type="password"
            placeholder="Enter your password..."
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-indigo-100">Confirm Password</label>
          <input
            className="w-full p-3 rounded bg-slate-200 text-black italic border-2 border-indigo-700
                       transition-all duration-200 hover:scale-[1.02] focus:outline-none"
            type="password"
            placeholder="Confirm your password..."
          />
        </div>

        <button
          className="mt-4 w-full bg-cyan-500 text-white font-semibold py-3 rounded-lg
                     transition-all duration-300 hover:bg-cyan-400 hover:scale-[1.02]">
          Sign Up
        </button>

      </div>
    </div>
  );
}

export default Signup;