import { createContext, useState } from "react";

export const InputContext = createContext();

export const InputProvider = ({ children }) => {
  const [value, setValue] = useState("");
  const valueChangeHandler = (input) => {
    setValue(input);
  };
  return (
    <InputContext.Provider value={{ value, valueChangeHandler }}>{children}</InputContext.Provider>
  );
};
