import { useContext } from "react";
import Login from "./pages/Login";
import { AdminContext } from "./context/AdminContext";
import Navbar from "./componentss/Navbar";

const App = () => {
  const { aToken } = useContext(AdminContext);

  return !aToken ? (
    <div className="">
      <Login />
    </div>
  ) : (
    <div className="bg-gray-100">
      <Navbar />
    </div>
  );
};

export default App;
