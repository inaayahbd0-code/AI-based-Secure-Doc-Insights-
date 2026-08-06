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

    const handleUpload = async (file) => {

        if (!file) {
            alert("Please select a file to upload.");
            return;
        }

        try {

            setUploading(true);

            const newDocument = await uploadDocument(file);
            await fetchDocuments();
            setSelectedDocument(newDocument);
        } catch (error) {
            console.error(error);
            alert("Failed to upload document. Please try again.");
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (documentId) => {
        try {
            await deleteDocument(documentId);

            if (selectedocument?.id === documentId) {
                setSelectedDocument(null);
            }

            await fetchDocuments();
        } catch (error) {
            console.error(error);
        }
    };

    const fetchDocuments = async () => {
        try {
            const docs = await getDocuments();
            setDocuments(docs);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchDocuments();
    }, []);

    return (
        <div className="relative min-h-screen overflow-hidden bg-indigo-950">

            {/* Background Glow 1 */}
            <div className="absolute -top-32 -left-24 w-[420px] h-[420px] rounded-full bg-cyan-500/10 blur-3xl" />

            {/* Background Glow 2 */}
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-indigo-400/10 blur-3xl" />

            {/* Dashboard */}
            <div className="relative flex h-screen">

                <Sidebar
                    documents={documents}
                    selectedocument={selectedocument}
                    handleDelete={handleDelete}
                    setSelectedDocument={setSelectedDocument}
                />

                <div className="flex flex-1 flex-col bg-transparent">

                    <Mainbar
                        selectedocument={selectedocument}
                        handleUpload={handleUpload}
                        uploading = {uploading}
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