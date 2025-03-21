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
import { DoctorContext } from "./context/DoctorContext";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import DoctorAppintment from "./pages/doctor/DoctorAppintment";
import DoctorProfile from "./pages/doctor/DoctorProfile";

const App = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  // Determine the user's role based on the presence of tokens
  const isAdmin = !!aToken;
  const isDoctor = !!dToken;

  // If neither admin nor doctor is logged in, show the login page
  if (!isAdmin && !isDoctor) {
    return (
      <div className="">
        <Login />
      </div>
    );
  }

  return (
    <div className="bg-gray-100">
      <Navbar />
      <div className="flex items-start">
        <Sidebar />
        <Routes>
          {/*           Admin Routes
           */}
          {isAdmin && (
            <>
              <Route path="/admin-dashboard" element={<Dashboard />} />
              <Route path="/all-appointments" element={<AllAppointments />} />
              <Route path="/add-doctor" element={<AddDoctor />} />
              <Route path="/doctor-list" element={<DoctorsList />} />
            </>
          )}
          {isDoctor && (
            <>
              {/* Doctor's Routes */}
              <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
              <Route
                path="/doctor-appointments"
                element={<DoctorAppintment />}
              />
              <Route path="/doctor-profile" element={<DoctorProfile />} />
            </>
          )}
          <Route path="/" element={<></>} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
