
import { createContext, useContext, useState } from "react";

// Step 1: Create a React context
const DataContext = createContext();

// Step 2: Create a custom hook for accessing the context
export function useDataContext() {
  return useContext(DataContext);
}

// Step 3: Create a DataProvider component
export function DataProvider({ children }) {
  // Step 4: Manage state using useState hook
  const [attributesDictionary, setAttributesDictionary] = useState({});

  // Step 5: Create a function to update the state
  const updateAttributesDictionary = (newDictionary) => {
    setAttributesDictionary(newDictionary);
  };

  // Step 6: Define the context value
  const value = {
    attributesDictionary,
    updateAttributesDictionary,
  };

  // Step 7: Use the context provider to wrap components
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}