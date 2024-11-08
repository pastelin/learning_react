import { loginWithEmailPassword, logoutFirebase, signInWithGoogle } from '../../../src/firebase/providers';
import { checkingCredentials, login, logout } from '../../../src/store/auth/authSlice';
import { checkingAuthentication, startGoogleSignIn, startLoginWithEmailPassword, startLogout } from '../../../src/store/auth/thunks';
import { clearNotesLogout } from '../../../src/store/journal';
import { demoUser } from '../../fixtures/authFixtures';

// Mock para simular las llamadas a firebase
jest.mock('../../../src/firebase/providers');

describe('Pruebas en AuthThunks', () => {
	// Crea mock del dispatch a usar
    const dispatch = jest.fn();
    
    // Limpia el mock despues de ser ejecutado
    beforeEach(() => jest.clearAllMocks());

	test('debe de incovar el checkingCredentials', async () => {
		// Primer (): es el llamado de la funcion
		// Segundo (): valor de retorno de esa funcion
		await checkingAuthentication()(dispatch);

		expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    });
 
    test('startGoogleSignIn debe de llamar checkingCredentials y login - Exito', async() => {
		const loginData = { ok: true, ...demoUser };

		// Mock para simular promesas, el retorno de la llamada a signInWithGoogle con un valor definido
        await signInWithGoogle.mockResolvedValue(loginData);
        
        // thunk
        await startGoogleSignIn()(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(login(loginData));

    });
    
    
    test('startGoogleSignIn debe de llamar checkingCredentials y logout - Error', async () => {
		const loginData = { ok: false, errorMessage: 'Un error en Google' };

        await signInWithGoogle.mockResolvedValue(loginData);

        // thunk
        await startGoogleSignIn()(dispatch);

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(logout(loginData.errorMessage) );
		
    });
    
    test('startLoginWithEmailPassword debe de llamar checkingCredentials y ogin - Exito', async() => {

        const loginData = { ok: true, ...demoUser };
        console.log(loginData);
        const formData = { email: demoUser.email, password: '123456' };

        await loginWithEmailPassword.mockResolvedValue(loginData);

        await startLoginWithEmailPassword(formData)(dispatch);

        // expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
        expect(dispatch).toHaveBeenCalledWith(login(loginData)); 

    });

    test('startLogout debe de llamar logoutFirebase, clearNotes y logout', async() => {
        await startLogout()(dispatch);

        expect(logoutFirebase).toHaveBeenCalled();
        expect(dispatch).toHaveBeenCalledWith(clearNotesLogout());
        expect(dispatch).toHaveBeenCalledWith(logout());
    })


});