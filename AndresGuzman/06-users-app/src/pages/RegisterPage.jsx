/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { UserForm } from '../components/UserForm';
import { useParams } from 'react-router-dom';
import { useUsers } from '../hooks/useUsers';

export const RegisterPage = () => {
    const { users = [], initialUserForm } = useUsers();
    const [userSelected, setUserSelecter] = useState(initialUserForm);

    // Hook que obtiene el valor del id pasado como query param
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            const user = users.find((u) => u.id == id) || initialUserForm;
            setUserSelecter(user);
        }
    }, [id]);

    return (
        <>
            <div className=" flex-responsive justify-center">
                <div className="overlay-container">
                    <h5>
                        {userSelected.id > 0 ? 'Editar' : 'Registrar'} Usuario
                    </h5>
                    <UserForm userSelected={userSelected} />
                </div>
            </div>
        </>
    );
};
