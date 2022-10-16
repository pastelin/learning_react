import { useEffect, useReducer } from 'react';
import { todoReducer } from '../08-useReducer/todoReducer';

// Funcion que inicializa el estado de todos almacenados en el localStorage
const init = () => {
    return JSON.parse(localStorage.getItem('todos')) || [];
};

export const useTodos = () => {
	// Lugar donde se mantiene alojado nuestro state
	// param 1: Pasa la referencia de la funcion todoReducer para ejecutarlo cuando sea necesario mediante el dispatch
	// param 2: Estado inicial en el que comenzara, sino se asigna el tercer parametro cada que inicie el componente o cambia el
	// estado este se sobreescribira en el useEffect
	// param 3: Funcion que se encarga de inicializar el estado, omite el param 2
	const [todos, dispatch] = useReducer(todoReducer, [], init);

	// Se ejecutara cuando el estado de "todos" cambie
	useEffect(() => {
		localStorage.setItem('todos', JSON.stringify(todos));
	}, [todos]);

	// Funcion que sera emitido al componente TodoAdd, en el que se le pasara como paramero el objeto a añadir
	const handleNewTodo = (todo) => {
		const action = {
			type: '[TODO] Add Todo',
			payload: todo,
		};

		// Funcion usada para enviar la accion y modificar el estado inicial
		dispatch(action);
	};

	// Funcion que se emitira el componente TodoList, en el que se le pasara como parametro el id del objeto a eliminar
	const handleDeleteTodo = (id) => {
		dispatch({
			type: '[TODO] Remove Todo',
			payload: id,
		});
	};

    // Funcion que se emitira al componente TodoList, en el que se le pasara como parametro el id del objeto a cambiar parametro done
	const handleToggleTodo = (id) => {
		dispatch({
			type: '[TODO] Toggle Todo',
			payload: id,
		});
	};

	return {
        todos,
        todosCount: todos.length, 
        pendingTodosCount: todos.filter( todo => !todo.done ).length,
        handleNewTodo,
        handleDeleteTodo,
        handleToggleTodo
    };
};
