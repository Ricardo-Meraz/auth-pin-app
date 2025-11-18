import React, { useState } from "react";
import api from  "../Api";
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
    <div className="container mt-5">
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
  );
};

export default LoginPin;
