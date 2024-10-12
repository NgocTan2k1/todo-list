import React, { useEffect, useState } from 'react';

// firebase
import { firebaseApp } from '../../firebase';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

// The components
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';

// The customized components
import BaseNewPage from '../../components/layout/BasePage';
import ForgotPassword from './ForgotPassword';
import BaseModal from '../../components/modal/BaseModal';

// CSS
import { styled } from '@mui/material/styles';

// The stores
import useAuthenticationStores from '../../stores/authenticationStores';
import useCommonStores from '../../stores/commonStores';

// The customized hooks
import { useHandleNavigation } from '../../hooks/useHandleNavigation';

// The constants

export const loaderSignInPage = async (): Promise<string> => {
    return 'string';
};

const Card = styled(MuiCard)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: 'auto',
    [theme.breakpoints.up('sm')]: {
        maxWidth: '450px',
    },
    boxShadow: 'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
    ...theme.applyStyles('dark', {
        boxShadow: 'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
    }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
    padding: 20,
    margin: 'auto',
    '&::before': {
        content: '""',
        display: 'block',
        position: 'absolute',
        zIndex: -1,
        inset: 0,
        backgroundImage: 'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
        backgroundRepeat: 'no-repeat',
        ...theme.applyStyles('dark', {
            backgroundImage: 'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
        }),
    },
}));

const SignIn: React.FC = () => {
    // The hooks were customized
    const handleNavigation = useHandleNavigation();

    // stores
    // authentication stores
    const setUserCredential = useAuthenticationStores((state) => state.setUserCredential);
    const setIsLogged = useAuthenticationStores((state) => state.setIsLogged);
    // common stores
    const setIsLoading = useCommonStores((state) => state.setIsLoading);

    // states
    const [emailError, setEmailError] = useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    const [isForgotPasswordModal, setIsForgotPasswordModal] = useState(false);
    const [isNoticeModal, setIsNoticeModal] = useState(true);

    // effects
    useEffect(() => {
        setIsLoading(false);
    }, []);

    /**
     * function to submit form
     * @param event : FormEvent.
     */
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (isForgotPasswordModal) return;

        // start loading
        setIsLoading(true);

        const data = new FormData(event.currentTarget);
        const email = String(data.get('email'));
        const password = String(data.get('password'));
        const isRemember = String(data.get('remember'));

        // save the user infomation when sign in
        if (isRemember === 'on') {
            console.log('save the information when sign in again');
            // document.cookie = `email=${email}; password=${password}; Secure; HttpOnly; SameSite=Strict; path=/;`;
            document.cookie = `email=${email}; password=${password}; path=/sign-in;`;
        }

        if (email && password) {
            try {
                const auth = getAuth(firebaseApp);

                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                setUserCredential(userCredential);
                setIsLogged(true);

                handleNavigation('/home');

                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
                switch (error.code) {
                    case 'auth/invalid-credential':
                        setEmailError(true);
                        setPasswordError(true);
                        setEmailErrorMessage('Please check your email address!');
                        setPasswordErrorMessage('Please check your password!');
                        break;
                    case 'app/no-app':
                        setIsNoticeModal(true);
                        break;
                    case 'auth/user-disabled':
                        setEmailError(true);
                        setEmailErrorMessage('Your account is locked! Please contact admin...');
                        break;
                    default:
                        setEmailError(true);
                        setPasswordError(true);
                        setEmailErrorMessage('The system is experiencing an error, please try again later.');
                        setPasswordErrorMessage('The system is experiencing an error, please try again later.');
                        // ===== TODO =====
                        // send mail for admin
                        // === END TODO ===
                        break;
                }
            }
        }

        // end loading
        setIsLoading(false);
    };

    /**
     * function check validate form
     * @returns
     */
    const validateInputs = () => {
        const email = document.getElementById('email') as HTMLInputElement;
        const password = document.getElementById('password') as HTMLInputElement;

        let isValid = true;

        if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
            setEmailError(true);
            setEmailErrorMessage('Please enter your email address!');
            isValid = false;
        } else {
            setEmailError(false);
            setEmailErrorMessage('');
        }

        if (!password.value) {
            setPasswordError(true);
            setPasswordErrorMessage('Please enter your password!');
            isValid = false;
        } else {
            setPasswordError(false);
            setPasswordErrorMessage('');
        }

        return isValid;
    };

    /**
     * function open the forgot password modal
     */
    const handleOpenForgotPasswordModal: () => void = () => {
        setIsForgotPasswordModal(true);
    };

    /**
     * function close the forgot password modal
     */
    const handleCloseForgotPasswordModal: () => void = () => {
        setIsForgotPasswordModal(false);
    };

    return (
        <BaseNewPage>
            <BaseModal
                isOpen={isNoticeModal}
                setIsOpen={() => setIsNoticeModal(false)}
                tailwindCSSChildren="rounded px-4 py-2 flex flex-col gap-2"
            >
                <h1 className="text-lg">Error</h1>
                <h2>Can&apos;t connect to Firebase, Please try again!</h2>
            </BaseModal>
            <CssBaseline enableColorScheme />
            <SignInContainer className="mt-0 h-full" direction="column" justifyContent="space-between">
                <Card variant="outlined">
                    <Typography
                        component="h1"
                        variant="h4"
                        sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)', textAlign: 'center' }}
                    >
                        Sign in
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '100%',
                            gap: 2,
                        }}
                    >
                        <FormControl>
                            <FormLabel htmlFor="email">Email</FormLabel>
                            <TextField
                                error={emailError}
                                helperText={emailErrorMessage}
                                id="email"
                                type="email"
                                name="email"
                                placeholder="your@email.com"
                                autoComplete="email"
                                autoFocus
                                required
                                fullWidth
                                variant="outlined"
                                color={emailError ? 'error' : 'primary'}
                                sx={{ ariaLabel: 'email' }}
                            />
                        </FormControl>
                        <FormControl>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <FormLabel htmlFor="password">Password</FormLabel>
                                <Link
                                    component="button"
                                    type="button"
                                    onClick={handleOpenForgotPasswordModal}
                                    variant="body2"
                                    sx={{ alignSelf: 'baseline' }}
                                >
                                    Forgot your password?
                                </Link>
                            </Box>
                            <TextField
                                error={passwordError}
                                helperText={passwordErrorMessage}
                                name="password"
                                placeholder="••••••"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                autoFocus
                                required
                                fullWidth
                                variant="outlined"
                                color={passwordError ? 'error' : 'primary'}
                            />
                        </FormControl>
                        <FormControlLabel control={<Checkbox name="remember" color="primary" />} label="Remember me" />
                        <ForgotPassword open={isForgotPasswordModal} handleClose={handleCloseForgotPasswordModal} />
                        <Button type="submit" fullWidth variant="contained" onClick={validateInputs}>
                            Sign in
                        </Button>
                        <Typography sx={{ textAlign: 'center' }}>
                            Don&apos;t have an account?{' '}
                            <span>
                                <Link
                                    className="cursor-pointer"
                                    variant="body2"
                                    sx={{ alignSelf: 'center' }}
                                    type="button"
                                    onClick={() => handleNavigation('/sign-up')}
                                >
                                    Sign up
                                </Link>
                            </span>
                        </Typography>
                    </Box>
                </Card>
            </SignInContainer>
        </BaseNewPage>
    );
};

export default SignIn;
