import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../src/auth/context/AuthContext';
import { Navbar } from '../../../src/ui';

const mockedUseNavigate = jest.fn();

/* 
* Mock de un hook externo que reemplaza la funcionalidad propia de useNavigate por la funcion mock
* No se puede usar mockReturnValue porque se tendria que regresar todos los parametros de la libreria
* ...jest.requireActual('react-router-dom') pasa los parametros de todo lo que contenga la libreria
* useNavigate: () => mockedUseNavigate solo reemplaza la funcionalidad de useNavigate
*/

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useNavigate: () => mockedUseNavigate
}));

describe('Pruebas en <Navbar />', () => {
    
    const contextValue = {
		logged: true,
		user: {
			id: 'dasd1',
			name: 'Juan',
        },
        logout: jest.fn(),
    };

    // Se encarga de restaurar al valor inicial antes de iniciar cada test
    beforeEach(() => jest.clearAllMocks());
    
    test('debe mostrar el nombre del usuario', () => {

        render(
			<MemoryRouter initialEntries={['/marvel']}>
				{/*
				 * value={} : envia la informacion que el componente <Navbar /> recibe de la siguiente manera:
				 * const {user, logout} = useContext(AuthContext);
				 */}
				<AuthContext.Provider value={contextValue}>
					<Navbar />
				</AuthContext.Provider>
			</MemoryRouter>
		);

        expect(screen.getByText('Juan')).toBeTruthy();
        
    });

    test('debe de llamar el logout y navigate cuanddo se hace click en el boton', () => {
        
        render(
            <MemoryRouter initialEntries={['/marvel']}>
                <AuthContext.Provider value={contextValue}>
                    <Navbar />
                </AuthContext.Provider>
            </MemoryRouter>
        );

        const buttonTag = screen.getByRole('button', { name: 'Logout' });
        fireEvent.click(buttonTag);

        expect(contextValue.logout).toHaveBeenCalled();
        expect(mockedUseNavigate).toHaveBeenCalledWith('/login', { replace: true });
    });

});