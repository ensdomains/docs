'use client';
import { createContext, useContext } from 'react';
import { create } from 'zustand';

export const IsInsideMobileNavigationContext = createContext(false);

export const useIsInsideMobileNavigation = () =>
    useContext(IsInsideMobileNavigationContext);

export const useMobileNavigationStore = create<{
    isOpen: boolean;
    open: () => void;
    close: () => void;
    toggle: () => void;

    navStack: number[];
    pushNav: (index: number) => void;
    popNav: () => void;
    setNav: (navStack: number[]) => void;
}>((set) => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
    toggle: () => set((state) => ({ isOpen: !state.isOpen })),

    navStack: [],
    pushNav: (index) =>
        set((state) => ({ navStack: [...state.navStack, index] })),
    popNav: () => set((state) => ({ navStack: state.navStack.slice(0, -1) })),
    setNav: (navStack) => set({ navStack }),
}));
