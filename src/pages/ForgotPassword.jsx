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

      localStorage.setItem("resetEmail", email);
      setMensaje(res.data.mensaje);

      setTimeout(() => navigate("/reset-password"), 1500);
    } catch (error) {
      setMensaje(error.response?.data?.mensaje || "Error al enviar código");
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
          background: white;
          padding: 30px;
          border-radius: 15px;
          width: 400px;
          box-shadow: 0 8px 20px rgba(0,0,0,0.15);
        }
      `}</style>

      <div className="card">
        <h3 className="text-center mb-3">Recuperar contraseña</h3>

        <form onSubmit={enviarCodigo}>
          <label>Correo:</label>
          <input
            type="email"
            className="form-control mb-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button className="btn btn-primary w-100">Enviar código</button>
        </form>

        {mensaje && <div className="alert alert-info mt-3">{mensaje}</div>}
      </div>
    </>
  );
};

export default ForgotPassword;
