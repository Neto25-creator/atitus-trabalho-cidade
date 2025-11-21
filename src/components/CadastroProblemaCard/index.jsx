import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { FiMapPin } from "react-icons/fi";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import "./cadastroProblemaCard.css";

export function CadastroProblemaCard({ position, onClose, addressData, onSubmit }) {
    const { city, fullAddress } = addressData || {}; 

    const [fileName, setFileName] = useState(null);
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');

    const [sent, setSent] = useState(false);

    const lat = position?.lat || '';
    const lng = position?.lng || '';

    function handleFileChange(e) {
        const file = e.target.files[0];
        if (file) setFileName(file.name);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !description || !category) {
            alert("Por favor, preencha Título, Descrição e Categoria.");
            return;
        }

        await onSubmit(title, description, category, fileName); 
        setSent(true);
    };

    if (sent) {
        return (
            <div className="page-container success-container">
                <nav className="nav">
                    <span className="nav-title">Relato Enviado</span>
                    <button type="button" onClick={onClose}><IoMdClose size={23}/></button>
                </nav>

                <div className="success-content">
                    <IoCheckmarkCircleOutline className="success-icon" />
                </div>
            </div>
        );
    }

    return(
        <div className="page-container">
            <form className="form-box" onSubmit={handleSubmit}>
            
                <nav className="nav">
                    <span className="nav-title">Novo Relato</span>
                    <button type="button" onClick={onClose}><IoMdClose size={23}/></button>
                </nav>

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

                <div className="grid">
                    <div className="grid-item full">
                        <label className="label">Título do Problema</label>
                        <input 
                            className="input" 
                            placeholder="Ex: Vazamento de água" 
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div className="grid-item">
                        <label className="label">Categoria</label>
                        <div className="category-group">
                            {["Segurança", "Infraestrutura","Saneamento", "Outros"].map((c, i) => (
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

                    <div className="grid-item">
                        <label className="label">Cidade</label>
                        <div className="input-icon-wrapper">
                            <FiMapPin size={18} />
                            <input className="input-no-bg" placeholder="Passo Fundo" value={city || 'Carregando...'} readOnly/>
                        </div>
                    </div>

                    <div className="grid-item full">
                        <label className="label">Endereço</label>
                        <div className="input-icon-wrapper">
                            <FiMapPin size={18} />
                            <input className="input-no-bg" placeholder="Rua Dom Pedro II, Petrópolis" value={fullAddress || 'Carregando...'} readOnly/>
                        </div>
                    </div>

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

                <button type="submit" className="submit-button">
                    Criar Relato
                </button>
            </form>
        </div>
    )
}