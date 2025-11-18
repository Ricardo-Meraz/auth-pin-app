import React, { useState } from "react";
import api from "../Api";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [codigo, setCodigo] = useState("");
  const [nueva, setNueva] = useState("");
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  const email = localStorage.getItem("resetEmail");

  const cambiarPass = async (e) => {
    e.preventDefault();
    setMensaje("");

    try {
      const res = await api.post("/auth-pin/reset-password", {
        email,
        codigo,
        nuevaContraseña: nueva,
      });

      setMensaje(res.data.mensaje);

      setTimeout(() => {
        localStorage.removeItem("resetEmail");
        navigate("/");
      }, 1500);
    } catch (error) {
      setMensaje(error.response?.data?.mensaje || "Error al cambiar contraseña");
    }
  };

  return (
    <>
      <style>{`
        body {
          background: linear-gradient(135deg, #6610f2, #0d6efd);
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          font-family: "Poppins", sans-serif;
        }
        .card {
          background: white;
          padding: 30px;
          border-radius: 15px;
          width: 400px;
          box-shadow: 0 8px 20px rgba(0,0,0,0.15);
        }
      `}</style>

      <div className="card">
        <h3 className="text-center mb-3">Restablecer contraseña</h3>

        <form onSubmit={cambiarPass}>
          <label>Código recibido:</label>
          <input
            className="form-control mb-3"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            required
          />

          <label>Nueva contraseña:</label>
          <input
            type="password"
            className="form-control mb-3"
            value={nueva}
            onChange={(e) => setNueva(e.target.value)}
            required
          />

          <button className="btn btn-success w-100">Restablecer</button>
        </form>

        {mensaje && <div className="alert alert-info mt-3">{mensaje}</div>}
      </div>
    </>
  );
};

export default ResetPassword;
