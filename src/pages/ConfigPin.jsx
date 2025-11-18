import React, { useState } from "react";
import api from "../Api";
import { useNavigate } from "react-router-dom";

const ConfigPin = () => {
  const [pin, setPin] = useState("");
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();
  const email = localStorage.getItem("pinEmail");

  const guardarPin = async (e) => {
    e.preventDefault();
    setMensaje("");

    try {
      const res = await api.post("/pin/configurar-pin", {
        email,
        pin,
      });

      setMensaje(res.data.mensaje);
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (error) {
      setMensaje(error.response?.data?.mensaje || "Error al configurar PIN.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Configurar PIN</h2>

      <form onSubmit={guardarPin}>
        <div className="mb-3">
          <label>Nuevo PIN</label>
          <input
            type="password"
            className="form-control"
            value={pin}
            maxLength="6"
            onChange={(e) => setPin(e.target.value)}
            required
          />
        </div>

        <button className="btn btn-primary w-100">Guardar PIN</button>
      </form>

      {mensaje && <div className="alert alert-info mt-3">{mensaje}</div>}
    </div>
  );
};

export default ConfigPin;
