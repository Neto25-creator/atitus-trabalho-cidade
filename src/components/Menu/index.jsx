import "./menu.css";
import { Link, useLocation } from "react-router-dom";

import { FaHome } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { IoMdNotifications } from "react-icons/io";
import { MdPeopleAlt } from "react-icons/md";
import { FaPlus } from "react-icons/fa";

export function Menu() {

    const { pathname } = useLocation();

    const isActive = (route) => pathname === route ? "active" : "";

    return (
        <div className="menu-container">
            <div className="menu-glass">

                <Link to="/map" className={`menu-item ${isActive("/map")}`}>
                    <FaHome />
                </Link>

                <Link to="/relatos" className={`menu-item ${isActive("/relatos")}`}>
                    <MdMessage />
                </Link>

                {/* BOTÃO CENTRAL FLUTUANTE */}
                <Link to="/cadastro-problema" className="menu-center-btn">
                    <FaPlus />
                </Link>

                <Link to="/notificacoes" className={`menu-item ${isActive("/notificacoes")}`}>
                    <IoMdNotifications />
                </Link>

                <Link to="/perfil" className={`menu-item ${isActive("/perfil")}`}>
                    <MdPeopleAlt />
                </Link>

            </div>
        </div>
    );
}