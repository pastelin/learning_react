import { useUsers } from '../hooks/useUsers';
import { UserContext } from './UserContext';

export const UserProvider = ({ children }) => {
    const {
        userSelected,
        users,
        initialUserForm,
        visibleForm,
        handlerAddUser,
        handlerRemoveUser,
        handlerUserSelectedForm,
        handlerCloseForm,
        handlerOpenForm,
        getUsers,
    } = useUsers();

    return (
        <UserContext.Provider
            value={{
                userSelected,
                users,
                initialUserForm,
                visibleForm,
                handlerAddUser,
                handlerRemoveUser,
                handlerUserSelectedForm,
                handlerCloseForm,
                handlerOpenForm,
                getUsers,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
