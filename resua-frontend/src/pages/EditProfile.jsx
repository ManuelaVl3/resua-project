import React, { useState, useEffect } from 'react'
import TopBar from '../components/layout/TopBar'
import Input from '../components/common/Input'
import SaveButton from '../components/common/SaveButton'
import CancelButton from '../components/common/CancelButton'
import Alert from '../components/common/Alert'
import AuthService from '../services/AuthService'
import { theme } from '../styles/theme'

const EditProfile = () => {
  const authService = new AuthService()
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  })
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState('')
  const [loading, setLoading] = useState(true)
  const [originalData, setOriginalData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  })

  useEffect(() => {
    const loadUserData = async () => {
      const userId = localStorage.getItem('userId')
      
      if (!userId) {
        window.location.href = '/login'
        return
      }

      try {
        setLoading(true)
        console.log('Cargando datos del usuario con userId:', userId)
        const userData = await authService.getUserById(userId)
        console.log('Datos recibidos del backend:', userData)
        
        const initialData = {
          firstName: userData.name || '',
          lastName: userData.lastName || '',
          email: userData.email || ''
        }
        
        console.log('Datos mapeados para el formulario:', initialData)
        setFormData(initialData)
        setOriginalData(initialData)
      } catch (error) {
        console.error('Error al cargar datos del usuario:', error)
        if (error.response) {
          console.error('Respuesta del error:', error.response.data)
          console.error('Status del error:', error.response.status)
        }
        setShowError('Error al cargar tus datos. Por favor, intenta de nuevo.')
      } finally {
        setLoading(false)
      }
    }

    loadUserData()
  }, [])

  const hasChanges = () => {
    return (
      formData.firstName !== originalData.firstName ||
      formData.lastName !== originalData.lastName ||
      formData.email !== originalData.email
    )
  }

  const isFormValid = () => {
    return (
      formData.firstName.trim() !== '' &&
      formData.lastName.trim() !== '' &&
      formData.email.trim() !== '' &&
      hasChanges()
    )
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleCancel = () => {
    window.location.href = '/profile'
  }

  const handleEdit = async (e) => {
    e.preventDefault()
    
    if (!hasChanges()) {
      return
    }
    
    const userId = localStorage.getItem('userId')
    if (!userId) {
      window.location.href = '/login'
      return
    }
    
    setLoading(true)
    setShowError('')
    
    try {
      const userData = {
        name: formData.firstName,
        lastName: formData.lastName,
        email: formData.email
      }
      
      await authService.updateUser(userId, userData)
      
      localStorage.setItem('userEmail', formData.email)
      localStorage.setItem('userFullName', `${formData.firstName} ${formData.lastName}`)
      
      setOriginalData(formData)
      
      setShowSuccess(true)
      
      setTimeout(() => {
        setShowSuccess(false)
      }, 2000)
      
    } catch (error) {
      console.error('Error al actualizar perfil:', error)
      setShowError('Error al actualizar el perfil. Por favor, intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: theme.colors.white,
      display: 'flex',
      flexDirection: 'column'
    }}>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
      
      <TopBar />

      <main style={{
        flex: 1,
        padding: '40px 60px'
      }}>
        {/* Botón Volver */}
        <button
          onClick={() => window.location.href = '/profile'}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: theme.colors.primary,
            fontSize: '16px',
            fontFamily: theme.fonts.primary,
            fontWeight: 500,
            marginTop: '45px',
            marginBottom: '24px',
            padding: '8px 0',
            transition: 'opacity 0.3s ease'
          }}
          onMouseOver={(e) => e.currentTarget.style.opacity = '0.7'}
          onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
        >
          <span className="material-icons-outlined" style={{ fontSize: '20px' }}>
            arrow_back
          </span>
          Volver
        </button>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '100px'
        }}>
          <span className="material-icons-outlined" style={{ fontSize: '28px', color: theme.colors.primary }}>
            account_circle
          </span>
          <h1 style={{
            fontSize: '24px',
            fontWeight: 600,
            color: theme.colors.primary,
            margin: 0,
            fontFamily: theme.fonts.primary
          }}>
            Editar perfil
          </h1>
        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%'
        }}>
          <Alert
            type="success"
            message="Perfil actualizado exitosamente"
            show={showSuccess}
            onClose={() => setShowSuccess(false)}
            style={{
              marginBottom: '20px',
              width: '100%',
              maxWidth: '500px'
            }}
          />

          <Alert
            type="error"
            message={showError}
            show={!!showError}
            onClose={() => setShowError('')}
            style={{
              marginBottom: '20px',
              width: '100%',
              maxWidth: '500px'
            }}
          />

          {loading ? (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '60px 20px',
              flexDirection: 'column'
            }}>
              <span className="material-icons-outlined" style={{
                fontSize: '48px',
                color: theme.colors.primary,
                animation: 'spin 1s linear infinite'
              }}>
                refresh
              </span>
              <p style={{
                marginTop: '16px',
                color: theme.colors.primary,
                fontSize: '16px',
                fontFamily: theme.fonts.primary
              }}>
                Cargando datos...
              </p>
            </div>
          ) : (
          <form onSubmit={handleEdit} style={{
            maxWidth: '500px',
            width: '100%'
          }}>
          <div style={{ marginBottom: '24px', position: 'relative' }}>
            <input
              type="text"
              placeholder="Nombre"
              value={formData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
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
            <span className="material-icons-outlined" style={{
              position: 'absolute',
              right: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              fontSize: '20px',
              color: theme.colors.disabled,
              pointerEvents: 'none'
            }}>
              edit
            </span>
          </div>

          <div style={{ marginBottom: '24px', position: 'relative' }}>
            <input
              type="text"
              placeholder="Apellido"
              value={formData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
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
            <span className="material-icons-outlined" style={{
              position: 'absolute',
              right: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              fontSize: '20px',
              color: theme.colors.disabled,
              pointerEvents: 'none'
            }}>
              edit
            </span>
          </div>

          <div style={{ marginBottom: '40px', position: 'relative' }}>
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
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
            <span className="material-icons-outlined" style={{
              position: 'absolute',
              right: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              fontSize: '20px',
              color: theme.colors.disabled,
              pointerEvents: 'none'
            }}>
              edit
            </span>
          </div>

          <div style={{
            display: 'flex',
            gap: '16px',
            justifyContent: 'center'
          }}>
            <CancelButton onClick={handleCancel} disabled={loading} />
            <SaveButton type="submit" isValid={isFormValid()} disabled={loading}>
              {loading ? 'Guardando...' : 'Editar'}
            </SaveButton>
          </div>
        </form>
          )}
        </div>
      </main>
    </div>
  )
}

export default EditProfile

