/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export const UserForm = ({ userSelected, handlerCloseForm }) => {
    const { handlerAddUser, initialUserForm } = useContext(UserContext);
    const [userForm, setUserForm] = useState(initialUserForm);
    const { id, username, email, password } = userForm;
    const navigate = useNavigate();

    useEffect(() => {
        setUserForm({ ...userSelected, password: "" });
    }, [userSelected]);

    const onInputChange = ({ target: { name, value } }) => {
        setUserForm({
            ...userForm,
            [name]: value,
        });
    };

    const onSubmit = (event) => {
        event.preventDefault();

        if (!username || (!password && id === 0) || !email) {
            Swal.fire(
                "Error de validacion",
                "Debe completar los campos del formulario",
                "error"
            );
            return;
        }

        if (!email.includes("@")) {
            Swal.fire(
                "Error de validacion email",
                "El email debe ser válido",
                "error"
            );
            return;
        }

        handlerAddUser(userForm);
        setUserForm(initialUserForm);
        navigate("/users");
    };

    const onCloseForm = () => {
        handlerCloseForm();
        setUserForm(initialUserForm);
    };

    return (
        <>
            <form className="form-container" onSubmit={onSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    name="username"
                    value={username}
                    onChange={onInputChange}
                />

                {id > 0 || (
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={onInputChange}
                    />
                )}

                <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    value={email}
                    onChange={onInputChange}
                />
                <input type="hidden" value={id} />
                <div>
                    <button className="btn btn-blue-md mr-2" type="submit">
                        {id > 0 ? "Editar" : "Crear"}
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
        </>
    );
};
