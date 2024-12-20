import { create } from "zustand";

interface IUsedTokenStore {
  accessToken: string;
  setAccessToken: (newAccessToken: string | undefined) => void;
}

export const useAccessTokenStore = create<IUsedTokenStore>((set) => ({
  accessToken: "",
  setAccessToken: (newAccessToken) => set(() => ({ accessToken: newAccessToken })),
}));
