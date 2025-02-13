import { createContext } from "react";
import { Doctor, doctors } from "../assets/assets";

type AppContectType = {
  doctors: Doctor[];
};
const defaultContextValue: AppContectType = {
  doctors: [],
};
export const AppContext = createContext<AppContectType>(defaultContextValue);

const AppContextProvider = (props: any) => {
  const value = {
    doctors,
  };
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
