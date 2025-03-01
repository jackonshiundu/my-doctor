import { createContext } from "react";

type AppcontextType = {
  aToken: string;
};

const AppcontextDefaultValue = {
  aToken: "",
};
export const AppContext = createContext<AppcontextType>(AppcontextDefaultValue);

const AppContextProvider = (props: any) => {
  const value = { aToken };
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
