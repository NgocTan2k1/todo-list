import { UserCredential } from 'firebase/auth';
import { create } from 'zustand';

export interface IAuthentication {
    isLogged: boolean;
    setIsLogged: (isLogged: boolean) => void;
    userCredential: UserCredential | undefined;
    setUserCredential: (userCredential: UserCredential) => void;
    resetAuthentication: () => void;
}

const useAuthenticationStores = create<IAuthentication>()((set) => ({
    isLogged: false,
    setIsLogged: (logged) => set(() => ({ isLogged: logged })),
    userCredential: undefined,
    setUserCredential: (userCredential) => set(() => ({ userCredential: userCredential })),
    resetAuthentication: () => set(() => ({ isLogged: false, user: undefined })),
}));

export default useAuthenticationStores;
