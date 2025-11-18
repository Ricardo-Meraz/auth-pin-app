import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../Api";

const Register = () => {
  const [email, setEmail] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setMensaje("");

    try {
      const res = await api.post("/pin/registro", {
        email,
        contraseña,
      });

      setMensaje(res.data.mensaje);

      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      setMensaje(error.response?.data?.mensaje || "Error en el registro.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Registro</h2>

      <form onSubmit={handleRegister}>
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

        <button className="btn btn-primary w-100">Registrarme</button>
      </form>

      {mensaje && <div className="alert alert-info mt-3">{mensaje}</div>}

      <p className="mt-3">
        ¿Ya tienes cuenta? <Link to="/">Inicia sesión</Link>
      </p>
    </div>
  );
};

export default Register;
