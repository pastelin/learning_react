import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../../src/auth/context/AuthContext';
import { PrivateRoute } from '../../src/heroes/routes/PrivateRoute';

describe('Pruebas en el <PrivateRoute />', () => {
	test('debe de mostrar el children si no está autenticado', () => {
		
        Storage.prototype.setItem = jest.fn();
        
        const contextValue = {
			logged: true,
			user: {
				id: 'abc',
				name: 'Juan Carlos',
			},
		};

		render(
			<AuthContext.Provider value={contextValue}>
				<MemoryRouter initialEntries={['/search?q=batman']}>
					<PrivateRoute>
						<h1>Ruta privada</h1>
					</PrivateRoute>
				</MemoryRouter>
			</AuthContext.Provider>
		);

        expect(screen.getByText('Ruta privada')).toBeTruthy();
        expect(localStorage.setItem).toHaveBeenCalledWith('lastPath', '/search?q=batman');
	});
});
