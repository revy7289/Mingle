/* eslint-disable react-refresh/only-export-components */
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";

type DndContextType = [string | null, Dispatch<SetStateAction<string | null>>];

const DnDContext = createContext<DndContextType>([null, () => {}]);

export const useDnD = () => {
  return useContext(DnDContext);
};

export const DnDProvider = ({ children }: { children: ReactNode }) => {
  const [type, setType] = useState<string | null>(null);

  return <DnDContext.Provider value={[type, setType]}>{children}</DnDContext.Provider>;
};
