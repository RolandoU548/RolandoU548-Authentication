import React from "react";
import { Link } from "react-router-dom"
import "../../styles/home.css";
import "../../styles/forms.css";

export const Home = () => {
	return (
        <div className="app">
            <Link className="boton__redireccion" to="/signup">
                Registrarse
            </Link>
            <Link className="boton__redireccion" to="/login">
                Iniciar Sesión
            </Link>
        </div>
	);
};
