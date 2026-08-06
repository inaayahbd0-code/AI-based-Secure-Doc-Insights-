import React, { useState, useRef } from "react";

const Mainbar = ({
    selectedocument,
    handleUpload,
    uploading
}) => {

    const [selectedFile, setSelectedFile] = useState(null);
    const [dragging, setDragging] = useState(false);
    const fileInputRef = useRef(null);

    const handleFile = (file) => {

        if (!file) return;

        if (file.type !== "application/pdf") {
            alert("Only PDF files are allowed.");
            return;
        }

        setSelectedFile(file);
    };

    const handleDrop = (e) => {

        e.preventDefault();
        setDragging(false);

        const file = e.dataTransfer.files[0];

        handleFile(file);
    };

    const handleUploadClick = async () => {

        if (!selectedFile) {
            alert("Please select a PDF first.");
            return;
        }

        await handleUpload(selectedFile);

        setSelectedFile(null);
    };

    return (

        <div className="w-full min-h-screen">

            <div className="
                bg-gradient-to-b
                from-indigo-950
                via-blue-950
                to-slate-950
                min-h-screen
                px-8
                pt-8
                pb-40
            ">

                {/* HEADER */}

                <div className="text-center mb-6">

                    <h1 className="
                        text-2xl
                        font-bold
                        tracking-wide
                        text-cyan-400
                    ">
                        AI SECURE DOCUMENT INSIGHTS
                    </h1>

                    <div className="mt-2 text-slate-300">

                        {selectedocument
                            ? selectedocument.filename
                            : "No document selected"}

                    </div>

                    {selectedocument && (

                        <div className="text-xs text-cyan-400 mt-1">

                            Status: {selectedocument.status}

                        </div>

                    )}

                </div>


                {/* UPLOAD AREA */}

                <div className="max-w-3xl mx-auto">

                    <div
                        onDragOver={(e) => {
                            e.preventDefault();
                            setDragging(true);
                        }}

                        onDragLeave={() => {
                            setDragging(false);
                        }}

                        onDrop={handleDrop}

                        onClick={() => fileInputRef.current?.click()}

                        className={`
                            cursor-pointer
                            rounded-2xl
                            border-2
                            border-dashed
                            p-8
                            text-center
                            transition-all
                            duration-300

                            ${
                                dragging
                                    ? "border-cyan-400 bg-cyan-400/10 scale-[1.01]"
                                    : "border-indigo-700 bg-slate-900/50 hover:border-cyan-500 hover:bg-slate-900/80"
                            }
                        `}
                    >

                        <div className="text-3xl mb-3">
                            📄
                        </div>

                        <p className="text-slate-200 font-medium">

                            {dragging
                                ? "Drop your PDF here"
                                : "Drag & drop your PDF here"}

                        </p>

                        <p className="text-slate-500 text-sm mt-1">
                            or click to browse
                        </p>

                        <p className="text-slate-600 text-xs mt-3">
                            PDF files only
                        </p>

                        <input
                            ref={fileInputRef}
                            type="file"
                            accept=".pdf,application/pdf"
                            className="hidden"

                            onChange={(e) => {
                                handleFile(e.target.files[0]);
                            }}
                        />

                    </div>


                    {/* SELECTED FILE */}

                    {selectedFile && (

                        <div className="
                            mt-4
                            flex
                            items-center
                            justify-between
                            rounded-xl
                            border
                            border-indigo-800
                            bg-indigo-950/70
                            px-4
                            py-3
                        ">

                            <div className="flex items-center gap-3">

                                <span className="text-cyan-400">
                                    📄
                                </span>

                                <div>

                                    <p className="text-sm text-slate-200">
                                        {selectedFile.name}
                                    </p>

                                    <p className="text-xs text-slate-500">
                                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                                    </p>

                                </div>

                            </div>


                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedFile(null);
                                }}

                                className="
                                    text-slate-500
                                    hover:text-red-400
                                    transition-colors
                                "
                            >
                                ✕
                            </button>

                        </div>

                    )}


                    {/* UPLOAD BUTTON */}

                    <div className="flex justify-center mt-4">

                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                handleUploadClick();
                            }}

                            disabled={!selectedFile || uploading}

                            className={`
                                px-6
                                py-2.5
                                rounded-xl
                                font-semibold
                                text-sm
                                transition-all
                                duration-300

                                ${
                                    !selectedFile || uploading
                                        ? "bg-indigo-900 text-slate-600 cursor-not-allowed"
                                        : "bg-cyan-500 text-white hover:bg-cyan-400 hover:shadow-lg hover:shadow-cyan-500/30"
                                }
                            `}
                        >

                            {uploading
                                ? "Uploading..."
                                : "Upload PDF"}

                        </button>

                    </div>

                </div>


                {/* SUMMARY */}

                <div className="max-w-4xl mx-auto mt-8">

                    <div className="
                        rounded-2xl
                        border
                        border-indigo-800
                        bg-slate-950/60
                        backdrop-blur-sm
                        p-6
                        min-h-[300px]
                        shadow-xl
                    ">

                        {selectedocument ? (

                            <>

                                <div className="flex items-center gap-2 mb-4">

                                    <span className="text-cyan-400">
                                        ✨
                                    </span>

                                    <h2 className="
                                        text-lg
                                        font-semibold
                                        text-cyan-300
                                    ">
                                        AI Summary
                                    </h2>

                                </div>

                                <p className="
                                    text-sm
                                    leading-7
                                    text-slate-300
                                    whitespace-pre-wrap
                                ">
                                    {selectedocument.summary}
                                </p>

                            </>

                        ) : (

                            <div className="
                                flex
                                items-center
                                justify-center
                                min-h-[250px]
                                text-slate-500
                                text-sm
                            ">

                                Select a document from the sidebar
                                to view its AI-generated summary.

                            </div>

                        )}

                    </div>

                </div>

            </div>

        </div>

    );
};

export default Mainbar;