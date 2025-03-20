import { createContext, useState } from "react";

interface DoctorContext {
  backendUrl: string;
  dToken: string | null;
  setDToken: (aToken: string | null) => void;
}
const initialDoctorContext = {
  backendUrl: "",
  dToken: "",
  setDToken: () => {},
};
export const DoctorContext = createContext<DoctorContext>(initialDoctorContext);

const DoctorContextProvider = (props: any) => {
  const [dToken, setDToken] = useState(
    localStorage.getItem("dToken") ? localStorage.getItem("dToken") : ""
  );
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const value = { backendUrl, dToken, setDToken };
  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
