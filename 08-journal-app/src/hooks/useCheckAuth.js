import { onAuthStateChanged } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { FirebaseAuth } from '../firebase/config';
import { login, logout } from '../store/auth';
import { useEffect } from 'react';
import { startLoadingNotes } from '../store/journal';

export const useCheckAuth = () => {
	// A hook to access the redux store's state
	const { status } = useSelector((state) => state.auth);

	// A hook to access the redux dispatch function.
	const dispatch = useDispatch();

	// Hook que ejecuta las funciones dentro de esta al renderizar el componente
	useEffect(() => {
		// Adds an observer for changes to the user's sign-in state.
		onAuthStateChanged(FirebaseAuth, async (user) => {
			if (!user) return dispatch(logout());

			const { uid, email, displayName, photoURL } = user;
            dispatch(login({ uid, email, displayName, photoURL }));
            dispatch(startLoadingNotes());
		});
    }, []);
    
    return {
        status
    }
}