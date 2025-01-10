import { createContext, useContext, useState } from "react";

const DnDContext = createContext([null, (_) => {}]);

export const useDnD = () => {
  return useContext(DnDContext);
};

export const DnDProvider = ({ children }) => {
  const [type, setType] = useState(null);

  return <DnDContext.Provider value={[type, setType]}>{children}</DnDContext.Provider>;
};

export default DnDContext;
