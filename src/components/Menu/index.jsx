

import "./menu.css";
import { Link, useLocation } from "react-router-dom";

import { FaHome } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { IoMdNotifications } from "react-icons/io";
import { MdPeopleAlt } from "react-icons/md";
import { FaPlus } from "react-icons/fa";


export function Menu({ handleCenterClick }) { 

    const { pathname } = useLocation();
    const isActive = (route) => pathname === route ? "active" : "";

    return (
        <div className="menu-container">
            <div className="menu-glass">

 
                <Link 
                    to="/map" 
                    className={`menu-item icon-home ${isActive("/map")}`}
                >
                    <FaHome />
                </Link>


                <Link 
                    to="/relatos" 
                    className={`menu-item icon-relatos ${isActive("/relatos")}`}
                >
                    <MdMessage />
                </Link>

                <Link to={"/map"}><button 
                    className="menu-center-btn" 
                    onClick={handleCenterClick} 
                > 
                    <FaPlus />
                </button></Link>


                <Link 
                    to="/notificacoes" 
                    className={`menu-item icon-notificacoes ${isActive("/notificacoes")}`}
                >
                    <IoMdNotifications />
                </Link>

                <Link 
                    to="/perfil" 
                    className={`menu-item icon-perfil ${isActive("/perfil")}`}
                >
                    <MdPeopleAlt />
                </Link>

            </div>
        </div>
    );
}