import React from 'react';

const Mainbar = ({ selectedocument }) => {

  console.log("Mainbar received:", selectedocument);

  return (
    <div>

      {/* Main Content */}
      <div className="bg-gradient-to-b from-blue-950 via-blue-900 pb-28 to-cyan-700 min-h-[500px] w-full">

        <div className="text-3xl font-bold text-center text-cyan-500 pt-8">
          AI SECURE DOCUMENT INSIGHTS
        </div>

        <div className="text-center text-white mt-4 text-xl">
          {selectedocument
            ? selectedocument.filename
            : "No document selected"}
        </div>

        <div className="text-center text-cyan-200">
          {selectedocument
            ? `Status: ${selectedocument.status}`
            : ""}
        </div>

        <div>

          <input
            className="text-slate-100 m-4 ml-80 font-medium border-blue-700 border-2 rounded w-100 h-10"
            type="url"
            placeholder="Enter filepath..."
          />

          <input
            className="hover:scale-110 duration-300 pt-2 text-center text-slate-100 h-10 font-medium bg-cyan-500 border-blue-700 border-2 rounded w-35"
            type="file"
          />

          <div className="border-blue-300 border-dashed border-2 min-h-[500px] w-3xl ml-55 p-6">

            {selectedocument ? (

              <>
                <h2 className="text-2xl text-cyan-300 font-bold mb-4">
                  AI Summary
                </h2>

                <p className="leading-8 whitespace-pre-wrap text-white">
                  {selectedocument.summary}
                </p>
              </>

            ) : (

              <div className="flex justify-center items-center h-full text-gray-400 text-xl">
                Select a document from the sidebar.
              </div>

            )}

          </div>

        </div>

      </div>

    </div>
  );
};

export default Mainbar;