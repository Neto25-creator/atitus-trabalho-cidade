import "./navbar.css";
import { useAuth } from "../../contexts/AuthContext";

import { FaConnectdevelop } from "react-icons/fa";

export function Navbar() {
    const { logout } = useAuth();

    return (
        <header className="navbar">
            <div className="navbar-div">
                <h2>Cidadão Conectado <FaConnectdevelop size={30}/></h2>
            </div>
            <button className="close" onClick={logout}>X</button>
        </header>
    );
}