import Sidebar from "../components/Sidebar";
import Copilot from "../components/Copilot";
import Mainbar from "../components/Mainbar";
import React from 'react';
import { useState, useEffect } from "react";
import { getDocuments } from "../services/document";




const Dashboard = () => {

  const [documents, setDocuments] = useState([]);
  const [selectedocument, setSelectedDocument] = useState(null);
  
  useEffect(() => {

    const fetchDocuments = async () => {
      try {
        const docs = await getDocuments();
        console.log("Documents from backend: ", docs);

        setDocuments(docs);

    } catch(error) {
      console.error(error);
    }
  };

    fetchDocuments();

}, []);
  return (
    
      
      <div className="flex">
        <Sidebar
        documents = {documents}
        selectedocument = {selectedocument}
        setSelectedDocument = {setSelectedDocument}
        />
        
      
        <div className="flex-1">
          <Mainbar selectedocument={selectedocument}/>
          <Copilot/>
        </div>
        
        
    </div>
  );
};
export default Dashboard;