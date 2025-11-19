import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Menu } from "../components/Menu";
import { FaUserCircle } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";

import "./Profile.css";

export function Profile() {
    const { user } = useAuth();
    const [avatar, setAvatar] = useState(null);

 
    return (
        <div className="profile-overlay">
            <div className="profile-card">
                {user && (
                    <div className="profile-info">
                        <CgProfile size={100} color="#4a7be3" className="foto-perfil"/>
                        <h2>Bem-vindo(a), {user.nome}</h2>
                        <h2>Seu email: {user.email}</h2>
                    </div>
                )}
            </div>

            <Menu />
        </div>
    );
}