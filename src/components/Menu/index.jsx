import "./menu.css"

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
                    <FaHome size={35}/>
                    <span>Home</span>
                </div>

                <div className="menu-card">
                    <MdMessage size={35}/>
                    <span>Relatos</span>
                </div>

                <div className="menu-card">
                    <FaCirclePlus size={50} color="#4a7be3"/>
                </div>
                
                <div className="menu-card">
                    <IoMdNotifications size={35}/>
                    <span>Notificações</span>
                </div>

                <div className="menu-card">
                   <MdPeopleAlt size={35}/>
                    <span>Perfil</span>
                </div>
            </div>
        </div>
    );
}