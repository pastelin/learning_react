
import { AddCategory } from '../../src/components/AddCategory';
import { fireEvent, render, screen } from '@testing-library/react';

describe('Pruebas en <AddCategory />', () => {
    
    test('debe de cambiar el valor de la caja de texto', () => {
        
        // crea el sujeto de pruebas
        render(<AddCategory onNewCategory={ () => {} } />)

        // se extrae el input
        const input = screen.getByRole('textbox');

        // disparamos el evento
        fireEvent.input( input, { target: { value: 'Saitama' } });

        expect( input.value ).toBe('Saitama');
    });

    test('debe de llamar onNewCategory si el input tiene un valor', () => {
        
        const inputValue = 'Saitama';
        const onNewCategory = jest.fn();

        render( <AddCategory onNewCategory={ onNewCategory } /> );
        const input = screen.getByRole('textbox');
        const form = screen.getByRole('form');

        fireEvent.input( input, { target: { value: inputValue } } );
        fireEvent.submit( form );
        // screen.debug();

        // input siempre tiene el ultimo valor despues de los eventos
        expect( input.value ).toBe('');
        
        expect( onNewCategory ).toHaveBeenCalled();
        expect( onNewCategory ).toHaveBeenCalledTimes(1);
        expect( onNewCategory ).toHaveBeenCalledWith( inputValue );

    });

    test('no debe de llamar el onNewCategory si el input esta vacio', () => {
        
        const onNewCategory = jest.fn();

        render( <AddCategory onNewCategory={ onNewCategory } /> );
        const form = screen.getByRole('form');

        fireEvent.submit( form );
        // screen.debug();

        expect( onNewCategory ).toHaveBeenCalledTimes(0);
        expect( onNewCategory ).not.toHaveBeenCalled();
    });

});