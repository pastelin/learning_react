import { renderHook } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { useForm } from '../../src/hooks/useForm';

describe('Pruebas en useForm', () => {
    
    const initialForm = {
        name: 'Juan',
        email: 'juan@google.com'
    }

    test('debe de regresar los valores por defecto', () => {
        const { result } = renderHook( () => useForm(initialForm) );
        expect( result.current ).toEqual({
            name: initialForm.name,
            email: initialForm.email,
            formState: initialForm,
            onInputChange: expect.any( Function ),
            onResetForm: expect.any( Function ),
        });
    });

    test('debe de cambiar el nombre del formulario', () => {
        
        const newValue = 'Marco';

        const { result } = renderHook( () => useForm(initialForm) );
        const { onInputChange } = result.current;

        act( () => {
            // Envia objeto target con ls propiedades de name y value que simulan el objeto de event
            onInputChange({ 
                target: { 
                    name: 'name',
                    value: newValue
                }  
            });
        });

        expect( result.current.name ).toEqual( newValue );
        expect( result.current.formState.name ).toEqual( newValue );
    });
    
    test('debe de realizar el reset del formulario', () => {
        
        const newValue = 'Marco';

        const { result } = renderHook( () => useForm(initialForm) );
        const { onInputChange, onResetForm } = result.current;

        act( () => {
            onInputChange({ 
                target: { 
                    name: 'name',
                    value: newValue
                }  
            });

            onResetForm();
        });

        expect( result.current.name ).toEqual( initialForm.name );
        expect( result.current.formState.name ).toEqual( initialForm.name );
    });

});