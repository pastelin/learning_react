import { authReducer } from '../../../src/auth/context/authReducer';

describe('Pruebas en authReducer', () => {
	const initialState = {
		logged: false,
		user: undefined,
	};

	test('debe de retornar el estado por defecto', () => {
		const newState = authReducer(initialState, {});

		expect(newState).toBe(initialState);
	});

	test('debe de (login) llamar el login autenticar y establecer el user', () => {
		const user = { id: 'ABC', name: 'Juan' };
		const action = { type: '[Auth] Login', payload: user };

		const newState = authReducer(initialState, action);

		expect(newState.logged).toBeTruthy();
		expect(newState.user).toEqual(user);
	});

	test('debe de (logout) borrar el nombre del usuario y logged en false', () => {
        const state = {
            logged: true,
            user: {id: 123, name: 'Juan'}
        }
        const action = {
            type: '[Auth] Logout',
        };

        const newState = authReducer(state, action);
        
        expect(newState).toEqual({ logged: false });
    });
});
