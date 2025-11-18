import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { FiMapPin } from "react-icons/fi";
import "./cadastroProblemaCard.css";

// ASSINATURA REVISADA: Recebe 'position' (objeto) e addressData (pode ser null/loading)
export function CadastroProblemaCard({ position, onClose, addressData, onSubmit }) {
    
    // Tratamento de erro: fallback para objeto vazio para evitar o TypeError
    // O Map.jsx garante que addressData não seja undefined, mas o fallback é bom
    const { city, fullAddress } = addressData || {}; 

    // Estados para controlar os campos do formulário
    const [fileName, setFileName] = useState(null);
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');

    // Acessando lat/lng do objeto 'position'
    const lat = position?.lat || '';
    const lng = position?.lng || '';

    function handleFileChange(e) {
        const file = e.target.files[0];
        if (file) setFileName(file.name);
    }
    
    // Função para lidar com a submissão
    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Verificação mínima
        if (!title || !description || !category) {
            alert("Por favor, preencha Título, Descrição e Categoria.");
            return;
        }

        // Chama a função passada pelo Map.jsx (que fará a requisição POST)
        onSubmit(title, description, category, fileName); 
    };

    // REMOVIDO: a condição 'if (!position) return null;' pois o Map.jsx já controla isso.

    return(
        <div className="page-container">
            {/* Adicionando onSubmit ao form */}
            <form className="form-box" onSubmit={handleSubmit}>
            
                {/* NAV */}
                <nav className="nav">
                    <span className="nav-title">Novo Relato</span>
                    <button type="button" onClick={onClose}><IoMdClose size={23}/></button>
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
                        <input 
                            className="input" 
                            placeholder="Ex: Vazamento de água" 
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    {/* CATEGORIAS */}
                    <div className="grid-item">
                        <label className="label">Categoria</label>
                        <div className="category-group">
                            {["Buracos", "Vazamentos", "Iluminação", "Saneamento", "Outros"].map((c, i) => (
                                <button 
                                    key={i} 
                                    type="button" 
                                    className={`category-button ${category === c ? 'selected' : ''}`}
                                    onClick={() => setCategory(c)}
                                >
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
                            {/* Usa city do addressData, com fallback para 'Carregando...' enquanto o Reverse Geocoding roda */}
                            <input className="input-no-bg" placeholder="Passo Fundo" value={city || 'Carregando...'} readOnly/>
                        </div>
                    </div>

                    {/* ENDEREÇO */}
                    <div className="grid-item full">
                        <label className="label">Endereço</label>
                        <div className="input-icon-wrapper">
                            <FiMapPin size={18} />
                            {/* Usa fullAddress do addressData */}
                            <input className="input-no-bg" placeholder="Rua Dom Pedro II, Petrópolis" value={fullAddress || 'Carregando...'} readOnly/>
                        </div>
                    </div>

                    {/* DESCRIÇÃO */}
                    <div className="grid-item full">
                        <label className="label">Descrição</label>
                        <textarea 
                            className="textarea" 
                            rows={5} 
                            placeholder="Descreva o problema encontrado..." 
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                </div>

                {/* BOTÃO SUBMIT */}
                <button type="submit" className="submit-button">
                    Criar Relato
                </button>
            </form>

        </div>
    )
}