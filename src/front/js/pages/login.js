import React, { useState, useContext} from "react";
import {useNavigate} from 'react-router-dom'
import { Context } from "../store/appContext";

export const LogIn = () => {
    const navigate = useNavigate()
    const { actions } = useContext(Context);
    const [datos, setDatos] = useState();
    return (
        <main className="login">
            <form
                className="login__form"
                onSubmit={async(e) => {
                    e.preventDefault();
                    const token = await actions.generateToken(datos.email, datos.password)
                    if (token === "Incorrect password"){
                        alert("Contraseña incorrecta")
                    } else if (token === "User doesn't exist"){
                        alert("El usuario no está registrado")
                    } else if(token.access_token){
                        navigate("/private");
                        actions.identificateUser(token.access_token);
                    };
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
