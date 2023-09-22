import React from "react";
import { useNavigate } from "react-router-dom";

export const Private = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    if (token === "nuevoValor") {
        return (
            <div>
                <h1>Hello User</h1>
                <button
                    onClick={() => {
                        localStorage.removeItem("token");
                        navigate("/");
                    }}>
                    Cerrar Sesión
                </button>
            </div>
        );
    }
    return (
        <div>
            <h1>Hello This is supposed to be private</h1>
            <button
                onClick={() => {
                    navigate("/");
                }}>
                Ir a inicio
            </button>
        </div>
    );
};
