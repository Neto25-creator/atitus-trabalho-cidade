import { useState } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { FiMapPin } from "react-icons/fi";
import { Menu } from "../components/Menu";
import "./CadastroProblema.css";

export default function CadastroProblema() {
  const [fileName, setFileName] = useState(null);

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (file) setFileName(file.name);
  }

  return (
    <div className="page-container">
      
      <div className="form-box">
        
        {/* NAV */}
        <nav className="nav">
          <Link to={"/map"} className="back-button">
            <IoIosArrowBack size={22} />
          </Link>
          <span className="nav-title">Novo Relato</span>
        </nav>

        {/* UPLOAD */}
        <div className="upload-area">
          <label className="upload-button">
            Escolher Foto
            <input 
              type="file"
              accept="image/*"
              className="file-input"
              onChange={handleFileChange}
            />
          </label>

          {fileName && (
            <p className="file-name">
              Arquivo selecionado: <span>{fileName}</span>
            </p>
          )}
        </div>

        {/* GRID */}
        <div className="grid">

          {/* TÍTULO */}
          <div className="grid-item full">
            <label className="label">Título do Problema</label>
            <input className="input" placeholder="Ex: Vazamento de água" />
          </div>

          {/* CATEGORIAS */}
          <div className="grid-item">
            <label className="label">Categoria</label>

            <div className="category-group">
              {["Buracos", "Vazamentos", "Iluminação", "Saneamento", "Outros"].map((c, i) => (
                <button key={i} className="category-button">
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* CIDADE */}
          <div className="grid-item">
            <label className="label">Cidade</label>
            <div className="input-icon-wrapper">
              <FiMapPin size={18} />
              <input className="input-no-bg" placeholder="Passo Fundo" />
            </div>
          </div>

          {/* ENDEREÇO */}
          <div className="grid-item full">
            <label className="label">Endereço</label>
            <div className="input-icon-wrapper">
              <FiMapPin size={18} />
              <input className="input-no-bg" placeholder="Rua Dom Pedro II, Petrópolis" />
            </div>
          </div>

          {/* DESCRIÇÃO */}
          <div className="grid-item full">
            <label className="label">Descrição</label>
            <textarea className="textarea" rows={5} placeholder="Descreva o problema encontrado..." />
          </div>
        </div>

        {/* BOTÃO */}
        <button className="submit-button">
          Criar Relato
        </button>
      </div>

      <Menu />
    </div>
  );
}