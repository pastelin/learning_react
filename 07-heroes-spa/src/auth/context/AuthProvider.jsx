// Utiliza el AuthContext con el objetivo de proveer la informacion a toda la aplicacion
import { useReducer } from 'react'
import { types } from '../types/types';
import { AuthContext } from './AuthContext'
import { authReducer } from './authReducer';

// Definicion del estado inicial para el reducer
const init = () => {
    const user = JSON.parse(localStorage.getItem('user'));

    return {
        logged: !!user,
        user: user
    }
}

// Recibe como prop children la referencia de los componentes hijos
export const AuthProvider = ({children}) => {
    
    // Reducer que manejara los estados
    const [authState, dispatch] = useReducer(authReducer, {}, init);
    
    const login = (name = '') => {

        const user = { id: 'ABC', name };

        // Accion que sera ejecutada para regresar un estado nuevo
        const action = { type: types.login, payload: user };

        // Almacena la informacion del usuario logueado
        localStorage.setItem('user', JSON.stringify(user));

        // Ejecuta la accion en el reducer
        dispatch(action);
    }

    const logout = () => {
        localStorage.removeItem('user');
        const action = { type: types.logout }
        dispatch(action);
    }

    return (
        <AuthContext.Provider value={{
            ...authState, login, logout
        }}>
            { children }
        </AuthContext.Provider>
    )
}
