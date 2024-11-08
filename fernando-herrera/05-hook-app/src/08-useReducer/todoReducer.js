export const todoReducer = ( initialState = [], action ) => {

    switch(action.type) {
        case '[TODO] Add Todo':
            return [...initialState, action.payload]; // usa operador spread (...)
        
        case '[TODO] Remove Todo':
            return initialState.filter( todo => todo.id !== action.payload );

        case '[TODO] Toggle Todo':
            return initialState.map( todo => {

                if(todo.id === action.payload) {
                    return {
                        ...todo, // usa operador spread (...)
                        done: !todo.done // invierte el valor cada que se ejecuta esta linea >> true >> false >> true ...
                    };
                }

                return todo;
            });
        default:
            return initialState;
    }

}