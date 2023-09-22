import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const LogIn = () => {
    const [datos, setDatos] = useState();
    const navigate = useNavigate();

    return (
        <div className="login">
            <form
                className="login__form"
                onSubmit={e => {
                    e.preventDefault();
                    localStorage.setItem("token", "nuevoValor");
                    navigate("/private");
                }}>
                <div className="form__contenedor">
                    <label className="form__contenedor__items" htmlFor="correo">
                        Correo Electrónico
                    </label>
                    <input
                        className="form__contenedor__items form__input"
                        type="email"
                        id="correo"
                        onChange={e => {
                            setDatos({ ...datos, email: e.target.value });
                        }}
                        required
                    />
                </div>
                <div className="form__contenedor">
                    <label
                        className="form__contenedor__items"
                        htmlFor="contraseña">
                        Contraseña
                    </label>
                    <input
                        className="form__contenedor__items form__input"
                        type="password"
                        id="contraseña"
                        onChange={e => {
                            setDatos({ ...datos, password: e.target.value });
                        }}
                        required
                    />
                </div>
                <button type="submit" className="submit">
                    Iniciar Sesión
                </button>
            </form>
        </div>
    );
};
