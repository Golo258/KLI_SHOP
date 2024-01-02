import { createContext, useContext, useState } from "react";

const DataContext = createContext();

export function useDataContext() {
  return useContext(DataContext);
}

export function DataProvider({ children }) {
  const [attributesDictionary, setAttributesDictionary] = useState({});

  const updateAttributesDictionary = (newDictionary) => {
    setAttributesDictionary(newDictionary);
  };

  const value = {
    attributesDictionary,
    updateAttributesDictionary,
  };

  return <DataContext.Provider value={value}> {children}</DataContext.Provider>;
}
