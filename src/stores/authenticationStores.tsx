import { create } from 'zustand';

export interface IAuthentication {
    isLogged: boolean;
    setIsLogged: (isLogged: boolean) => void;
}

const useAuthenticationStores = create<IAuthentication>()((set) => ({
    isLogged: true,
    setIsLogged: (logged) => set(() => ({ isLogged: logged })),
}));

export default useAuthenticationStores;
