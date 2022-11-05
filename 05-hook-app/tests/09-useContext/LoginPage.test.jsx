import { fireEvent, render, screen } from '@testing-library/react';
import { useContext } from 'react';
import { UserContext } from '../../src/09-useContext/context/userContext';
import { LoginPage } from '../../src/09-useContext/LoginPage';

describe('Pruebas en <LoginPage />', () => {

    test('debe de mostrar el componente sin el usuario', () => {
        // Renderiza un router y asigna valor de user en nulo para el componente LoginPage
        render(
            <UserContext.Provider value={ {user: null} }>
                <LoginPage />
            </UserContext.Provider>
        )

        // Obtiene la referencia del tag <pre> definido en el componente con aria-label="pre"
        const preTag = screen.getByLabelText('pre');

        // Valida que el contenido de preTag sea nulo
        expect(preTag.innerHTML).toBe("null");

    });

    test('Debe de llamar el setUser cuando de hace click en el boton', () => {
        
        const setUserMock = jest.fn();

        render(
            <UserContext.Provider value={ {user: null, setUser: setUserMock} }>
                <LoginPage />
            </UserContext.Provider>
        )

        // Obtiene referencia del boton
        const buttonTag = screen.getByRole('button', {name: 'Establecer usuario'});
        fireEvent.click(buttonTag);

        expect( setUserMock ).toHaveBeenCalledWith({"email": "pedro@gmail.com", "id": 1234, "name": "Pedro"});

    });
});