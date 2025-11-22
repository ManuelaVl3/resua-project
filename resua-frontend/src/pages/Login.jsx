import React, { useState } from 'react'
import TopBar from '../components/layout/TopBar'
import Button from '../components/common/Button'
import ErrorMessage from '../components/common/ErrorMessage'
import Alert from '../components/common/Alert'
import AuthService from '../services/AuthService'
import { theme } from '../styles/theme'

const Login = () => {
  const authService = new AuthService()
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [emailError, setEmailError] = useState('')
  const [emailTouched, setEmailTouched] = useState(false)
  const [loginError, setLoginError] = useState('')
  const [loginSuccess, setLoginSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleEmailChange = (e) => {
    const value = e.target.value
    setEmail(value)
    
    if (emailTouched && value.length > 0) {
      if (!validateEmail(value)) {
        setEmailError('El formato del correo electrónico no es válido')
      } else {
        setEmailError('')
      }
    }
  }

  const handleEmailBlur = () => {
    setEmailTouched(true)
    if (email.length > 0 && !validateEmail(email)) {
      setEmailError('El formato del correo electrónico no es válido')
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    
    // Limpiar mensajes previos
    setLoginError('')
    setLoginSuccess(false)
    
    // Validar email
    if (!validateEmail(email)) {
      setEmailError('El formato del correo electrónico no es válido')
      setEmailTouched(true)
      return
    }
    
    // Validar contraseña
    if (!password) {
      setLoginError('Por favor, ingresa tu contraseña')
      return
    }
    
    setIsLoading(true)
    
    try {
      // Llamar al servicio de autenticación
      const response = await authService.login(email, password)
      
      // Verificar si el login fue exitoso
      if (response.success) {
        // Login exitoso
        setLoginSuccess(true)
        
        console.log('Usuario autenticado:', response)
        
        // Redirigir después de 1.5 segundos
        setTimeout(() => {
          window.location.href = '/profile'
        }, 1500)
      } else {
        // El backend respondió pero no fue exitoso
        throw new Error(response.message || 'Error al iniciar sesión')
      }
      
    } catch (error) {
      console.error('Error de login:', error)
      
      // Mostrar mensaje de error apropiado
      if (error.response && error.response.status === 401) {
        setLoginError('Usuario o contraseña incorrectos. Por favor, verifica tus datos.')
      } else if (error.response && error.response.status === 404) {
        setLoginError('Usuario no encontrado. ¿Necesitas crear una cuenta?')
      } else {
        setLoginError('Error al iniciar sesión. Por favor, intenta de nuevo.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleCreateAccount = () => {
    window.location.href = '/register'
  }

  const handleResetPassword = () => {
    window.location.href = '/forgot-password'
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: "white",
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Header */}
      <TopBar />

      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: '60px',
        paddingBottom: '40px',
        paddingLeft: '20px',
        paddingRight: '20px'
      }}>
        <div style={{
          backgroundColor: theme.colors.white,
          padding: '40px 40px',
          maxWidth: '450px',
          width: '100%'
        }}>
          <h1 style={{
            fontSize: '32px',
            fontWeight: 600,
            color: theme.colors.primary,
            marginBottom: '32px',
            textAlign: 'center',
            fontFamily: theme.fonts.primary,
            padding: '48px',
          }}>
            Bienvenid@ 👋
          </h1>

          {/* Mensaje de éxito de login */}
          <Alert
            type="success"
            message="¡Inicio de sesión exitoso! Redirigiendo..."
            show={loginSuccess}
          />

          {/* Mensaje de error de login */}
          <Alert
            type="error"
            message={loginError}
            show={!!loginError}
            onClose={() => setLoginError('')}
          />

          <form onSubmit={handleLogin}>
            {/* Campo Email con validación */}
            <div style={{ marginBottom: '16px' }}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
                onBlur={handleEmailBlur}
                required
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: `1px solid ${emailError ? theme.colors.error : theme.colors.disabled}`,
                  borderRadius: '15px',
                  fontSize: '16px',
                  fontFamily: theme.fonts.primary,
                  backgroundColor: theme.colors.white,
                  color: theme.colors.primary,
                  boxSizing: 'border-box'
                }}
              />
              <ErrorMessage 
                message={emailError} 
                show={!!emailError}
              />
            </div>

            <div style={{ position: 'relative', marginBottom: '16px' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '12px 50px 12px 16px',
                  border: `1px solid ${theme.colors.disabled}`,
                  borderRadius: '15px',
                  fontSize: '16px',
                  fontFamily: theme.fonts.primary,
                  backgroundColor: theme.colors.white,
                  color: theme.colors.primary,
                  boxSizing: 'border-box'
                }}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                style={{
                  position: 'absolute',
                  right: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: theme.colors.disabled,
                  transition: 'color 0.3s ease'
                }}
                onMouseOver={(e) => e.currentTarget.style.color = theme.colors.primary}
                onMouseOut={(e) => e.currentTarget.style.color = theme.colors.disabled}
              >
                {showPassword ? (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path 
                      d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path 
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                    <path 
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </button>
            </div>

            <div style={{
              marginBottom: '24px',
              textAlign: 'left'
            }}>
              <a
                onClick={handleResetPassword}
                style={{
                  color: theme.colors.primary,
                  fontSize: '14px',
                  cursor: 'pointer',
                  textDecoration: 'none',
                  fontFamily: theme.fonts.primary,
                  transition: 'opacity 0.3s ease'
                }}
                onMouseOver={(e) => e.target.style.opacity = '0.7'}
                onMouseOut={(e) => e.target.style.opacity = '1'}
              >
                Restablecer contraseña
              </a>
            </div>

            <Button
              type="submit"
              variant="primary"
              disabled={isLoading}
              style={{
                width: '100%',
                marginBottom: '24px',
                backgroundColor: theme.colors.disabled,
                fontSize: '16px',
                fontWeight: 600,
                opacity: isLoading ? 0.7 : 1
              }}
            >
              {isLoading ? 'Ingresando...' : 'Ingresar'}
            </Button>
          </form>

          <div style={{
            textAlign: 'center'
          }}>
            <p style={{
              color: theme.colors.primary,
              fontSize: '14px',
              marginBottom: '16px',
              fontFamily: theme.fonts.primary
            }}>
              ¿No te has registrado aún?
            </p>

            <Button
              variant="primary"
              onClick={handleCreateAccount}
              style={{
                width: '100%',
                backgroundColor: theme.colors.disabled,
                fontSize: '16px',
                fontWeight: 600
              }}
            >
              Crear cuenta
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login

