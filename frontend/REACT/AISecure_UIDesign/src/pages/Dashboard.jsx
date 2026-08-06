import Sidebar from "../components/Sidebar";
import Copilot from "../components/Copilot";
import Mainbar from "../components/Mainbar";
import React, { useState, useEffect } from "react";
import { uploadDocument } from "../services/upload";
import { getDocuments, deleteDocument } from "../services/document";

const Dashboard = () => {

    const [documents, setDocuments] = useState([]);
    const [selectedocument, setSelectedDocument] = useState(null);

    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState("");

    const handleUpload = async (file) => {

        if (!file) {
            setError("Please select a PDF file first.");
            return;
        }

        setError("");
        setUploading(true);

        try {

            const newDocument = await uploadDocument(file);

            await fetchDocuments();

            setSelectedDocument(newDocument);

        } catch (error) {

            console.error(error);

            setError(
                error.response?.data?.detail ||
                "Unable to upload the document. Please try again."
            );

        } finally {

            setUploading(false);

        }
    };


    const handleDelete = async (documentId) => {

        setError("");

        try {

            await deleteDocument(documentId);

            if (selectedocument?.id === documentId) {
                setSelectedDocument(null);
            }

            await fetchDocuments();

        } catch (error) {

            console.error(error);

            setError(
                error.response?.data?.detail ||
                "Unable to delete the document. Please try again."
            );

        }
    };


    const fetchDocuments = async () => {

        try {

            const docs = await getDocuments();

            setDocuments(docs);

        } catch (error) {

            console.error(error);

            setError(
                "Unable to load your documents. Please refresh the page."
            );

        }
    };


    useEffect(() => {

        fetchDocuments();

    }, []);


    return (

        <div className="
            min-h-screen
            bg-indigo-950
            text-slate-100
            overflow-x-hidden
        ">

            <div className="relative flex min-h-screen">

                <Sidebar
                    documents={documents}
                    selectedocument={selectedocument}
                    handleDelete={handleDelete}
                    setSelectedDocument={setSelectedDocument}
                />

                <div className="flex-1 min-w-0">

                    {/* Error message */}

                    {error && (

                        <div className="
                            mx-6
                            mt-4
                            px-4
                            py-3
                            rounded-xl
                            border
                            border-red-500/30
                            bg-red-500/10
                            text-red-300
                            text-sm
                            flex
                            items-center
                            justify-between
                        ">

                            <span>
                                ⚠️ {error}
                            </span>

                            <button
                                onClick={() => setError("")}
                                className="
                                    ml-4
                                    text-red-400
                                    hover:text-red-200
                                "
                            >
                                ✕
                            </button>

                        </div>

                    )}

                    <Mainbar
                        selectedocument={selectedocument}
                        handleUpload={handleUpload}
                        uploading={uploading}
                    />

                    <Copilot
                        selectedocument={selectedocument}
                    />

                </div>

            </div>

        </div>

    );
};

export default Dashboard;