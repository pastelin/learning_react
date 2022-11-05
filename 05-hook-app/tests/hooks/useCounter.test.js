import { act, renderHook } from '@testing-library/react';
import { useCounter } from '../../src/hooks/useCounter';

describe('Pruebas en el useCounter', () => {
    
    test('debe de retornar los valores por defecto', () => {
       
        // Permite renderizar un hook
        // Retorna la informacion de como se encuentra el hook al momento de ser llamado
        const { result } = renderHook( () => useCounter() );

        // Se obtiene el valor resultante de la llamada a useCounter
        const { counter, decrement, increment, reset } = result.current;

        // Valida que el valor por defecto sea 10
        expect( counter ).toBe(10);
        // Valida que decrement sea una funcion
        expect( decrement ).toEqual( expect.any(Function) );
    });

    test('debe de generar el counter con el valor de 100', () => {

        const { result } = renderHook( () => useCounter(100));
        const { counter } = result.current;

        expect( counter ).toBe(100);
    });

    test('debe de incrementar el contador', () =>{

        const { result } = renderHook( () => useCounter(100) );
        const { increment } = result.current;

        // Es una funcion que recibe un callback
        // Se utiliza para poder cambiar el estado de counter
        act( () => {
            increment();
            increment(2);
        });

        // Se accede al valor de counter por medio del result debido a que es una variable primitiva 
        // esta genera una copia del valor original y no se actualiza por si misma
        expect( result.current.counter ).toBe(103);

    });

    test('debe de decrementar el contador', () => {

        const { result } = renderHook( () => useCounter(100) );
        const { decrement } = result.current;

        act( () => {
            decrement();
            decrement(2);
        })

        expect( result.current.counter ).toBe(97);
    });

    test('debe de resetear el contador', () =>{

        const { result } = renderHook( () => useCounter(100) );
        const { reset, increment } = result.current;

        act( () => {
            increment(100);
            reset();
        });
        expect( result.current.counter ).toBe(100);
    });

});