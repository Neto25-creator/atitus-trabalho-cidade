import React, { useState } from "react";
import { Logo, Title, Input, Button } from "../components";
import { signIn } from "../services/authService";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { AuthCarousel } from "./AuthCarousel";
import "./AuthPages.css";

export function Login() {
  const [name, setName] = useState(localStorage.getItem("user_name_temp") || "");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");
    try {
      const token = await signIn(email, senha);
      login(token);
      navigate("/map");
    } catch (err) {
      setErro(err.message);
    }
  };

  const handleNameChange = (e) => {
    const newName = e.target.value;
    setName(newName)
    localStorage.setItem("user_name_temp", newName)
  }

  return (
    <div className="auth-page">
      <div className="auth-box">
        <div className="auth-left">
           <Logo />
          <AuthCarousel />
        </div>

        <div className="auth-right">
          <div className="auth-form">
            <Title title="Login" />
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <Input
                  id="name"
                  label="Nome"
                  placeholder="Digite seu nome..."
                  type="text"
                  required
                  value={name}
                  onChange={handleNameChange}
                  />
              </div>


              <div className="input-group">
                <Input
                  label="Email"
                  placeholder="Digite seu email..."
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="input-group">
                <Input
                  label="Senha"
                  placeholder="Digite sua senha..."
                  type="password"
                  required
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                />
                <div className="form-links">
                  <Link to="/" className="forgot-link">
                    Esqueceu a senha?
                  </Link>
                </div>
              </div>

              {erro && <p className="error-text">{erro}</p>}

              <div className="button-area">
                <Button type="submit" className="auth-btn">
                  Entrar
                </Button>
              </div>
            </form>

            <p className="switch-text">
              Não tem uma conta?{" "}
              <Link to="/register" className="switch-link">
                Criar
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
