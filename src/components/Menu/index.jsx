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
                     <Link to={"/map"}><FaHome size={30}/></Link>
                     <Link to={"/map"}><span>Home</span></Link>
                </div>

                <div className="menu-card">
                    <Link to={"/relatos"}><MdMessage size={30}/></Link>
                    <Link to={"/relatos"}><span>Relatos</span></Link>
                </div>

                <div className="menu-card">
                    <Link to= {"/cadastro-problema"}><FaCirclePlus size={50} color="#4a7be3"/></Link>
                    <Link to={"/cadastro-problema"}><span>Cadastrar</span></Link>
                </div>
                
                <div className="menu-card">
<<<<<<< HEAD
                    <IoMdNotifications size={30}/>
                    <span>Notificações</span>
=======
                    <Link to={"/notificacoes"}><MdMessage size={35}/></Link>
                    <Link to={"/notificacoes"}><span>Notificações</span></Link>
>>>>>>> 3a4c3a0ba0b0a537d94c57e894a5b5feee13b06b
                </div>

                <div className="menu-card">
                   <Link to={"/perfil"}><MdPeopleAlt size={30}/></Link>
                    <Link to={"/perfil"}><span>Perfil</span></Link>
                </div>
            </div>
        </div>
    );
}