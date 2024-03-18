import { useState } from 'react';
import Swal from 'sweetalert2';
import { useAuth } from '../hooks/useAuth';

const initialLoginForm = {
    username: '',
    password: '',
};

export const LoginPage = () => {
    const { handlerLogin } = useAuth();
    const [loginForm, setLoginForm] = useState(initialLoginForm);
    const { password, username } = loginForm;

    const onInputChange = ({ target: { name, value } }) => {
        setLoginForm({
            ...loginForm,
            [name]: value,
        });
    };

    const onSubmit = (event) => {
        event.preventDefault();
        if (!username || !password) {
            Swal.fire(
                'Error de validación',
                'Userame y password requeridos',
                'error'
            );
        }

        handlerLogin({ username, password });

        setLoginForm(initialLoginForm);
    };

    return (
        <div className="flex-responsive justify-center">
            <div className="modal-container">
                <h2>Login Page</h2>

                <form className="form-container" onSubmit={onSubmit}>
                    <input
                        type="text"
                        placeholder="Username"
                        name="username"
                        value={username}
                        onChange={onInputChange}
                    />
                    <input
                        className="mt-1"
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={onInputChange}
                    />
                    <div>
                        <button className="btn btn-blue-md my-2">Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
};
