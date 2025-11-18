import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../Api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMensaje("");

    try {
      const res = await api.post("/auth-pin/login", {
        email,
        contraseña,
      });

      const user = res.data.usuario;

      localStorage.setItem("pinEmail", user.email);
      localStorage.setItem("pinTienePin", user.tienePin ? "1" : "0");

      setMensaje(res.data.mensaje);
      setTimeout(() => navigate("/dashboard"), 1000);

    } catch (error) {
      let msg = error.response?.data?.mensaje || "Error en login.";
      if (error.response?.data?.restante) {
        msg += ` (Espera ${error.response.data.restante}s)`;
      }
      setMensaje(msg);
    }
  };

  return (
    <>
      <style>{`
        body {
          background: linear-gradient(135deg, #0d6efd, #6610f2);
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: "Poppins", sans-serif;
        }

        .login-card {
          background: #fff;
          max-width: 450px;
          width: 100%;
          padding: 35px;
          border-radius: 18px;
          box-shadow: 0 8px 25px rgba(0,0,0,0.15);
          animation: fadeIn 0.5s ease;
        }

        h2 {
          text-align: center;
          font-weight: 700;
          color: #0d6efd;
          margin-bottom: 25px;
        }
      `}</style>

      <div className="login-card">
        <h2>Iniciar sesión</h2>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label>Correo</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label>Contraseña</label>
            <input
              type="password"
              className="form-control"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
              required
            />
          </div>

          <button className="btn btn-primary w-100">Ingresar</button>
        </form>

        {mensaje && <div className="alert alert-info mt-3">{mensaje}</div>}

        <p>
          ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
        </p>

        <p>
          ¿Prefieres PIN? <Link to="/login-pin">Ingresar con PIN</Link>
        </p>
      </div>
    </>
  );
};

export default Login;
