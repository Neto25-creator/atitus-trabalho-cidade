import { useAuth } from "../contexts/AuthContext";
import { Menu } from "../components/Menu";
import perfilFoto from "../assets/foto-perfil-jorge.webp";

import "./Profile.css";

export function Profile() {
    const { user } = useAuth();

    return (
        <div className="profile-overlay">
            
            <div className="profile-card">
                
                <div className="profile-photo">
                    <img src={perfilFoto} alt="foto-de-perfil" />
                </div>

                {user && (
                    <div className="profile-info">
                        <h2>Bem-vindo(a), {user.nome}</h2>
                        <h2>Seu email: {user.email}</h2>
                    </div>
                )}

            </div>

            <Menu />
        </div>
    );
}