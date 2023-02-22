import { Password } from '@mui/icons-material';
import { checkingCredentials, login, logout } from './authSlice';
import {
	loginWithEmailPassword,
	logoutFirebase,
	registerUserWithEmailPassword,
	signInWithGoogle,
} from '../../firebase/providers';

// thunks se usa para ejecutar funciones asincronas

export const checkingAuthentication = (email, Password) => {
	return async (dispatch) => {
		// Ejecuta checkingCredentials() definida en authSlice
		dispatch(checkingCredentials());
	};
};

export const startGoogleSignIn = () => {
	return async (dispatch) => {
		dispatch(checkingCredentials());

		const result = await signInWithGoogle();
		if (!result.ok) return dispatch(logout(result.errorMessage));

		dispatch(login(result));
	};
};

export const startCreatingUserWithEmailPassword = ({ email, password, displayName }) => {
	return async (dispatch) => {
		dispatch(checkingCredentials);

		const { ok, uid, photoURL, errorMessage } = await registerUserWithEmailPassword({
			email,
			password,
			displayName,
		});

		if (!ok) return dispatch(logout({ errorMessage }));

		dispatch(login({ uid, displayName, email, photoURL }));
	};
};

export const startLoginWithEmailPassword = ({ email, password }) => {
	return async (dispatch) => {
		dispatch(checkingCredentials);

        const { ok, uid, photoURL, displayName, errorMessage } = await loginWithEmailPassword({ email, password });
        
        if (!ok) return dispatch(logout({ errorMessage }));
        
        dispatch(login({ uid, email, photoURL, displayName }));
	};
};

export const startLogout = () => {
    return async (dispatch) => {
        await logoutFirebase();

        dispatch(logout());
    }
}