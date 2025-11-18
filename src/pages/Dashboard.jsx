import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const email = localStorage.getItem("pinEmail");

  useEffect(() => {
    // Si no hay sesión -> regresar al login
    if (!email) {
      navigate("/");
    }
  }, [email, navigate]);

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      {/* ======== ESTILOS INTERNOS DEL DASHBOARD ======== */}
      <style>{`
        body {
          background: linear-gradient(135deg, #6f42c1, #0d6efd);
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          font-family: "Poppins", sans-serif;
          padding: 20px;
        }

        .dash-card {
          background: #ffffff;
          max-width: 430px;
          width: 100%;
          padding: 30px;
          border-radius: 18px;
          box-shadow: 0 8px 25px rgba(0,0,0,0.15);
          animation: fadeIn 0.6s ease;
          text-align: center;
        }

        h2 {
          font-weight: 700;
          color: #0d6efd;
          margin-bottom: 10px;
        }

        .email-box {
          background: #eef2ff;
          padding: 12px;
          font-size: 1rem;
          border-radius: 10px;
          margin-bottom: 25px;
          border: 1px solid #cdd7ff;
        }

        .btn {
          padding: 12px;
          font-size: 1.1rem;
          border-radius: 12px !important;
          font-weight: 600;
          transition: 0.3s;
        }

        .btn:hover {
          transform: scale(1.03);
          opacity: 0.9;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="dash-card">
        <h2>Bienvenido</h2>

        <div className="email-box">{email}</div>

        <Link to="/config-pin" className="btn btn-warning w-100 mt-2">
          Configurar / Cambiar PIN
        </Link>

        <button onClick={logout} className="btn btn-danger w-100 mt-3">
          Cerrar sesión
        </button>
      </div>
    </>
  );
};

export default Dashboard;
