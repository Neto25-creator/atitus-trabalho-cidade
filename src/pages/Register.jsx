import React, { useState } from "react";
import { Logo, Title, Input, Button } from "../components";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../services/authService";
import { AuthCarousel } from "./AuthCarousel";
import "./AuthPages.css";

export function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");
    try {
      await signUp(name, email, senha);
      navigate("/login");
    } catch (err) {
      setErro(err.message);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-box">

        <div className="auth-left">
             <Logo />
          <AuthCarousel />
        </div>

  
        <div className="auth-right">
          <div className="auth-form">
            
            <Title title="Crie sua conta" />

            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <Input
                  label="Nome"
                  placeholder="Digite seu nome..."
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
              </div>

              {erro && <p className="error-text">{erro}</p>}

              <div className="button-area">
                <Button type="submit" className="auth-btn">
                  Cadastrar
                </Button>
              </div>
            </form>

            <p className="switch-text">
              Já tem uma conta?{" "}
              <Link to="/login" className="switch-link">
                Faça login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
