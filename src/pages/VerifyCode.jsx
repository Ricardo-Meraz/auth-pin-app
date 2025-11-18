import React, { useState } from "react";
import api from "../Api";
import { useNavigate } from "react-router-dom";

const VerifyCode = () => {
  const [codigo, setCodigo] = useState("");
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();
  const email = localStorage.getItem("resetEmail");

  const verificar = async (e) => {
    e.preventDefault();
    setMensaje("");

    try {
      const res = await api.post("/auth-pin/verify-code", {
        email,
        codigo
      });

      setMensaje(res.data.mensaje);
      setTimeout(() => navigate("/reset-password"), 1500);

    } catch (error) {
      setMensaje(error.response?.data?.mensaje || "Código incorrecto.");
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
          background: #fff;
          padding: 30px;
          border-radius: 16px;
          max-width: 420px;
          width: 100%;
          box-shadow: 0 8px 25px rgba(0,0,150,0.15);
        }
        h2 { text-align: center; font-weight: 700; color: #6610f2; margin-bottom:15px; }
      `}</style>

      <div className="card">
        <h2>Verificar código</h2>

        <form onSubmit={verificar}>
          <div className="mb-3">
            <label>Código recibido</label>
            <input
              type="text"
              className="form-control"
              maxLength="6"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              required
            />
          </div>

          <button className="btn btn-primary w-100">Verificar</button>
        </form>

        {mensaje && <div className="alert alert-info mt-3">{mensaje}</div>}
      </div>
    </>
  );
};

export default VerifyCode;
