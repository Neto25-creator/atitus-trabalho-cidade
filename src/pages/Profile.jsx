import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom"
import { IoIosArrowBack } from "react-icons/io";

import { Menu } from "../components/Menu";
import perfilFoto from "../assets/foto-perfil-jorge.webp"

import "./Profile.css"

export function Profile(){
    const { user } = useAuth()

    return(
        <div className="profile-container">
            <nav>
                <div className="nav-card-1">
                    <Link to={"/map"}><div><IoIosArrowBack size={20}/></div></Link>
                    <span>Informação Pessoal</span>
                </div>
            </nav>

            <div className="profile-card">
                <div className="profile-card-1">
                    <div className="profile">
                        <img src={perfilFoto} alt="foto-de-perfil" />
                    </div>
                    {user && (
                        <div className="profile-card-2">
                            <h2>Bem-vindo {user.nome}</h2>
                            <h2>Seu email: {user.email}</h2>
                        </div>
                    )}
                </div>

                <div>
                    <div>
                        <div>

                        </div>

                        <div>

                        </div>
                    </div>
                </div>
            </div>

            <Menu/>
        </div>
    )
}

