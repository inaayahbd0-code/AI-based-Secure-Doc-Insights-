import React from "react";

const Sidebar = ({ documents, selectedocument, setSelectedDocument, }) => {
    

    return (
        <div className="min-h-screen bg-gradient-to-t from-blue-800 via-sky-700 to-blue-800 border-r-4 border-blue-900">
            <nav className="min-h-screen text-sky-200 text-center text-xl p-8 font-semibold w-60">

                <h2>Recent Activity</h2>

                <hr className="border-sky-200 border-t my-4" />

                <input
                    className="italic text-lg font-normal pl-2 mt-5 w-full border-sky-300 border rounded"
                    type="search"
                    placeholder="Search files..."
                />

                <p className="mt-4 text-sm">
                    Total Documents: {documents.length}
                </p>

                <div className="mt-4">
                    {documents.map((doc) => (
                        <div
                            key={doc.id}
                            onClick={() => {
                                console.log("Clicked:", doc);
                                setSelectedDocument(doc);
                            }}
                              className={`mt-3 p-2 rounded text-left cursor-pointer transition-all ${
                              selectedocument?.id === doc.id
                              ? "bg-cyan-600"
                              :"bg-blue-900 hover:bg-blue-700"
                            }`}
                        >
                            <p>{doc.filename}</p>
                            <p className="text-xs text-sky-300">
                                {doc.status}
                            </p>
                        </div>
                    ))}
                </div>

            </nav>
        </div>
    );
};

export default Sidebar;