import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { FiCamera, FiMapPin } from "react-icons/fi";

import { Menu } from "../components/Menu";

import "./CadastroProblema.css";

export function Cadastro() {
    return (
        <div className="cadastro-container">

            {/* NAV */}
            <nav className="nav-card">
                <div className="nav-card-1">
                    <Link to={"/map"}>
                        <div><IoIosArrowBack size={20} /></div>
                    </Link>
                    <span>Novo Relato</span>
                </div>
            </nav>

            {/* CARD CENTRAL */}
            <div className="cadastro-card">

                <div className="cadastro-photo">
                    <div className="cadastro-photo-button">
                        <FiCamera size={34} />
                    </div>
                </div>

                {/* TÍTULO */}
                <label className="cad-label">TÍTULO</label>
                <input
                    className="cad-input"
                    placeholder="Vazamento de Água"
                />

                {/* DESCRIÇÃO */}
                <label className="cad-label">DESCRIÇÃO</label>
                <textarea
                    className="cad-textarea"
                    rows={4}
                    placeholder="Descreva o problema encontrado..."
                />

                {/* CATEGORIA */}
                <label className="cad-label">CATEGORIA</label>
                <div className="cad-categorias">
                    <div className="cad-categoria">Buracos</div>
                    <div className="cad-categoria cad-categoria-active">Vazamentos</div>
                    <div className="cad-categoria">Iluminação</div>
                </div>

                {/* CIDADE */}
                <label className="cad-label">CIDADE</label>
                <div className="cad-input-icon">
                    <FiMapPin size={18} />
                    <input
                        className="cad-input-no-style"
                        placeholder="Passo Fundo"
                    />
                </div>

                {/* ENDEREÇO */}
                <label className="cad-label">ENDEREÇO</label>
                <div className="cad-input-icon">
                    <FiMapPin size={18} />
                    <input
                        className="cad-input-no-style"
                        placeholder="Rua Dom Pedro II, Petrópolis"
                    />
                </div>

                {/* BOTÃO */}
                <button className="cad-botao">CRIAR RELATO</button>
            </div>

            <Menu />
        </div>
    );
}

export default Cadastro;

//