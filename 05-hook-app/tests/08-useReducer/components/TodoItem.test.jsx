import { screen, render, fireEvent } from '@testing-library/react';
import { TodoItem } from '../../../src/08-useReducer/components/TodoItem';

describe('Pruebas en <TodoItem >    ', () => {
    
    const todo = {
        id: 1,
        descripcion: 'Piedra del Alma',
        done: false
    };

    // Simulacion de funciones
    const onDeleteTodoMock = jest.fn();
    const onToggleTodoMock = jest.fn();

    // Se encarga de resetear las evaluaciones por cada prueba
    beforeEach(() => jest.clearAllMocks() );

    test('debe de mostrar el Todo Pendiente de completar', () => {
        // Renderizar <TodoItem>
        render(
            <TodoItem 
                todo={ todo } 
                onToggleTodo={ onToggleTodoMock }
                onDeleteTodo={ onDeleteTodoMock }
            />
        );
        
        // Muestra todo el html del componente
        // screen.debug();

        // Obtiene la referencia del elemento <li> del componente
        const liElement = screen.getByRole('listitem');
        
        // Valida que el elemento <li> tenga el estilo indicado
        expect( liElement.className ).toBe('list-group-item d-flex justify-content-between');

        // Al no poder hacer referencia directamente a un elemento <span> 
        // Se le debe de agregar (aria-label="span") a dicho elemento para poder encontrarlo mediante "getByLabelText"
        const spanElement = screen.getByLabelText('span');
        // Con "not" invertimos la validacion y sera true mientras no contenga dicha clase definida
        expect( spanElement.className ).not.toContain('text-decoration-line-through');

    });

    test('debe de mostrar el Todo Pendiente de completar', () => {
        
        todo.done = true;

        // Renderizar <TodoItem>
        render(
            <TodoItem 
                todo={ todo } 
                onToggleTodo={ onToggleTodoMock }
                onDeleteTodo={ onDeleteTodoMock }
            />
        );
        
        // Muestra todo el html del componente
        // screen.debug();

        // Al no poder hacer referencia directamente a un elemento <span> 
        // Se le debe de agregar (aria-label="span") a dicho elemento para poder encontrarlo mediante "getByLabelText"
        const spanElement = screen.getByLabelText('span');
        // Con "not" invertimos la validacion y sera true mientras no contenga dicha clase definida
        expect( spanElement.className ).toContain('text-decoration-line-through');
    });

    test('span debe de llamar el ToggleTodo cuando se hace clic', () => {
        render(
            <TodoItem 
                todo={ todo } 
                onToggleTodo={ onToggleTodoMock }
                onDeleteTodo={ onDeleteTodoMock }
            />
        );

        const spanElement = screen.getByLabelText('span');
        // Simulacion de clic al elemento <span>
        fireEvent.click( spanElement );

        // Valida que el mock de la funcion se haya llamado con el valor especificado
        expect( onToggleTodoMock ).toHaveBeenCalledWith( todo.id );
    });

    test('button debe de llamar el deleteTodo', () => {

        render(
            <TodoItem 
                todo={ todo } 
                onToggleTodo={ onToggleTodoMock }
                onDeleteTodo={ onDeleteTodoMock }
            />
        );

        // Obtiene la referencia del elemento button a ser usado
        // el primer parametro de getByRole es el elemento
        // el segundo es el contenido que se coloca ente el elemento <button>(here)</button>
        const buttonElement = screen.getByRole('button', {name: 'Borrar'});
        // Simulacion de clic al elemento <span>
        fireEvent.click( buttonElement );

        // Valida que el mock de la funcion se haya llamado con el valor especificado
        expect( onDeleteTodoMock ).toHaveBeenCalledWith( todo.id );
    });
});