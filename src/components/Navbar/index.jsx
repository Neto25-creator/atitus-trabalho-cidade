import "./navbar.css";
import { useAuth } from "../../contexts/AuthContext";
import { FaConnectdevelop } from "react-icons/fa";

export function Navbar() {
    const { logout } = useAuth();

    return (
        <header className="navbar-new">
            <div className="navbar-left">
                <FaConnectdevelop size={28} className="navbar-icon" />
                <h1 className="navbar-title">Cidadão Conectado</h1>
            </div>

            <button className="navbar-logout" onClick={logout}>
                Sair
            </button>
        </header>
    );
}