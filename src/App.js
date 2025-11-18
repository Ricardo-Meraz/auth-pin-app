import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import LoginPin from "./pages/LoginPin";
import Dashboard from "./pages/Dashboard";
import ConfigPin from "./pages/ConfigPin";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login-pin" element={<LoginPin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/config-pin" element={<ConfigPin />} />
      </Routes>
    </Router>
  );
}

export default App;
