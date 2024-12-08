import { UserCredential } from 'firebase/auth';
import { create } from 'zustand';

export interface IAuthentication {
    isLogged: boolean;
    setIsLogged: (isLogged: boolean) => void;
    isLoadingUser: boolean;
    setIsLoadingUser: (isLogged: boolean) => void;
    userCredential: UserCredential | undefined;
    setUserCredential: (userCredential: UserCredential) => void;
    resetAuthentication: () => void;
}

const useAuthenticationStores = create<IAuthentication>()((set) => ({
    isLogged: false,
    setIsLogged: (logged) => set(() => ({ isLogged: logged })),
    isLoadingUser: false,
    setIsLoadingUser: (loading) => set(() => ({ isLoadingUser: loading })),
    userCredential: undefined,
    setUserCredential: (userCredential) => set(() => ({ userCredential: userCredential })),
    resetAuthentication: () => set(() => ({ isLogged: false, user: undefined })),
}));

export default useAuthenticationStores;
