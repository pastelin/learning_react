import { fireEvent, render, screen } from '@testing-library/react';
import { MultipleCustomHooks } from '../../src/03-examples';
import { useCounter } from '../../src/hooks/useCounter';
import { useFetch } from '../../src/hooks/useFetch';

// crea mock del path especificado para poder hacer uso de mockReturnValue
jest.mock('../../src/hooks/useFetch');
jest.mock('../../src/hooks/useCounter');

describe('Pruebas en <MultipleCustomHooks />', () => {

    // definicion de mock para simular una funcion
    const mockIncrement = jest.fn();
    // el mock useCounter sera compartido a cada test() debido a que se esta definiendo dentro de describe()
    useCounter.mockReturnValue({
        counter: 1,
        increment: mockIncrement
    });

    // funcion que se llama antes de que se ejecute cada test()
    // se encarga de limpiar cada una de las pruebas antes de iniciar para mantener el estado inicial
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('debe de mostrar el componente por defecto', () => {

        // define el estado de useFetch del componente por defecto
        useFetch.mockReturnValue({
            data: null,
            isLoading: true,
            hasError: null,
        });

        // renderiza un componente
        render( <MultipleCustomHooks /> );

        // screen se habilida despues de ejecutar la renderizacion del componente
        // screen mantiene la referencia de componente renderizado
        // screen.getByText(...), regresa un booleano donde true indica que si hubo coincidencia con la cadena ingresada
        expect( screen.getByText('Loading...') );
        expect( screen.getByText('BreakingBad Quotes') );

        // screen.getByRole() : obtiene la referencai del boton que contenga el valor de la propiedad name indicada
        const nextButton = screen.getByRole('button', {name: 'Next quote'});
        // valida que el boton se encuentre desabilitado
        expect(nextButton.disabled).toBeTruthy();
    });

    test('debe de mostrar un Quote', () => {
        
        useFetch.mockReturnValue({
            data: [{author: 'Juan', quote: 'Hola Mundo'}],
            isLoading: false,
            hasError: null,
        });

        render( <MultipleCustomHooks /> );
        expect( screen.getByText('Hola Mundo') ).toBeTruthy();
        expect( screen.getByText('Juan') ).toBeTruthy();

        const nextButton = screen.getByRole('button', {name: 'Next quote'});
        expect(nextButton.disabled).toBeFalsy();

    });

    test('debe llamar la funcion de incrementar', () => {
        
        useFetch.mockReturnValue({
            data: [{author: 'Juan', quote: 'Hola Mundo'}],
            isLoading: false,
            hasError: null,
        });

        render( <MultipleCustomHooks /> );
        const nextButton = screen.getByRole('button', {name: 'Next quote'});

        // fireEvent.click() : funcion que simula el evento click del elemento indicado
        fireEvent.click( nextButton );

        // valida que mockIncrement se haya llamado a traves de la referencia increment
        expect(mockIncrement).toHaveBeenCalled(); 
    });

});