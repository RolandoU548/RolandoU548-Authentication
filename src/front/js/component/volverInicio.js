import React from "react";
import { useNavigate } from "react-router-dom";

export const VolverInicio = () => {
    const navigate = useNavigate();
    return (
        <div
            style={{
                position: "absolute",
                fontSize: "40px",
                top: "0",
                padding: "5px 20px",
                cursor: "pointer"
            }}
            onClick={() => {
                navigate("/");
            }}>
            ←
        </div>
    );
};
