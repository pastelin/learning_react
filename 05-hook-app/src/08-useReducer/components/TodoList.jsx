import { TodoItem } from './TodoItem';

// param todos: identificador que recibe la lista de todos
// param onDeleteTodo: identificador de la referencia a la funcion handleDeleteTodo definida en el componente TodoApp
// parama onToggleTodo: 
export const TodoList = ({ todos, onDeleteTodo, onToggleTodo }) => {
	return (
		<ul className="list-group">
			{
				// Recorre cada objeto del arreglo y pasa la referencia del objeto al componente TodoItem para que lo imprima en la vista
                todos.map( todo => (
					// key=, todo=, onDeleteTodo= : son identificadores por el cual el componente TodoItem los identificara
					// {todo.id}, {todo}, {onDeleteTodo} : contiene el valor que se asignara a los identificadores
					// param key: es obligatorio para diferenciar los componentes que se generen
					// param todo: pasa el valor del objeto todo para que el componente TodoItem los utilice
					// param onDeleteTodo: (funcion) emitida por el componente TodoApp para eliminar un objeto de la lista de todos
                    <TodoItem 
						key={ todo.id } 
						todo={ todo } 
						onDeleteTodo={ onDeleteTodo }
						onToggleTodo={ onToggleTodo }
					/>
	    		))
            }
		</ul>
	);
};
