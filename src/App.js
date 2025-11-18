import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import LoginPin from "./pages/LoginPin";
import Dashboard from "./pages/Dashboard";
import ConfigPin from "./pages/ConfigPin";

import ForgotPassword from "./pages/ForgotPassword"; 
import VerifyCode from "./pages/VerifyCode";          
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <Router>
      <Routes>
        {/* LOGIN NORMAL */}
        <Route path="/" element={<Login />} />

        {/* REGISTRO */}
        <Route path="/register" element={<Register />} />

        {/* LOGIN CON PIN */}
        <Route path="/login-pin" element={<LoginPin />} />

        {/* DASHBOARD */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* CONFIGURAR / CAMBIAR PIN */}
        <Route path="/config-pin" element={<ConfigPin />} />

        {/* RECUPERAR CONTRASEÑA */}
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* VERIFICAR CÓDIGO */}
        <Route path="/verify-code" element={<VerifyCode />} />

        {/* RESTABLECER CONTRASEÑA */}
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
