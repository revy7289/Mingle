import { create } from "zustand";

type Item = {
  title: string;
  content: string;
};

type AlertState = {
  severity: "success" | "info" | "warning" | "error";
  message: string;
  setAlert: (severity: "success" | "info" | "warning" | "error", message: string) => void;
};

type LibraryStore = {
  inputData: Item[];
  selectedIcon: string;
  setInputData: (data: Item[]) => void;
  setSelectedIcon: (icon: string) => void;
  updateInputData: (index: number, field: keyof Item, value: string) => void;
} & AlertState;

export const useLibraryStore = create<LibraryStore>((set) => ({
  inputData: [],
  selectedIcon: "Icon1",
  setInputData: (data) => set(() => ({ inputData: data })),
  setSelectedIcon: (icon) => set({ selectedIcon: icon }),
  updateInputData: (index, field, value) =>
    set((state) => ({
      inputData: state.inputData.map((item, idx) =>
        idx === index ? { ...item, [field]: value } : item
      ),
    })),
  setAlert: (severity, message) => set(() => ({ severity, message })),
  severity: "info",
  message: "",
}));
