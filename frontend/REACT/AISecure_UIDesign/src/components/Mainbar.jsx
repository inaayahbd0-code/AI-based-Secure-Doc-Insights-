import React, { useState } from "react";

const Mainbar = ({ selectedocument, handleUpload, uploading }) => {
    const [selectedFile, setSelectedFile] = useState(null);

    return (
        <div className="flex-1 px-8 py-6">

            {/* Header */}
            <div className="flex items-center justify-between mb-6">

                <div>
                    <h1 className="text-4xl font-bold text-cyan-400">
                        DocQuery AI
                    </h1>

                    <p className="text-slate-400 text-sm mt-1">
                        AI-powered Secure Document Intelligence
                    </p>
                </div>

                <div className="flex items-center gap-3">

                    <input
                        id="pdf-upload"
                        type="file"
                        accept=".pdf"
                        className="hidden"
                        onChange={(e) => setSelectedFile(e.target.files[0])}
                    />

                    <label
                        htmlFor="pdf-upload"
                        className="cursor-pointer px-4 py-2 rounded-xl bg-indigo-900 border border-indigo-700 hover:border-cyan-400 transition-all text-sm"
                    >
                        Choose PDF
                    </label>

                    <button
                        onClick={() => handleUpload(selectedFile)}
                        disabled={uploading}
                        className={`ml-4 px-6 py-2 rounded-lg font-semibold text-white transition-all duration-300 ${
                                    uploading
                                        ? "bg-cyan-800 cursor-not-allowed"
                                        : "bg-cyan-500 hover:bg-cyan-400 hover:shadow-lg hover:shadow-cyan-500/30"
                                }`}
                            >

                                {uploading ? "Uploading..." : "Upload"}
                    
                        
                    </button>

                </div>

            </div>

            {/* Current Document */}

            <div className="mb-5">

                {selectedocument ? (

                    <>
                        <h2 className="text-lg font-semibold text-white">
                            {selectedocument.filename}
                        </h2>

                        <p className="text-sm text-cyan-300 mt-1">
                            Status • {selectedocument.status}
                        </p>
                    </>

                ) : (

                    <h2 className="text-slate-400">
                        No document selected
                    </h2>

                )}

            </div>

            {/* Summary */}

            <div className="rounded-2xl bg-slate-900/80 border border-indigo-700 shadow-xl p-6">

                <h2 className="text-xl font-semibold text-cyan-300 mb-5">
                    AI Summary
                </h2>

                {selectedocument ? (

                    <p className="text-slate-300 whitespace-pre-wrap leading-8">
                        {selectedocument.summary}
                    </p>

                ) : (

                    <div className="flex justify-center items-center h-72 text-slate-500">

                        Select a document from the sidebar.

                    </div>

                )}

            </div>

        </div>
    );
};

export default Mainbar;