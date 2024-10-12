import { create } from 'zustand';

export interface ICommon {
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
    isExpandMenu: boolean | undefined;
    setIsExpandMenu: (isValue: boolean) => void;
    currentIndex: number;
    setCurrentIndex: (index: number) => void;
}

const useCommonStores = create<ICommon>()((set) => ({
    isLoading: true,
    setIsLoading: (loading) => set(() => ({ isLoading: loading })),
    isExpandMenu: undefined,
    setIsExpandMenu: (isValue) => set(() => ({ isExpandMenu: isValue })),
    currentIndex: 0,
    setCurrentIndex: (index) => set(() => ({ currentIndex: index })),
}));

export default useCommonStores;
