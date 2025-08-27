import { UserCredential } from 'firebase/auth';
import { create } from 'zustand';
import { User } from '../types/User';

export interface IAuthentication {
    isLogged: boolean;
    setIsLogged: (isLogged: boolean) => void;
    isLoadingUser: boolean;
    setIsLoadingUser: (isLogged: boolean) => void;
    userCredential: UserCredential | undefined;
    setUserCredential: (userCredential: UserCredential) => void;
    userInformation: User | undefined;
    setUserInformation: (user: User | undefined) => void;
    resetAuthentication: () => void;
}

const useAuthenticationStores = create<IAuthentication>()((set) => ({
    isLogged: false,
    setIsLogged: (logged) => set(() => ({ isLogged: logged })),
    isLoadingUser: false,
    setIsLoadingUser: (loading) => set(() => ({ isLoadingUser: loading })),
    userCredential: undefined,
    setUserCredential: (userCredential) => set(() => ({ userCredential: userCredential })),
    userInformation: undefined,
    setUserInformation: (user) => set(() => ({ userInformation: user })),
    resetAuthentication: () => set(() => ({ isLogged: false, userInformation: undefined })),
}));

export default useAuthenticationStores;
