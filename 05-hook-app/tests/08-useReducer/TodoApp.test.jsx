import { render, screen } from '@testing-library/react';
import { TodoApp } from '../../src/08-useReducer/TodoApp';
import { useTodos } from '../../src/hooks/useTodos';

jest.mock('../../src/hooks/useTodos');

describe('Pruebas en <TodoApp>', () => {
    
    // Obtiene el resultado cuando se llama el hook con el estado que se quiera tener
    useTodos.mockReturnValue({ 
        todos: [
            { id: 1, descripcion: 'Todo #1', done: false },
            { id: 2, descripcion: 'Todo #2', done: true },
        ],
        todosCount: 2, 
        pendingTodosCount: 1,
        handleNewTodo: jest.fn(),
        handleDeleteTodo: jest.fn(),
        handleToggleTodo: jest.fn()
    });

    test('debe mostrar el componente correctamente', () => {
        
        render( <TodoApp /> );

        expect( screen.getByText('Todo #1') ).toBeTruthy();
        expect( screen.getByText('Todo #2') ).toBeTruthy();
   
    });
});