/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

export const UserForm = ({ userSelected, handlerCloseForm }) => {
    const { handlerAddUser, initialUserForm, errors } = useContext(UserContext);
    const [userForm, setUserForm] = useState(initialUserForm);
    const { id, username, email, password } = userForm;
    const navigate = useNavigate();

    useEffect(() => {
        setUserForm({ ...userSelected, password: '' });
    }, [userSelected]);

    const onInputChange = ({ target: { name, value } }) => {
        setUserForm({
            ...userForm,
            [name]: value,
        });
    };

    const onSubmit = (event) => {
        event.preventDefault();

        handlerAddUser(userForm);
        navigate('/users');
    };

    const onCloseForm = () => {
        handlerCloseForm();
        setUserForm(initialUserForm);
    };

    return (
        <form className="form-container" onSubmit={onSubmit}>
            <div className="input-group flex-column-responsive align-center">
                <input
                    type="text"
                    placeholder="Username"
                    name="username"
                    value={username}
                    onChange={onInputChange}
                />
                <span className="text-danger">{errors?.username}</span>
            </div>

            <div className="input-group flex-column-responsive align-center">
                {id > 0 || (
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={onInputChange}
                    />
                )}
                <span className="text-danger">{errors?.password}</span>
            </div>

            <div className="input-group flex-column-responsive align-center">
                <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    value={email}
                    onChange={onInputChange}
                />
                <span className="text-danger">{errors?.email}</span>
            </div>

            <input type="hidden" value={id} />
            <div>
                <button className="btn btn-blue-md mr-2" type="submit">
                    {id > 0 ? 'Editar' : 'Crear'}
                </button>

                {!handlerCloseForm || (
                    <button
                        className="btn btn-blue-md my-2"
                        type="button"
                        onClick={onCloseForm}
                    >
                        Cerrar
                    </button>
                )}
            </div>
        </form>
    );
};
