import { useReducer, useState } from 'react';
import { usersReducer } from '../reducers/usersReducer';
import Swal from 'sweetalert2';
import { findAll, remove, save, update } from '../services/userService';

const initialsUsers = [];

const initialUserForm = {
    id: 0,
    username: '',
    password: '',
    email: '',
};

export const useUsers = () => {
    const [users, dispatch] = useReducer(usersReducer, initialsUsers);
    const [userSelected, setUserSelected] = useState(initialUserForm);
    const [visibleForm, setVisibleForm] = useState(false);

    const getUsers = async () => {
        const result = await findAll();
        dispatch({
            type: 'loadingUsers',
            payload: result.data,
        });
    };

    const handlerAddUser = async (user) => {
        let response;

        if (user.id === 0) {
            response = await save(user);
        } else {
			response = await update(user);
		}

        dispatch({
            type: user.id === 0 ? 'addUser' : 'updateUser',
            payload: response.data,
        });

        Swal.fire(
            user.id === 0 ? 'Usuario Creado' : 'Usuario Actualiza',
            user.id === 0
                ? 'El usuario ha sido creado con exito!'
                : 'El usuario ha sido actualizado con exito!',
            'success'
        );
        handlerCloseForm();
    };

    const handlerRemoveUser = (id) => {
        Swal.fire({
            title: 'Esta seguro que desea eliminar?',
            text: 'Cuidado el usuario sera eliminado!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!',
        }).then((result) => {
            if (result.isConfirmed) {
				remove(id);
                dispatch({
                    type: 'removeUser',
                    payload: id,
                });
                Swal.fire({
                    title: 'Usuario Eliminado!',
                    text: 'El usuario ha sido eliminado con exito!',
                    icon: 'success',
                });
            }
        });
    };

    const handlerUserSelectedForm = (user) => {
        setUserSelected({ ...user });
        setVisibleForm(true);
    };

    const handlerOpenForm = () => {
        setVisibleForm(true);
    };

    const handlerCloseForm = () => {
        setVisibleForm(false);
        setUserSelected(initialUserForm);
    };

    return {
        users,
        userSelected,
        initialUserForm,
        visibleForm,
        handlerAddUser,
        handlerUserSelectedForm,
        handlerRemoveUser,
        handlerOpenForm,
        handlerCloseForm,
        getUsers,
    };
};
