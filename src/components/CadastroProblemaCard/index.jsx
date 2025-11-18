import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { FiMapPin } from "react-icons/fi";
import "./cadastroProblemaCard.css";

export function CadastroProblemaCard({position, onClose, addressData}){
    const [fileName, setFileName] = useState(null);

    const lat = position ? position.lat : '';
    const lng = position ? position.lng : '';

    const { city, fullAddress } = addressData;

      function handleFileChange(e) {
        const file = e.target.files[0];
        if (file) setFileName(file.name);
      }

    if (!position) return null;

    return(
        <div className="page-container">
      
      <div className="form-box">
        
        {/* NAV */}
        <nav className="nav">
            <span className="nav-title">Novo Relato</span>
            <button onClick={onClose}><IoMdClose size={23}/></button>
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
              {["Segurança", "Infraestrutura", "Saneamento", "Outros"].map((c, i) => (
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
              <input className="input-no-bg" placeholder="Passo Fundo" value={city} readOnly/>
            </div>
          </div>

          {/* ENDEREÇO */}
          <div className="grid-item full">
            <label className="label">Endereço</label>
            <div className="input-icon-wrapper">
              <FiMapPin size={18} />
              <input className="input-no-bg" placeholder="Rua Dom Pedro II, Petrópolis" value={fullAddress} readOnly/>
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

    </div>
    )
}