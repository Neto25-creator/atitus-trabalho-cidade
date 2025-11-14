import { Link } from "react-router-dom"
import { IoIosArrowBack } from "react-icons/io";

import { Menu } from "../components/Menu";
import perfilFoto from "../assets/foto-perfil-jorge.webp"

import "./Profile.css"

export function Profile(){
    return(
        <div>
            <nav>
                <div className="nav-card-1">
                    <Link to={"/map"}><div><IoIosArrowBack size={20}/></div></Link>
                    <span>Informação Pessoal</span>
                </div>
            </nav>

            <div>
                <div>
                    <div className="profile">
                        <img src={perfilFoto} alt="foto-de-perfil" />
                    </div>
                    <h2>Jorge</h2>
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