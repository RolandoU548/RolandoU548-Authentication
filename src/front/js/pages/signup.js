import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const SignUp = () => {
    const { actions } = useContext(Context);
    const [datos, setDatos] = useState();
    const navigate = useNavigate();

    return (
        <main className="signup">
            <form
                className="login__form"
                onSubmit={e => {
                    e.preventDefault();
                    actions.generateToken(datos.email, datos.password);
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
                        placeholder="Correo Electrónico"
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
                        placeholder="Contraseña"
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
        </main>
    );
};
