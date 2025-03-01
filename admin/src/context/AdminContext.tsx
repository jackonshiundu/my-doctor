import { createContext, useState } from "react";

type AdminContextType = {
  aToken: String | null;
  setAToken: (token: string | null) => void;
  backendUrl: String;
};
const initialAdminContet = {
  aToken: "",
  setAToken: () => {},
  backendUrl: "",
};
export const AdminContext = createContext<AdminContextType>(initialAdminContet);

const AdminContextProvider = (props: any) => {
  const [aToken, setAToken] = useState(
    localStorage.getItem("aToken") ? localStorage.getItem("aToken") : ""
  );
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const value = {
    aToken,
    setAToken,
    backendUrl,
  };
  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
