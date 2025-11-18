import React, { useEffect, useState, useRef } from "react";
import { IoMdClose } from "react-icons/io";
import { useAuth } from "../../contexts/AuthContext";
import { FaUserCircle } from "react-icons/fa";
import { Button } from "../Button";
import "../../pages/Profile.css";

export function ProfileCard({ visible, onClose }) {
  const { user, logout } = useAuth();
  const [avatar, setAvatar] = useState(null);
  const fileRef = useRef();

  useEffect(() => {
    const storedAvatar = localStorage.getItem("profile_avatar");
    if (storedAvatar) setAvatar(storedAvatar);
  }, []);

  function handleAvatarChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result;
      setAvatar(dataUrl);
      localStorage.setItem("profile_avatar", dataUrl);
    };
    reader.readAsDataURL(file);
  }

  function handleLogout() {
    logout();
    onClose?.();
  }

  if (!visible) return null;

  return (
    <div className="page-container">
      <div className="form-box profile-form-box">
        <nav className="nav">
          <span className="nav-title">Perfil</span>
          <button onClick={onClose} style={{ marginLeft: 'auto', background: 'transparent', border: 'none', cursor: 'pointer' }}>
            <IoMdClose size={22} />
          </button>
        </nav>

        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, width: '100%'}}>
          <div className="profile-photo profile-photo--large">
            {avatar ? (
              <img src={avatar} alt="foto-de-perfil" />
            ) : (
              <div className="profile-icon"><FaUserCircle size={92} color="#9aa4b2" /></div>
            )}
          </div>

          <h2 style={{margin:0}}>{user?.nome || 'Usuário'}</h2>
          <p className="muted" style={{marginTop:0}}>{user?.email || '-'}</p>

          <label className="upload-button" style={{display:'block', textAlign:'center', marginTop:8, cursor:'pointer', width:'100%'}} onClick={() => fileRef.current?.click()}>
            Alterar foto
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="file-input"
            />
          </label>

          <button className="submit-button danger" style={{marginTop:8}} onClick={() => { setAvatar(null); localStorage.removeItem('profile_avatar'); }}>
            Remover foto
          </button>

          <button className="submit-button danger" style={{marginTop:8, background:'#e74c3c'}} onClick={handleLogout}>
            Sair da conta
          </button>
        </div>

      </div>
    </div>
  );
}

export default ProfileCard;
