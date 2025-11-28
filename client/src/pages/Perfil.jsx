import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom'; 
import "./Perfil.css";

const getTranslatedRole = (role) => {
    switch (role) {
        case 'admin':
            return 'Admin';
        case 'user':
            return 'Cliente';
        default:
            return 'Invitado';
    }
};

export default function Perfil() {
  const { token, getAuthHeaders, isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [avatarFile, setAvatarFile] = useState(null);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
        navigate("/login");
        return;
    }

    const fetchProfile = async () => {
      setLoading(true);
      setAlert(null);
      
      try {
        const res = await fetch("http://localhost:4000/auth/profile", {
          headers: getAuthHeaders() 
        });

        if (res.status === 401) {
            logout(); 
            navigate("/login");
            throw new Error("Sesión expirada.");
        }

        const data = await res.json();
        
        if (!res.ok) {
            throw new Error(data.message || "Error al cargar el perfil.");
        }

        setUserProfile(data.user);
      } catch (error) {
        setAlert({ type: "error", msg: error.message || "Error de conexión." });
      } finally {
        setLoading(false);
      }
    };
    
    if(token) {
        fetchProfile();
    }
  }, [isAuthenticated, token, navigate, logout, getAuthHeaders]);


  const handleUpload = async () => {
    if (!avatarFile) {
      setAlert({ type: "error", msg: "Seleccioná una imagen primero" });
      return;
    }
    
    const formData = new FormData();
    formData.append("avatar", avatarFile);

    try {
      const res = await fetch("http://localhost:4000/auth/upload-avatar", {
        method: "PUT",
        headers: { 
          Authorization: `Bearer ${token}` 
        },
        body: formData
      });

      const data = await res.json();

      if (!res.ok) {
        setAlert({ type: "error", msg: data.message || "Error al subir avatar" });
        return;
      }

      setAlert({ type: "success", msg: "Avatar actualizado correctamente" });
      setUserProfile(prev => ({ ...prev, avatar: data.avatar }));

    } catch (error) {
      setAlert({ type: "error", msg: "Error interno al subir avatar" });
    }
  };


  if (loading || !userProfile) return <h2>Cargando...</h2>;

  return (
    <div className="profile-page">
      <div className="profile-box">
        <div className="profile-card">
          <h1>Mi Perfil</h1>

          {alert && (
            <div className={`alert alert-${alert.type}`}>
              {alert.msg}
            </div>
          )}

          <div className="profile-avatar-wrapper">
            {userProfile.avatar ? (
              <img
                src={`http://localhost:4000${userProfile.avatar}`} 
                alt="Avatar"
                className="profile-avatar"
              />
            ) : (
              <p>Sin foto de perfil</p>
            )}
          </div>

          <div className="profile-info">
            <p className="profile-role-tag">
                <strong>{getTranslatedRole(userProfile.role)}</strong>
            </p>
            <p><strong>Nombre:</strong> {userProfile.name}</p>
            <p><strong>Email:</strong> {userProfile.email}</p>
          </div>

          <input
            type="file"
            accept="image/*"
            className="profile-file"
            onChange={(e) => setAvatarFile(e.target.files[0])}
          />

          <button className="profile-btn" onClick={handleUpload}>
            Subir / Cambiar Avatar
          </button>
        </div>
      </div>
    </div>
  );
}