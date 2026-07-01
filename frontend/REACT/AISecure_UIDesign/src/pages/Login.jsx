import React from 'react';
import Signup from "./Signup";

const Login = () =>{
    return (
        <div className='bg-indigo-950 h-screen flex justify-center items-center '>
            <div className='flex flex-col w-90 justify-center items-center p-15 bg-indigo-950 transition-all shadow-2xl hover:shadow-[0_0_20px_#22d3ee] duration-400 border-1 border-black-950'>
                <h1 className='mb-3 text-3xl font-medium mb-2 text-indigo-200 '>Welcome user!!</h1>
                <div>
                    <label className='text-indigo-100'>Username</label>
                    <input
                        className = "p-2 mt-1 mb-2 bg-indigo-200 srounded-2xl italic text-black text-lg rounded border-indigo-700 border-2 transition-all hover:scale-102 duration-200"
                        type='text'
                        placeholder='Enter username...'
                    />
                </div>
                <div>
                    <label className='text-indigo-100'>Password</label>
                    <input
                        className = "p-2 mt-1 bg-indigo-200 italic text-black text-lg rounded-xl shadow-xl border-indigo-700 border-2 transition-all hover:scale-102"
                        type="password"
                        placeholder='Enter password...'
                    />
                </div>
                <button
                    className="mt-4 w-full bg-cyan-500 text-white font-semibold py-3 rounded-lg
                     transition-all duration-300 hover:bg-cyan-400 hover:scale-[1.02]">
                    Login
                </button>
                
                <div className='mt-3 text-indigo-200' >Or create a new account? 
                    {/* <Link to="<Signup/>">Sign up here</Link> */}
                </div>
            </div>
            
        </div>
    );
}
export default Login;