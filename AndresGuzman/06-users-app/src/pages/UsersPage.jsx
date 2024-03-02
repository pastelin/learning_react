/* eslint-disable react/prop-types */
import { useContext, useEffect } from 'react';
import { UserModalForm } from '../components/UserModalForm';
import { UsersList } from '../components/UsersList';
import { UserContext } from '../context/UserContext';

export const UsersPage = () => {
    const { users, visibleForm, handlerOpenForm, getUsers } =
        useContext(UserContext);

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <>
            {!visibleForm || <UserModalForm />}
            <div className="container my-2">
                <h2>Users App</h2>

                <div className="flex-responsive">
                    <div className="flex-responsive-item">
                        {visibleForm || (
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
