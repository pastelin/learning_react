import {
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	getAuth,
	signInWithEmailAndPassword,
	signInWithPopup,
	updateProfile,
} from 'firebase/auth';
import { FirebaseAuth } from './config';

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
	try {
		const result = await signInWithPopup(FirebaseAuth, googleProvider);
		// const credentials = GoogleAuthProvider.credentialFromResult(result);
		const { displayName, email, photoURL, uid } = result.user;

		return {
			ok: true,
			// User info
			displayName,
			email,
			photoURL,
			uid,
		};
	} catch (error) {
		const errorCode = error.code;
		const errorMessage = error.message;

		return {
			ok: false,
			errorMessage,
			errorCode,
		};
	}
};

export const registerUserWithEmailPassword = async ({ email, password, displayName }) => {
	try {
		// Enviar el servicio que valida las credenciales pasada por parametros
		const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
		const { uid, photoURL } = resp.user;

		// Actualiza el displayName del usuario creado en firebase
		await updateProfile(FirebaseAuth.currentUser, { displayName });

		return {
			ok: true,
			uid,
			photoURL,
			email,
			displayName,
		};
	} catch (error) {
		return {
			ok: false,
			errorMessage: error.message,
		};
	}
};

export const loginWithEmailPassword = async ({ email, password }) => {
	try {
		// Servicio que valida las credenciales en firebase
		const resp = await signInWithEmailAndPassword(FirebaseAuth, email, password);
		const { uid, photoURL, displayName } = resp.user;
		// const {currentUser} = getAuth();

		return {
			ok: true,
			uid,
			photoURL,
			displayName,
		};
	} catch (error) {
		return {
			ok: false,
			errorMessage: error.message,
		};
	}
};

export const logoutFirebase = async () => {
    // Servicio encargado de cerrar el login de cualquier red social
    return await FirebaseAuth.signOut();
}
