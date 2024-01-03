// Definicion de estado inicial que se mandara al reducer
const initialState = [{
    id: 1,
    todo: 'Recolectar la piedra del Alma',
    done: false,
}];


// El primer parametro indica el nuevo estado o el anterior
// El segundo parametro indica la accion para regresar un nuevo estado
// Reducer produce un nuevo estado basado en la accion que recibio
const todoReducer = (state = initialState, action = {}) => {

    if(action.type === '[TODO] add todo') {
        return [ ...state, action.payload];
    }

    return state;
}

// Regresa el estado inicial
let todos = todoReducer();

const newTodo = {
    id: 2,
    todo: 'Recolectar la piedra del poder',
    done: false

}

// Definicion de accion para modificar el estado
const addTodoAction = {
    type: '[TODO] add todo',
    payload: newTodo,
}

// Obtiene nuevo estado
// 1. Envia el estado inicial
// 2. Envia la acciona para regresar un nuevo estado
todos = todoReducer(todos, addTodoAction);

console.log(todos);
