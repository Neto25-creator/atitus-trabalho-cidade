import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

import { Menu } from "../components/Menu";

import "./Relatos.css"

export function Relatos(){
    return(
        <div className="relatos-container">
            <nav className="nav-card">
                <div className="nav-card-1">
                    <Link to={"/map"}><div><IoIosArrowBack size={20}/></div></Link>
                    <span>Relatos Cadastrados</span>
                </div>

                <div className="nav-card-2">
                    <div className="nav-card-2-section">
                        <span>Tudo</span>
                    </div>

                    <div className="nav-card-2-section">
                        <span>Buraco</span>
                    </div>

                    <div className="nav-card-2-section">
                        <span>Vazamento</span>
                    </div>

                    <div className="nav-card-2-section">
                        <span>Iluminação</span>
                    </div>
                </div>
            </nav>

            <div>
                <div className="nav-card-3">
                    <h3>Total 02 Relatos</h3>
                </div>

                <div className="relatos">
                    <section className="relatos-card">
                        <div className="relatos-card-img">
                            <img src="#" />
                        </div>

                        <div className="relatos-card-content">
                            <h4>Vazamento de água</h4>
                            <p>Rompimento na tubulação de abastecimento</p>
                        </div>

                        <div className="relatos-card-details">
                            <span>...</span>
                        </div>
                    </section>

                     <section className="relatos-card">
                        <div className="relatos-card-img">
                            <img src="#" />
                        </div>

                        <div className="relatos-card-content">
                            <h4>Buraco</h4>
                            <p>Presença de buraco de grande porte na via, dificultando tráfego...</p>
                        </div>

                        <div className="relatos-card-details">
                            <span>...</span>
                        </div>
                    </section>
                </div>
            </div>

            <Menu/>
        </div>
    )
}