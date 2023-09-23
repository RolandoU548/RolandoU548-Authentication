import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Private = () => {
    const { actions } = useContext(Context);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    return (
        <main className="private">
            {token === "nuevoValor" ? (
                <div>
                    <h1 style={{ textAlign: "center" }}>Hello User</h1>
                    <button
                        style={{ margin: "0 auto" }}
                        onClick={() => {
                            actions.signOut();
                            navigate("/");
                        }}>
                        Cerrar Sesión
                    </button>
                </div>
            ) : (
                <div>
                    <h1 style={{ textAlign: "center" }}>
                        Hello This is supposed to be private
                    </h1>
                    <button
                        style={{ margin: "0 auto" }}
                        onClick={() => {
                            actions.signOut();
                            navigate("/");
                        }}>
                        Ir a inicio
                    </button>
                </div>
            )}
        </main>
    );
};
