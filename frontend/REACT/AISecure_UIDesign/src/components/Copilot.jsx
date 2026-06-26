
const Copilot = () => {
  return (
    <div>
      <div className='fixed bottom-0 border-b border-l border-blue-900 border-4 p-4 w-screen h-25 bg-gradient-to-t from-cyan-800 to-teal-300'>
        
        <input 
          className=" absolute top-0 left-0 right-0 text-2xl text-sky-100 italic text-center pr-50 justify-center items-center h-full w-full rounded font-normal border-cyan-800 border-1"
          type="text"
          placeholder="What's on your mind today..?"
        />
      </div>
    </div>
  );
}

export default Copilot;