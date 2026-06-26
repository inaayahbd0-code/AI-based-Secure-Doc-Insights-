import Sidebar from "../components/Sidebar";
import Copilot from "../components/Copilot";
import Mainbar from "../components/Mainbar";
import React from 'react';


const Dashboard = () => {
  return (
    
      
      <div className="flex">
        <Sidebar/>
        
      
        <div className="flex-1">
          <Mainbar/>
          <Copilot/>
        </div>
        
        
    </div>
  );
};
export default Dashboard;