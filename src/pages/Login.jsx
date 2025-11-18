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
      // 🔥 RUTA CORRECTA
      const res = await api.post("/auth-pin/login", {
        email,
        contraseña,
      });

      const user = res.data.usuario;

      // Guardar sesión
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
      {/* ======== ESTILOS INTERNOS — LOGIN BONITO ======== */}
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
          background: #ffffff;
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

        .form-control {
          padding: 12px;
          font-size: 1.1rem;
          border-radius: 10px;
          border: 2px solid #d0d7ff;
          transition: 0.3s;
        }

        .form-control:focus {
          border-color: #0d6efd;
          box-shadow: 0 0 8px rgba(13,110,253,0.4);
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
          margin-top: 10px;
        }

        a {
          color: #0d6efd;
          font-weight: 600;
        }

        a:hover {
          text-decoration: underline;
        }

        .forgot-link {
          display: block;
          text-align: right;
          font-size: 0.9rem;
          margin-top: 5px;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="container login-card">
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

          <div className="mb-2">
            <label>Contraseña</label>
            <input
              type="password"
              className="form-control"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
              required
            />
          </div>

          {/* 🔥 ENLACE DE RECUPERAR CONTRASEÑA */}
          <Link to="/forgot-password" className="forgot-link">
            ¿Olvidaste tu contraseña?
          </Link>

          <button className="btn btn-primary w-100 mt-3">Ingresar</button>
        </form>

        {mensaje && <div className="alert alert-info mt-3">{mensaje}</div>}

        <p>
          ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
        </p>

        <p>
          ¿Prefieres iniciar con PIN?{" "}
          <Link to="/login-pin">Ingresar con PIN</Link>
        </p>
      </div>
    </>
  );
};

export default Login;
