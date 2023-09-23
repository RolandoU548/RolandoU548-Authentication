import React, {useEffect} from "react";
import { Link, useNavigate } from "react-router-dom"
import "../../styles/home.css";
import "../../styles/forms.css";

export const Home = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("token")){
            navigate("/private");
        } 
    }, []);

	return (
        <div className="app">
            <Link className="boton__redireccion" to="/login">
                Iniciar Sesión
            </Link>
            <Link className="boton__redireccion" to="/signup">
                Registrarse
            </Link>
        </div>
	);
};
