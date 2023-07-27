import { authSlice, checkingCredentials, login, logout } from '../../../src/store/auth/authSlice';
import { authenticatedState, demoUser, initialState } from '../../fixtures/authFixtures';

describe('Pruebas en el authSlice', () => {
    test('debe de regresar el estado inicial y llamarse "auth', () => {
        
        // Obtiene el estado del Slice pasando como argumentos el estado inicial y el reducer a llamar
		const state = authSlice.reducer(initialState, {});

		expect(state).toEqual(initialState);
		expect(authSlice.name).toBe('auth');
	});

	test('debe de realizar la autenticacion', () => {
		// El objetivo de reducer es crear un nuevo estado
		const state = authSlice.reducer(initialState, login(demoUser));

		expect(state).toEqual({
			status: 'authenticated', //'checking', 'not-authenticated', 'authenticated'
			uid: demoUser.uid,
			email: demoUser.email,
			displayName: demoUser.displayName,
			photoURL: demoUser.photoURL,
			errorMessage: null,
		});
	});

	test('debe de realizar el logout sin argumentos', () => {
		const state = authSlice.reducer(authenticatedState, logout());
		expect(state).toEqual({
			status: 'not-authenticated', //'checking', 'not-authenticated', 'authenticated'
			uid: null,
			email: null,
			displayName: null,
			photoURL: null,
			errorMessage: undefined,
		});
	});

	test('debe de realizar el logout y mostrar un mensaje de error', () => {
		const errorMessage = 'Credenciales no son correctas';
		const state = authSlice.reducer(authenticatedState, logout({ errorMessage }));

		expect(state).toEqual({
			status: 'not-authenticated',
			uid: null,
			email: null,
			displayName: null,
			photoURL: null,
			errorMessage,
		});
    });
    
    test('debe de cambiar el estado a checking', () => {

        const state = authSlice.reducer(authenticatedState, checkingCredentials());
        expect(state.status).toBe('checking');

    })
});
