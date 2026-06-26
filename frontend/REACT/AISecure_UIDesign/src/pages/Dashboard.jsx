import Sidebar from "../components/Sidebar";
import Copilot from "../components/Copilot";
import Mainbar from "../components/Mainbar";


const Dashboard = () => {
  return (
    
      <div className="flex">
        <Sidebar/>

      <div className="flex-1">
        <Mainbar/>

      <div className="flex">
        <Copilot/>
      </div>
      </div>
      </div>

    
  );
}
export default Dashboard;