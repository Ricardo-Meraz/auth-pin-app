import React, { useState } from "react";
import api from "../Api";
import { useNavigate } from "react-router-dom";

const ConfigPin = () => {
  const [pin, setPin] = useState("");
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();
  const email = localStorage.getItem("pinEmail"); // se guarda desde LoginPin

  // ===============================
  // VALIDACIÓN LOCAL DEL PIN
  // ===============================
  const validarPIN = (pin) => {
    if (pin.length < 4 || pin.length > 6)
      return "El PIN debe ser de 4 a 6 dígitos.";

    if (/^(1234|2345|3456|4567|5678|6789)$/.test(pin))
      return "PIN demasiado fácil (1234, 6789, etc).";

    if (/^(9876|8765|7654|6543|5432|4321)$/.test(pin))
      return "No se permiten secuencias descendentes.";

    if (/^(.)\1+$/.test(pin))
      return "No se permiten números repetidos como 1111 o 4444.";

    if (/^(\d)(\d)\1\2$/.test(pin))
      return "No se permiten patrones como 1212 o 4545.";

    return null;
  };

  const guardarPin = async (e) => {
    e.preventDefault();
    setMensaje("");

    // Validación antes de enviar al servidor
    const error = validarPIN(pin);
    if (error) {
      setMensaje("⚠ " + error);
      return;
    }

    try {
      const res = await api.post("/auth-pin/config-pin", {
        email,
        pin,
      });

      setMensaje("✅ PIN configurado correctamente.");
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (error) {
      setMensaje(error.response?.data?.mensaje || "Error al configurar PIN.");
    }
  };

  return (
    <>
      {/* ======== ESTILOS INTERNOS BONITOS ======== */}
      <style>{`
        body {
          background: linear-gradient(135deg, #0d6efd, #6610f2);
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: "Poppins", sans-serif;
        }

        .card-pin {
          background: #ffffff;
          max-width: 450px;
          padding: 30px;
          border-radius: 15px;
          box-shadow: 0 8px 20px rgba(0,0,0,0.15);
          animation: fadeIn 0.5s ease;
        }

        h2 {
          text-align: center;
          font-weight: 600;
          margin-bottom: 25px;
          color: #0d6efd;
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
          border-radius: 10px;
          font-size: 1.1rem;
          font-weight: 600;
          transition: 0.3s;
        }

        .btn-primary:hover {
          transform: scale(1.03);
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="container card-pin mt-5">
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

          <button className="btn btn-primary w-100">
            Guardar PIN
          </button>
        </form>

        {mensaje && <div className="alert alert-info mt-3">{mensaje}</div>}
      </div>
    </>
  );
};

export default ConfigPin;
