import React, { useState, useEffect } from 'react'
import AuthService from '../../services/AuthService'
import { theme } from '../../styles/theme'

const TopBar = () => {
  const authService = new AuthService()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Verificar si el usuario está autenticado
    setIsAuthenticated(authService.isAuthenticated())
  }, [])

  const handleUserIconClick = () => {
    if (isAuthenticated) {
      // Si está autenticado, cerrar sesión
      authService.logout()
    } else {
      // Si no está autenticado, ir al login
      window.location.href = '/login'
    }
  }

  const handleRegistrosClick = () => {
    window.location.href = '/search-observation'
  }

  const handleLogoClick = () => {
    window.location.href = '/'
  }

  return (
    <header 
      style={{
        backgroundColor: theme.colors.primary,
        padding: '16px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}
    >
      {/* Logo/Nombre de la app */}
      <div 
        onClick={handleLogoClick}
        style={{ 
          color: theme.colors.light,
          cursor: 'pointer',
          transition: 'opacity 0.3s ease'
        }}
        onMouseOver={(e) => e.currentTarget.style.opacity = '0.8'}
        onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
      >
        <h1 style={{ 
          fontSize: '24px', 
          fontWeight: 600, 
          margin: 0,
          color: theme.colors.light
        }}>
          RESUA
        </h1>
      </div>

      {/* Navegación y usuario */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '40px',
        color: theme.colors.light 
      }}>
        <span 
          onClick={handleRegistrosClick}
          style={{ 
          fontSize: '16px',
            color: theme.colors.light,
            cursor: 'pointer',
            transition: 'opacity 0.3s ease'
          }}
          onMouseOver={(e) => e.currentTarget.style.opacity = '0.8'}
          onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
        >
          Registros
        </span>
        
        {/* Icono de usuario o logout */}
        <div 
          onClick={handleUserIconClick}
          style={{
          width: '32px',
          height: '32px',
          backgroundColor: theme.colors.light,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
            cursor: 'pointer',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'scale(1.1)'
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'scale(1)'
            e.currentTarget.style.boxShadow = 'none'
          }}
        >
          {isAuthenticated ? (
            // Icono de logout si está autenticado
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9M16 17L21 12M21 12L16 7M21 12H9" 
                stroke={theme.colors.primary}
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            // Icono de usuario si NO está autenticado
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" 
              fill={theme.colors.primary}
            />
            <path 
              d="M12 14C7.58172 14 4 17.5817 4 22H20C20 17.5817 16.4183 14 12 14Z" 
              fill={theme.colors.primary}
            />
          </svg>
          )}
        </div>
      </div>
    </header>
  )
}

export default TopBar
