import "./menu.css"
import { Link } from "react-router-dom";

import { FaHome } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { IoMdNotifications } from "react-icons/io";
import { MdPeopleAlt } from "react-icons/md";
import { FaCirclePlus } from "react-icons/fa6";

export function Menu() {
    return (
        <div className="menu-container">
            <div className="menu">
                <div className="menu-card">
                     <Link to={"/map"}><FaHome size={35}/></Link>
                     <Link to={"/map"}><span>Home</span></Link>
                </div>

                <div className="menu-card">
                    <Link to={"/relatos"}><MdMessage size={35}/></Link>
                    <Link to={"/relatos"}><span>Relatos</span></Link>
                </div>

                <div className="menu-card">
                    <Link to= {"/cadastro-problema"}><FaCirclePlus size={50} color="#4a7be3"/></Link>
                    <Link to={"/cadastro-problema"}><span>Cadastrar</span></Link>
                </div>
                
                <div className="menu-card">
                    <Link to={"/notificacoes"}><MdMessage size={35}/></Link>
                    <Link to={"/notificacoes"}><span>Notificações</span></Link>
                </div>

                <div className="menu-card">
                   <MdPeopleAlt size={35}/>
                    <span>Perfil</span>
                </div>
            </div>
        </div>
    );
}