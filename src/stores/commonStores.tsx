import { create } from 'zustand';

export interface ICommon {
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
    isExpandMenu: boolean | undefined;
    setIsExpandMenu: (isValue: boolean) => void;
    currentIndex: number;
    setCurrentIndex: (index: number) => void;
    routerTimeoutId: any | null;
    setRouterTimeoutId: (timeoutId: any) => void;
    isClipPath: boolean;
    setIsClipPath: (isValue: boolean) => void;
}

const useCommonStores = create<ICommon>()((set) => ({
    isLoading: true,
    setIsLoading: (loading) => set(() => ({ isLoading: loading })),
    isExpandMenu: undefined,
    setIsExpandMenu: (isValue) => set(() => ({ isExpandMenu: isValue })),
    currentIndex: 0,
    setCurrentIndex: (index) => set(() => ({ currentIndex: index })),
    routerTimeoutId: null,
    setRouterTimeoutId: (timeoutId) => set(() => ({ routerTimeoutId: timeoutId })),
    isClipPath: true,
    setIsClipPath: (isValue) => set(() => ({ isClipPath: isValue })),
}));

export default useCommonStores;
