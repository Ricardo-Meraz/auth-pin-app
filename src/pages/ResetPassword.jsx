import React, { useState } from "react";
import api from "../Api";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [nueva, setNueva] = useState("");
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();
  const email = localStorage.getItem("resetEmail");

  const cambiar = async (e) => {
    e.preventDefault();
    setMensaje("");

    try {
      const res = await api.post("/auth-pin/restablecer", {
        email,
        nuevaContraseña: nueva,
      });

      setMensaje(res.data.mensaje);
      setTimeout(() => {
        localStorage.removeItem("resetEmail");
        navigate("/");
      }, 1500);

    } catch (error) {
      setMensaje(error.response?.data?.mensaje || "Error al actualizar.");
    }
  };

  return (
    <>
      <style>{`
        body {
          background: linear-gradient(135deg, #0d6efd, #6610f2);
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          font-family: "Poppins", sans-serif;
        }
        .card {
          background: #fff;
          padding: 30px;
          border-radius: 16px;
          max-width: 420px;
          width: 100%;
          box-shadow: 0 8px 25px rgba(0,0,150,0.15);
        }
        h2 { text-align: center; font-weight: 700; color: #0d6efd; margin-bottom:20px; }
      `}</style>

      <div className="card">
        <h2>Restablecer contraseña</h2>

        <form onSubmit={cambiar}>
          <div className="mb-3">
            <label>Nueva contraseña</label>
            <input
              type="password"
              className="form-control"
              value={nueva}
              onChange={(e) => setNueva(e.target.value)}
              required
            />
          </div>

          <button className="btn btn-primary w-100">Guardar</button>
        </form>

        {mensaje && <div className="alert alert-info mt-3">{mensaje}</div>}
      </div>
    </>
  );
};

export default ResetPassword;
