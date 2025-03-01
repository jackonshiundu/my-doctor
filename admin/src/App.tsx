import { useContext } from "react";
import Login from "./pages/Login";
import { AdminContext } from "./context/AdminContext";
import Navbar from "./componentss/Navbar";
import Sidebar from "./componentss/Sidebar";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/admin/Dashboard";
import AllAppointments from "./pages/admin/Allappointments";
import AddDoctor from "./pages/admin/Adddoctor";
import DoctorsList from "./pages/admin/DoctorsList";

const App = () => {
  const { aToken } = useContext(AdminContext);

  return !aToken ? (
    <div className="">
      <Login />
    </div>
  ) : (
    <div className="bg-gray-100">
      <Navbar />
      <div className="flex items-start">
        <Sidebar />
        <Routes>
          <Route path="/" element={<></>} />
          <Route path="/admin-dashboard" element={<Dashboard />} />
          <Route path="/all-appointments" element={<AllAppointments />} />
          <Route path="/add-doctor" element={<AddDoctor />} />
          <Route path="/doctor-list" element={<DoctorsList />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
