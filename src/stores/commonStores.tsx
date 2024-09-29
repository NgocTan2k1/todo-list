import { create } from 'zustand';

export interface ICommon {
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
}

const useCommonStores = create<ICommon>()((set) => ({
    isLoading: true,
    setIsLoading: (loading) => set(() => ({ isLoading: loading })),
}));

export default useCommonStores;
