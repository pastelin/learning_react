import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { LoginPage } from '../../../src/auth/pages/LoginPage';
import { configureStore } from '@reduxjs/toolkit';
import { authSlice, startGoogleSignIn } from '../../../src/store/auth';
import { Memory } from '@mui/icons-material';
import { MemoryRouter } from 'react-router-dom';
import { notAuthenticatedState } from '../../fixtures/authFixtures';

// Es importante que inicie con mock
// Se utiliza como referencia de las llamadas realizadas al mock
const mockStartGoogleSignIn = jest.fn();
const mockStartLoginWithEmailPassword = jest.fn();

// El primer parametro indica la ruta a la que se realizara el mock
// El segundo parametro indica el mock de la funcion
jest.mock('../../../src/store/auth/thunks', () => ({
	startGoogleSignIn: () => mockStartGoogleSignIn,
	startLoginWithEmailPassword: ({ email, password }) => {
		return () => mockStartLoginWithEmailPassword({ email, password });
	},
}));

// Se sobre escribe el comportamiento de useDispatch
jest.mock('react-redux', () => ({
	...jest.requireActual('react-redux'),
	useDispatch: () => (fn) => fn(),
}));

// Se debe proporcionar el reducer que ocupa
const store = configureStore({
	reducer: {
		auth: authSlice.reducer,
	},
	// Se utiliza para precargar el estado de un objeto
	preloadedState: {
		auth: notAuthenticatedState,
	},
});

describe('Pruebas en el <LoginPage/>', () => {
	beforeEach(() => jest.clearAllMocks());

	test('debe mostrar el componente correctamente', () => {
		render(
			// Se utiliza Provider para poder acceder al store, si no se coloca da error
			// Se debe proporcionar el valor para el store
			<Provider store={store}>
				{/* Proporciona toda la informacion que se require para que se renderice el componente en memoria */}
				<MemoryRouter>
					<LoginPage />
				</MemoryRouter>
			</Provider>
		);

		expect(screen.getAllByText('Login').length).toBeGreaterThanOrEqual(1);
	});

	test('boton de google debe de llamar el startGoogleSignIn', () => {
		render(
			<Provider store={store}>
				<MemoryRouter>
					<LoginPage />
				</MemoryRouter>
			</Provider>
		);

		// Busca la referencia del elemento dentro de LoginPage con el valor de google-btn en la propiedad de aria-label
		const googleBtn = screen.getByLabelText('google-btn');
		fireEvent.click(googleBtn);

		expect(mockStartGoogleSignIn).toHaveBeenCalled();
	});

	test('submit debe llamar startLoginWithEmailPassword', () => {
		const email = 'juan@google.com';
		const password = '123456';

		render(
			<Provider store={store}>
				<MemoryRouter>
					<LoginPage />
				</MemoryRouter>
			</Provider>
		);

		// Guarda la referencia del elemento TextField con el Label = "Correo"
		const emailField = screen.getByRole('textbox', { name: 'Correo' });
		fireEvent.change(emailField, { target: { name: 'email', value: email } });

		// Obtiene la referencia del elemento usando inputProps={{testId: password}} en LoginPage
		const passwordField = screen.getByTestId('password');
		fireEvent.change(passwordField, { target: { name: 'password', value: password } });

		const loginForm = screen.getByLabelText('submit-form');
		fireEvent.submit(loginForm);

		expect(mockStartLoginWithEmailPassword).toHaveBeenCalledWith({ email, password });
	});
});
