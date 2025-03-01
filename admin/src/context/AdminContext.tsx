import { createContext, useState } from "react";

type AdminContextType = {
  aToken: String;
  setAToken: (token: string) => void;
  backendUrl: String;
};
const initialAdminContet = {
  aToken: "",
  setAToken: () => {},
  backendUrl: "",
};
export const AdminContext = createContext<AdminContextType>(initialAdminContet);

const AdminContextProvider = (props: any) => {
  const [aToken, setAToken] = useState("");
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
