import Swal from 'sweetalert2';
import { loginUser } from '../services/authServices';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { onLogin, onLogout } from '../../store/slices/auth/authSlice';

export const useAuth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user, isAdmin, isAuth } = useSelector((state) => state.auth);

    const handlerLogin = async ({ username, password }) => {
        try {
            const response = await loginUser({ username, password });
            const token = response.data.token;
            const claims = JSON.parse(window.atob(token.split('.')[1]));

            const user = { username: claims.username };

            dispatch(dispatch(onLogin({ user, isAdmin: claims.isAdmin })));

            sessionStorage.setItem(
                'login',
                JSON.stringify({
                    isAuth: true,
                    isAdmin: claims.isAdmin,
                    user,
                })
            );

            sessionStorage.setItem('token', `Bearer ${token}`);

            navigate('/users');
        } catch (error) {
            if (error.response?.status === 401) {
                Swal.fire(
                    'Error Login',
                    'Userame o password inválidos',
                    'error'
                );
            } else if (error.response?.status === 403) {
                Swal.fire(
                    'Error Login',
                    'No tiene acceso al recurso o permisos!',
                    'error'
                );
            } else {
                throw error;
            }
        }
    };

    const handlerLogout = () => {
        dispatch(onLogout());

        sessionStorage.removeItem('login');
        sessionStorage.removeItem('token');
        sessionStorage.clear();
    };

    return {
        login: {
            user,
            isAuth,
            isAdmin,
        },
        handlerLogin,
        handlerLogout,
    };
};
