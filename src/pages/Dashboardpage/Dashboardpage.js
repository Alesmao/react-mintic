import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';
import {auth} from '../../firebase';



function DashboardPage() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
   
      <div
        style={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(to bottom, #cbbcf6, #a3bafc)',
          fontFamily: 'Arial, sans-serif',
          color: '#333',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '48px', marginBottom: '10px' }}>Bienvenido a mi página</h1>
          <p style={{ fontSize: '20px', marginBottom: '20px' }}>
            {user && user.email}
          </p>
          <div style={{ marginTop: '30px' }}>
            <button
              onClick={handleLogout}
              style={{
                padding: '10px 20px',
                fontSize: '16px',
                backgroundColor: 'white',
                border: '2px solid #333',
                borderRadius: '6px',
                cursor: 'pointer',
                transition: '0.3s',
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#eee'}
              onMouseOut={(e) => e.target.style.backgroundColor = 'white'}
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>
    );
    
}

export default DashboardPage;
