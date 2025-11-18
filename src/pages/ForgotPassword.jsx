import React, { useState } from "react";
import api from "../Api";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  const enviarCodigo = async (e) => {
    e.preventDefault();
    setMensaje("");

    try {
      const res = await api.post("/auth-pin/recuperar", { email });

      localStorage.setItem("resetEmail", email); // guardar correo temporal

      setMensaje(res.data.mensaje);
      setTimeout(() => navigate("/verify-code"), 1500);
    } catch (error) {
      setMensaje(error.response?.data?.mensaje || "Error al enviar código.");
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
        h2 { text-align: center; font-weight: 700; color: #fff; margin-bottom:20px; }
      `}</style>

      <div className="card">
        <h2>Recuperar contraseña</h2>

        <form onSubmit={enviarCodigo}>
          <div className="mb-3">
            <label>Correo electrónico</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button className="btn btn-primary w-100">Enviar código</button>
        </form>

        {mensaje && <div className="alert alert-info mt-3">{mensaje}</div>}
      </div>
    </>
  );
};

export default ForgotPassword;
