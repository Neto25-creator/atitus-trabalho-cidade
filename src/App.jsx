import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Map } from "./pages/Map";
import { Relatos } from "./pages/Relatos";
import { PrivateRoute } from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/map"
          element={
              <Map />
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
        <Route path="/relatos" element={<Relatos/>} />
      </Routes>
    </Router>
  );
}

export default App;
