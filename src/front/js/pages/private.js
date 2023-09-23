import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Private = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    return (
        <main className="private">
            {token ? ( store.user.name ? (                
                <div>
                    <h1 style={{ textAlign: "center" }}>Bienvenido {store.user.name}!</h1>
                    <button
                        style={{ margin: "0 auto" }}
                        onClick={() => {
                            actions.signOut();
                            navigate("/");
                        }}>
                        Cerrar Sesión
                    </button>
                </div>) 
                :   
                (<div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>)
            ) : (
                <div>
                    <h1 style={{ textAlign: "center" }}>
                        Hola. Se supone que esto es privado
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
