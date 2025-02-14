import { createContext } from "react";
import { Doctor, doctors } from "../assets/assets";

type AppContectType = {
  doctors: Doctor[];
  currencySymbol: string;
};
const defaultContextValue: AppContectType = {
  doctors: [],
  currencySymbol: "",
};
export const AppContext = createContext<AppContectType>(defaultContextValue);

const AppContextProvider = (props: any) => {
  const currencySymbol: string = "Ksh.";
  const value = {
    currencySymbol,
    doctors,
  };
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
