import { create } from "zustand";

interface IUsedTokenStore {
  accessToken: string;
  setAccessToken: (newAccessToken: string | undefined) => void;
  resetAccessToken: () => void;
}

export const useAccessTokenStore = create<IUsedTokenStore>((set) => ({
  accessToken: "",
  setAccessToken: (newAccessToken) => set(() => ({ accessToken: newAccessToken })),
  resetAccessToken: () => set(() => ({ accessToken: "" })),
}));
