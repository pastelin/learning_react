// param todo: identificador que recibe el objeto todo
// param onDeleteTodo: funcion emitida por el componente TodoList para eliminar objeto de lista (todos) recibiendo como parametro el id
// param onToggleTodo: 
export const TodoItem = ({ todo, onDeleteTodo, onToggleTodo}) => {
	return (
		<li className="list-group-item d-flex justify-content-between">
			<span 
				className={`align-self-center ${ (todo.done) ? 'text-decoration-line-through' : ''}`}
				onClick={ () => onToggleTodo(todo.id) }
				>{ todo.descripcion }</span>
			<button 
				className="btn btn-danger"
				onClick={ () => onDeleteTodo(todo.id) }
			>
				Borrar
			</button>
		</li>
	);
};
