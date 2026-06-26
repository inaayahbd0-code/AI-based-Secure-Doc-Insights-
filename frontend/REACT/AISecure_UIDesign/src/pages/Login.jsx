import React from 'react';

const Login = () =>{
    return (
        <div className='bg-sky-200 h-screen flex justify-center items-center'>
            <div className='flex flex-col w-90 justify-center items-center p-15 bg-blue-200 border-2 border-cyan-100'>
                <h1 className='text-2xl font-medium italic mb-2'>Welcome user !</h1>
                <div>
                    <label>Username</label>
                    <input
                        className = "p-4 mt-2 mb-2 bg-slate-100 text-black text-lg border-black border-1"
                        type='text'
                        placeholder='Enter username...'
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        className = "p-4 mt-2 bg-slate-100 text-black text-lg border-black border-1"
                        type="password"
                        placeholder='Enter password...'
                    />
                </div>

            </div>
        </div>
    );
}
export default Login;