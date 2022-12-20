import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { SearchPage } from '../../../src/heroes/pages/SearchPage';

const mockedUseNavigate = jest.fn();

// Mock parcial de la libreria react-router-dom
jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useNavigate: () => mockedUseNavigate,
}));

describe('Pruebas en <SearchPage />', () => {
    
    beforeEach(() => jest.clearAllMocks() );

    test('debe de mostrarse correctamente con valores por defecto', () => {
        
        const { container } =  render(
            <MemoryRouter>
                <SearchPage />
            </MemoryRouter>
        );

        expect(container).toMatchSnapshot();
    });

    test('debe de mostrar a Batman y en input con el valor del queryString', () => {
		render(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                {/* No se utliza AuthContext.Provider debido a que el componente <SearchPage /> no usa useContext() */}
				<SearchPage />
			</MemoryRouter>
		);

        // Obtiene la referencia del input que se encuentra dentro del tag form
        const input = screen.getByRole('textbox');
        expect(input.value).toBe('batman');

        const img = screen.getByRole('img');
        expect(img.src).toContain('/assets/heroes/dc-batman.jpg');

        // Obtiene la referencia del tag div que contiene la propiedad "aria-label" con el valor "alert-no-hero"
        const divAlertNoHero = screen.getByLabelText('alert-no-hero');
        expect(divAlertNoHero.style.cssText).toBe('display: none;');
    });
    
    test('debe de mostrar un error si no se encuentra el hero', () => {
        render(
            <MemoryRouter initialEntries={['/search?q=goku']}>
                <SearchPage />
            </MemoryRouter>
        );

        const divShowHero = screen.getByLabelText('show-hero');
        expect(divShowHero.style.display).toBe("none")
    });

    test('debe de llamar el navigate a la pantalla nueva', () => {
        
        render(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <SearchPage />
            </MemoryRouter>
        );

        // Obtiene la referencia de elemento input y form
        const input = screen.getByRole("textbox");
        // en el tag <form> se le asigno la propiedad aria-label="form"
        const form = screen.getByRole("form");

        // Evento que asigna el valor indicado al input
        // fireEvent.input(input, { target: { value: 'superman' } });
        fireEvent.change(input, { target: { value: 'superman' } });
        // Evento que simula el envio del formulario para ser procesado
        fireEvent.submit(form);

        expect(mockedUseNavigate).toHaveBeenCalledWith('?q=superman');
    });

});