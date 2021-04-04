import React, { useState, createContext } from "react";

export const AppContext = createContext();

export const ContextProvider = (props) => {
  const [isSideBarOpen, setSideBarOpen] = useState(false);

  return (
    <AppContext.Provider
      value={{
        isSideBarOpen,
        setSideBarOpen,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
