import Swal from 'sweetalert2';
import { findAll, remove, save, update } from '../services/userService';
import { useDispatch, useSelector } from 'react-redux';
import {
    addUser,
    initialUserForm,
    loadingError,
    loadingUsers,
    onCloseForm,
    onOpenForm,
    onUserSelected,
    removeUser,
    updateUser,
} from '../store/slices/users/usersSlice';
import { useAuth } from '../auth/hooks/useAuth';

export const useUsers = () => {
    const { users, userSelected, visibleForm, errors } = useSelector(
        (state) => state.users
    );
    const dispatch = useDispatch();

    const { login, handlerLogout } = useAuth();

    const getUsers = async () => {
        try {
            const result = await findAll();
            dispatch(loadingUsers(result.data));
        } catch (error) {
            if (error.response?.status == 401) {
                handlerLogout();
            }
        }
    };

    const handlerAddUser = async (user) => {
        if (!login.isAdmin) return;

        let response;

        try {
            if (user.id === 0) {
                response = await save(user);
                dispatch(addUser({ ...response.data }));
            } else {
                response = await update(user);
                dispatch(updateUser({ ...response.data }));
            }

            Swal.fire(
                user.id === 0 ? 'Usuario Creado' : 'Usuario Actualiza',
                user.id === 0
                    ? 'El usuario ha sido creado con exito!'
                    : 'El usuario ha sido actualizado con exito!',
                'success'
            );
            handlerCloseForm();
        } catch (error) {
            if (error.response && error.response.status === 400) {
                dispatch(loadingError(error.response.data));
                console.error(errors);
            } else if (
                error.response &&
                error.response.status === 500 &&
                error.response.data?.message?.includes('constraint')
            ) {
                if (error.response.data?.message?.includes('UK_username')) {
                    dispatch(
                        loadingError({ username: 'El username ya existe' })
                    );
                }

                if (error.response.data?.message?.includes('UK_email')) {
                    dispatch(loadingError({ username: 'El email ya existe' }));
                }
            } else if (error.response?.status == 401) {
                handlerLogout();
            } else {
                throw error;
            }
        }
    };

    const handlerRemoveUser = (id) => {
        if (!login.isAdmin) return;

        Swal.fire({
            title: 'Esta seguro que desea eliminar?',
            text: 'Cuidado el usuario sera eliminado!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await remove(id);
                    dispatch(removeUser(id));
                    Swal.fire({
                        title: 'Usuario Eliminado!',
                        text: 'El usuario ha sido eliminado con exito!',
                        icon: 'success',
                    });
                } catch (error) {
                    if (error.response?.status == 401) {
                        handlerLogout();
                    }
                }
            }
        });
    };

    const handlerUserSelectedForm = (user) => {
        dispatch(onUserSelected({ ...user }));
    };

    const handlerOpenForm = () => {
        dispatch(onOpenForm());
    };

    const handlerCloseForm = () => {
        dispatch(onCloseForm());
        dispatch(loadingError({}));
    };

    return {
        users,
        userSelected,
        initialUserForm,
        visibleForm,
        errors,
        handlerAddUser,
        handlerUserSelectedForm,
        handlerRemoveUser,
        handlerOpenForm,
        handlerCloseForm,
        getUsers,
    };
};
