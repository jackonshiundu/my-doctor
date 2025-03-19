import { createContext } from "react";

type AppcontextType = {
  currencySymbol: string;
};

const AppcontextDefaultValue = {
  currencySymbol: "Ksh.",
};
export const AppContext = createContext<AppcontextType>(AppcontextDefaultValue);

type AppContextProviderProps = {
  children: React.ReactNode;
};

const AppContextProvider = (props: AppContextProviderProps) => {
  const currencySymbol = "Ksh.";
  const value = { currencySymbol };
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
