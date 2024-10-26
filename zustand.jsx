import { create } from "zustand";

const useStore = create((set) => ({
    actualizador: false,
    setActualizador: () => set((state) => ({ actualizador: !state.actualizador })),
}));

export default useStore;
