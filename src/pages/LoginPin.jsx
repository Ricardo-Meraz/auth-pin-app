import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../Api";

const LoginPin = () => {
  const [email, setEmail] = useState("");
  const [pin, setPin] = useState("");
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  const verificarYEntrar = async (e) => {
    e.preventDefault();
    setMensaje("");

    try {
      const res = await api.post("/auth-pin/login-pin", {
        email,
        pin,
      });

      localStorage.setItem("pinEmail", res.data.usuario.email);
      localStorage.setItem("pinTienePin", "1");

      setMensaje(res.data.mensaje);
      setTimeout(() => navigate("/dashboard"), 1000);

    } catch (error) {
      const msg = error.response?.data?.mensaje || "Error en login PIN.";
      setMensaje(msg);

      // 🔥 SI REQUIERE CONFIGURAR PIN
      if (error.response?.data?.requierePin) {
        setTimeout(() => {
          localStorage.setItem("pinEmail", email);
          navigate("/config-pin");
        }, 1500);
      }
    }
  };

  return (
    <>
      <style>{`
        body {
          background: linear-gradient(135deg, #6f42c1, #0d6efd);
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: "Poppins", sans-serif;
        }
      `}</style>

      <div className="container pin-card">
        <h2>Iniciar con PIN</h2>

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

          <button className="btn btn-primary w-100">Ingresar</button>
        </form>

        {mensaje && <div className="alert alert-info mt-3">{mensaje}</div>}

        <p className="mt-3">
          ¿Quieres iniciar con contraseña?{" "}
          <Link to="/">Login normal</Link>
        </p>
      </div>
    </>
  );
};

export default LoginPin;
