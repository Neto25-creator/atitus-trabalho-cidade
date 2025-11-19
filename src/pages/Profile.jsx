import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Menu } from "../components/Menu";
import { FaUserCircle } from "react-icons/fa";

import "./Profile.css";

export function Profile() {
    const { user } = useAuth();
    const [avatar, setAvatar] = useState(null);

 
    return (
        <div className="profile-overlay">
            <div className="profile-card">
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