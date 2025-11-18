import React, { useState } from "react";
import api from "../Api";
import { Link, useNavigate } from "react-router-dom";

const LoginPin = () => {
  const [email, setEmail] = useState("");
  const [pin, setPin] = useState("");
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  const verificarYEntrar = async (e) => {
    e.preventDefault();
    setMensaje("");

    try {
      const res = await api.post("/pin/login-pin", {
        email,
        pin,
      });

      localStorage.setItem("pinEmail", res.data.usuario.email);
      localStorage.setItem("pinTienePin", res.data.usuario.tienePin ? "1" : "0");

      setMensaje(res.data.mensaje);
      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (error) {
      setMensaje(error.response?.data?.mensaje || "Error en login PIN.");
    }
  };

  return (
    <>
      {/* ======== ESTILOS INTERNOS — LOGIN PIN ======== */}
      <style>{`
        body {
          background: linear-gradient(135deg, #6f42c1, #0d6efd);
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: "Poppins", sans-serif;
        }

        .pin-card {
          background: #ffffff;
          max-width: 450px;
          width: 100%;
          padding: 35px;
          border-radius: 18px;
          box-shadow: 0 8px 25px rgba(0,0,0,0.15);
          animation: fadeIn 0.6s ease-out;
        }

        h2 {
          text-align: center;
          font-weight: 700;
          color: #6f42c1;
          margin-bottom: 25px;
        }

        .form-control {
          padding: 12px;
          font-size: 1.1rem;
          border-radius: 10px;
          border: 2px solid #d0d7ff;
          transition: 0.3s;
        }

        .form-control:focus {
          border-color: #6f42c1;
          box-shadow: 0 0 8px rgba(111,66,193,0.4);
        }

        .btn-primary {
          padding: 12px;
          font-size: 1.1rem;
          border-radius: 10px;
          font-weight: 600;
          transition: 0.3s;
        }

        .btn-primary:hover {
          transform: scale(1.03);
        }

        p {
          text-align: center;
          font-size: 0.95rem;
          margin-top: 12px;
        }

        a {
          color: #6f42c1;
          font-weight: 600;
        }

        a:hover {
          text-decoration: underline;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="container pin-card">
        <h2>Iniciar sesión por PIN</h2>

        <form onSubmit={verificarYEntrar}>
          <div className="mb-3">
            <label>Correo</label>
            <input
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label>PIN</label>
            <input
              className="form-control"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              maxLength="6"
              required
            />
          </div>

          <button className="btn btn-primary w-100">Ingresar con PIN</button>
        </form>

        {mensaje && <div className="alert alert-info mt-3">{mensaje}</div>}

        <p className="mt-3">
          ¿Quieres iniciar con contraseña? <Link to="/">Login normal</Link>
        </p>
      </div>
    </>
  );
};

export default LoginPin;
