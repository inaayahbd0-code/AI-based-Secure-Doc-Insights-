import React, { useState } from "react";

const Sidebar = ({
    documents,
    handleDelete,
    selectedocument,
    setSelectedDocument,
}) => {

    const [searchTerm, setSearchTerm] = useState("");

    const filteredDocuments = documents.filter((doc) =>
        doc.filename.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <aside className="
            w-72
            shrink-0
            sticky
            top-0
            h-screen
            bg-gradient-to-b
            from-indigo-900
            via-indigo-900
            to-indigo-950
            border-r
            border-indigo-700
            shadow-2xl
        ">

            <div className="h-full flex flex-col p-6">

                {/* Logo */}

                <h1 className="text-2xl font-bold text-cyan-400">
                    My Documents
                </h1>

                <p className="text-slate-400 text-sm mt-1">
                    AI Document Workspace
                </p>

                <div className="
                    h-[2px]
                    bg-gradient-to-r
                    from-cyan-400
                    via-cyan-300
                    to-transparent
                    rounded-full
                    mt-5
                    mb-5
                " />

                {/* Section */}

                <h2 className="text-lg font-semibold text-slate-100">
                    Recent Activity
                </h2>

                <p className="text-slate-400 text-sm mt-1">
                    Total Documents • {documents.length}
                </p>

                {/* Search */}

                <input
                    type="search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search documents..."
                    className="
                        mt-5
                        w-full
                        rounded-xl
                        bg-slate-900/70
                        border
                        border-indigo-700
                        px-4
                        py-3
                        text-sm
                        text-slate-200
                        placeholder:text-slate-500
                        focus:outline-none
                        focus:border-cyan-400
                        focus:ring-2
                        focus:ring-cyan-400/30
                        transition-all
                    "
                />

                {/* Document List */}

                <div className="
                    mt-6
                    flex-1
                    min-h-0
                    overflow-y-auto
                    pr-1
                    space-y-3
                ">

                    {filteredDocuments.map((doc) => (

                        <div
                            key={doc.id}
                            onClick={() => setSelectedDocument(doc)}
                            className={`
                                cursor-pointer
                                rounded-xl
                                p-4
                                transition-all
                                duration-300
                                border

                                ${
                                    selectedocument?.id === doc.id

                                        ? "border-cyan-400 bg-gradient-to-r from-cyan-500/20 to-indigo-800 shadow-lg shadow-cyan-500/10"

                                        : "border-transparent bg-slate-900/70 hover:border-indigo-500 hover:bg-slate-800/80"
                                }
                            `}
                        >

                            <div className="flex justify-between items-start">

                                <div className="overflow-hidden min-w-0">

                                    <p className="
                                        font-medium
                                        text-slate-100
                                        truncate
                                    ">
                                        📄 {doc.filename}
                                    </p>

                                    <p className="
                                        text-xs
                                        text-cyan-300
                                        mt-2
                                        capitalize
                                    ">
                                        {doc.status}
                                    </p>

                                </div>

                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDelete(doc.id);
                                    }}
                                    className="
                                        ml-3
                                        shrink-0
                                        h-8
                                        w-8
                                        rounded-full
                                        flex
                                        items-center
                                        justify-center
                                        text-slate-400
                                        hover:bg-red-500/20
                                        hover:text-red-400
                                        transition-all
                                    "
                                >
                                    🗑
                                </button>

                            </div>

                        </div>

                    ))}

                    {/* Empty States */}

                    {filteredDocuments.length === 0 && (

                        <div className="text-center mt-10 px-3">

                            {documents.length === 0 ? (

                                <>
                                    <div className="text-3xl mb-3">
                                        📄
                                    </div>

                                    <p className="
                                        text-slate-300
                                        text-sm
                                        font-medium
                                    ">
                                        No documents yet
                                    </p>

                                    <p className="
                                        text-slate-500
                                        text-xs
                                        mt-1
                                        leading-5
                                    ">
                                        Upload your first PDF
                                        <br />
                                        to get started.
                                    </p>
                                </>

                            ) : (

                                <>
                                    <div className="text-2xl mb-2">
                                        🔎
                                    </div>

                                    <p className="
                                        text-slate-400
                                        text-sm
                                    ">
                                        No matching documents
                                    </p>

                                    <p className="
                                        text-slate-600
                                        text-xs
                                        mt-1
                                    ">
                                        Try a different search.
                                    </p>
                                </>

                            )}

                        </div>

                    )}

                </div>

            </div>

        </aside>
    );
};

export default Sidebar;

