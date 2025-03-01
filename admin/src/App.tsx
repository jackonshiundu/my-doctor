import { useContext } from "react";
import Login from "./pages/Login";
import { AdminContext } from "./context/AdminContext";

const App = () => {
  const { aToken } = useContext(AdminContext);
  console.log(aToken);

  return !aToken ? (
    <div className="">
      <Login />
    </div>
  ) : (
    <>hello</>
  );
};

export default App;
