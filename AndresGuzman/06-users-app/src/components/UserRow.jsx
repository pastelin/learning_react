/* eslint-disable react/prop-types */
import { NavLink } from 'react-router-dom';
import { useUsers } from '../hooks/useUsers';
import { useAuth } from '../auth/hooks/useAuth';

export const UserRow = ({ id, username, email, admin }) => {
    const { handlerRemoveUser, handlerUserSelectedForm } =
        useUsers();

    const { login } = useAuth();

    return (
        <tr>
            <td>{id}</td>
            <td>{username}</td>
            <td>{email}</td>

            {!login.isAdmin || (
                <>
                    <td>
                        <button
                            className="btn btn-blue-sm"
                            type="button"
                            onClick={() =>
                                handlerUserSelectedForm({
                                    id,
                                    username,
                                    email,
                                    admin
                                })
                            }
                        >
                            update
                        </button>
                    </td>
                    <td>
                        <NavLink
                            className="btn btn-blue-sm"
                            to={'/users/edit/' + id}
                        >
                            update route
                        </NavLink>
                    </td>
                    <td>
                        <button
                            className="btn btn-red"
                            type="button"
                            onClick={() => handlerRemoveUser(id)}
                        >
                            remove
                        </button>
                    </td>
                </>
            )}
        </tr>
    );
};
