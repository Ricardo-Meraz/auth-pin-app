import React from "react";
import { useNavigate, Link } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const email = localStorage.getItem("pinEmail");

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="container mt-5">
      <h2>Bienvenido</h2>
      <p>{email}</p>

      <Link to="/config-pin" className="btn btn-warning w-100 mt-3">
        Configurar / Cambiar PIN
      </Link>

      <button onClick={logout} className="btn btn-danger w-100 mt-3">
        Cerrar sesión
      </button>
    </div>
  );
};

export default Dashboard;
