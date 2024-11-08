/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import { UserModalForm } from '../components/UserModalForm';
import { UsersList } from '../components/UsersList';
import { useUsers } from '../hooks/useUsers';
import { useAuth } from '../auth/hooks/useAuth';

export const UsersPage = () => {
    const { users, visibleForm, isLoading, handlerOpenForm, getUsers } = useUsers();

    const { login } = useAuth();

    useEffect(() => {
        getUsers();
    }, []);

    if (isLoading) {
        return (
            <div className="container my-2">
                <h4 className="alert">Cargando...</h4>
            </div>
        );
    }

    return (
        <>
            {!visibleForm || <UserModalForm />}
            <div className="container my-2">
                <h2>Users App</h2>

                <div className="flex-responsive">
                    <div className="flex-responsive-item">
                        {visibleForm || !login.isAdmin || (
                            <button
                                className="btn btn-blue-md"
                                onClick={handlerOpenForm}
                            >
                                Nuevo Usuario
                            </button>
                        )}

                        {users.length === 0 ? (
                            <div className="alert alert-warning">
                                No hay usuarios en el sistema
                            </div>
                        ) : (
                            <UsersList />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};
