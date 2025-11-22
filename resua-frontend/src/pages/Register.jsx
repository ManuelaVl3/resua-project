import React, { useState } from 'react'
import TopBar from '../components/layout/TopBar'
import SaveButton from '../components/common/SaveButton'
import CancelButton from '../components/common/CancelButton'
import Alert from '../components/common/Alert'
import ErrorMessage from '../components/common/ErrorMessage'
import Select from '../components/common/Select'
import AuthService from '../services/AuthService'
import { theme } from '../styles/theme'

const Register = () => {
  const authService = new AuthService()
  
  const [step, setStep] = useState(1) // Paso 1: Datos personales, Paso 2: Seguridad
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    securityQuestion: '',
    securityAnswer: ''
  })
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    securityQuestion: '',
    securityAnswer: ''
  })
  const [touched, setTouched] = useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
    confirmPassword: false,
    securityQuestion: false,
    securityAnswer: false
  })

  const securityQuestions = [
    { value: '', label: 'Selecciona una pregunta de seguridad' },
    { value: 'mascota', label: '¿Cuál es el nombre de tu primera mascota?' },
    { value: 'ciudad', label: '¿En qué ciudad naciste?' },
    { value: 'escuela', label: '¿Cuál es el nombre de tu escuela primaria?' },
    { value: 'comida', label: '¿Cuál es tu comida favorita?' },
    { value: 'libro', label: '¿Cuál es tu libro favorito?' }
  ]

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validateField = (field, value) => {
    let error = ''
    
    switch(field) {
      case 'firstName':
        if (!value.trim()) {
          error = 'El nombre es requerido'
        }
        break
      case 'lastName':
        if (!value.trim()) {
          error = 'El apellido es requerido'
        }
        break
      case 'email':
        if (!value.trim()) {
          error = 'El email es requerido'
        } else if (!validateEmail(value)) {
          error = 'El formato del correo electrónico no es válido'
        }
        break
      case 'password':
        if (!value.trim()) {
          error = 'La contraseña es requerida'
        } else if (value.length < 6) {
          error = 'La contraseña debe tener al menos 6 caracteres'
        }
        break
      case 'confirmPassword':
        if (!value.trim()) {
          error = 'Debes confirmar la contraseña'
        } else if (value !== formData.password) {
          error = 'Las contraseñas no coinciden'
        }
        break
      case 'securityQuestion':
        if (!value.trim()) {
          error = 'Debes seleccionar una pregunta de seguridad'
        }
        break
      case 'securityAnswer':
        if (!value.trim()) {
          error = 'La respuesta es requerida'
        }
        break
      default:
        break
    }
    
    setErrors(prev => ({ ...prev, [field]: error }))
    return error === ''
  }

  const isStep1Valid = () => {
    return (
      formData.firstName.trim() !== '' &&
      formData.lastName.trim() !== '' &&
      formData.email.trim() !== '' &&
      validateEmail(formData.email) &&
      !errors.firstName &&
      !errors.lastName &&
      !errors.email
    )
  }

  const isStep2Valid = () => {
    return (
      formData.password.trim() !== '' &&
      formData.password.length >= 6 &&
      formData.confirmPassword.trim() !== '' &&
      formData.password === formData.confirmPassword &&
      formData.securityQuestion.trim() !== '' &&
      formData.securityAnswer.trim() !== '' &&
      !errors.password &&
      !errors.confirmPassword &&
      !errors.securityQuestion &&
      !errors.securityAnswer
    )
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    
    if (touched[field]) {
      validateField(field, value)
    }
  }

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }))
    validateField(field, formData[field])
  }

  const handleCancel = () => {
    window.location.href = '/login'
  }

  const handleNextStep = (e) => {
    e.preventDefault()
    
    if (step === 1) {
      setTouched(prev => ({
        ...prev,
        firstName: true,
        lastName: true,
        email: true
      }))
      
      const isFirstNameValid = validateField('firstName', formData.firstName)
      const isLastNameValid = validateField('lastName', formData.lastName)
      const isEmailValid = validateField('email', formData.email)
      
      if (isFirstNameValid && isLastNameValid && isEmailValid) {
        setStep(2)
      }
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    
    setTouched(prev => ({
      ...prev,
      password: true,
      confirmPassword: true,
      securityQuestion: true,
      securityAnswer: true
    }))
    
    const isPasswordValid = validateField('password', formData.password)
    const isConfirmPasswordValid = validateField('confirmPassword', formData.confirmPassword)
    const isSecurityQuestionValid = validateField('securityQuestion', formData.securityQuestion)
    const isSecurityAnswerValid = validateField('securityAnswer', formData.securityAnswer)
    
    if (!isPasswordValid || !isConfirmPasswordValid || !isSecurityQuestionValid || !isSecurityAnswerValid) {
      return
    }
    
    setIsLoading(true)
    setShowError('')
    
    try {
      const userData = {
        name: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        securityQuestion: formData.securityQuestion,
        secretAnswer: formData.securityAnswer
      }
      
      const response = await authService.registerUser(userData)
      console.log('Registro exitoso:', response)
      
      setShowSuccess(true)
      
      setTimeout(() => {
        window.location.href = '/login'
      }, 2000)
      
    } catch (error) {
      console.error('Error al registrar usuario:', error)
      setShowError('Error al crear la cuenta. Por favor, intenta de nuevo.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: theme.colors.white,
      display: 'flex',
      flexDirection: 'column'
    }}>
      <TopBar />

      <main style={{
        flex: 1,
        padding: '40px 60px'
      }}>
        <h1 style={{
          fontSize: '24px',
          fontWeight: 600,
          color: theme.colors.primary,
          marginTop: '45px',
          marginBottom: '60px',
          textAlign: 'left',
          fontFamily: theme.fonts.primary
        }}>
          Nos emociona que hagas parte de <span style={{ color: theme.colors.primary }}>RESUA</span>
        </h1>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%'
        }}>
          <p style={{
            fontSize: '16px',
            color: theme.colors.disabled,
            textAlign: 'center',
            marginBottom: '32px',
            fontFamily: theme.fonts.primary,
            width: '100%',
            maxWidth: '500px'
          }}>
            {step === 1 ? 'Iniciemos por tus datos personales' : 'Ahora definamos algunos detalles para la seguridad de tu cuenta'}
          </p>

          <Alert
            type="success"
            message="Registro exitoso. Redirigiendo al login..."
            show={showSuccess}
            style={{
              marginBottom: '20px',
              maxWidth: '500px',
              width: '100%'
            }}
          />

          <Alert
            type="error"
            message={showError}
            show={!!showError}
            onClose={() => setShowError('')}
            style={{
              marginBottom: '20px',
              maxWidth: '500px',
              width: '100%'
            }}
          />

          {step === 1 && (
            <form onSubmit={handleNextStep} style={{
              maxWidth: '500px',
              width: '100%'
            }}>
          <div style={{ marginBottom: '24px' }}>
            <input
              type="text"
              placeholder="Nombres"
              value={formData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              onBlur={() => handleBlur('firstName')}
              required
              style={{
                width: '100%',
                padding: '12px 16px',
                border: `1px solid ${errors.firstName ? theme.colors.error : theme.colors.disabled}`,
                borderRadius: '15px',
                fontSize: '16px',
                fontFamily: theme.fonts.primary,
                backgroundColor: theme.colors.white,
                color: theme.colors.primary,
                boxSizing: 'border-box'
              }}
            />
            <ErrorMessage 
              message={errors.firstName} 
              show={!!errors.firstName}
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <input
              type="text"
              placeholder="Apellidos"
              value={formData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              onBlur={() => handleBlur('lastName')}
              required
              style={{
                width: '100%',
                padding: '12px 16px',
                border: `1px solid ${errors.lastName ? theme.colors.error : theme.colors.disabled}`,
                borderRadius: '15px',
                fontSize: '16px',
                fontFamily: theme.fonts.primary,
                backgroundColor: theme.colors.white,
                color: theme.colors.primary,
                boxSizing: 'border-box'
              }}
            />
            <ErrorMessage 
              message={errors.lastName} 
              show={!!errors.lastName}
            />
          </div>

          <div style={{ marginBottom: '40px' }}>
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              onBlur={() => handleBlur('email')}
              required
              style={{
                width: '100%',
                padding: '12px 16px',
                border: `1px solid ${errors.email ? theme.colors.error : theme.colors.disabled}`,
                borderRadius: '15px',
                fontSize: '16px',
                fontFamily: theme.fonts.primary,
                backgroundColor: theme.colors.white,
                color: theme.colors.primary,
                boxSizing: 'border-box'
              }}
            />
            <ErrorMessage 
              message={errors.email} 
              show={!!errors.email}
            />
          </div>

          <div style={{
            display: 'flex',
            gap: '16px',
            justifyContent: 'center'
          }}>
              <CancelButton onClick={handleCancel} />
              <SaveButton type="submit" isValid={isStep1Valid()} />
            </div>
          </form>
          )}

          {step === 2 && (
            <form onSubmit={handleRegister} style={{
              maxWidth: '500px',
              width: '100%'
            }}>
              <div style={{ position: 'relative', marginBottom: '24px' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Contraseña"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  onBlur={() => handleBlur('password')}
                  required
                  style={{
                    width: '100%',
                    padding: '12px 50px 12px 16px',
                    border: `1px solid ${errors.password ? theme.colors.error : theme.colors.disabled}`,
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
                  onClick={() => setShowPassword(!showPassword)}
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
                <ErrorMessage 
                  message={errors.password} 
                  show={!!errors.password}
                />
              </div>

              <div style={{ position: 'relative', marginBottom: '24px' }}>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirmar contraseña"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  onBlur={() => handleBlur('confirmPassword')}
                  required
                  style={{
                    width: '100%',
                    padding: '12px 50px 12px 16px',
                    border: `1px solid ${errors.confirmPassword ? theme.colors.error : theme.colors.disabled}`,
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
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
                  {showConfirmPassword ? (
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
                <ErrorMessage 
                  message={errors.confirmPassword} 
                  show={!!errors.confirmPassword}
                />
              </div>

              <div style={{ marginBottom: '24px' }}>
                <div onBlur={() => handleBlur('securityQuestion')}>
                  <Select
                    placeholder="Pregunta de seguridad"
                    options={securityQuestions}
                    value={formData.securityQuestion}
                    onChange={(e) => handleInputChange('securityQuestion', e.target.value)}
                  />
                </div>
                <ErrorMessage 
                  message={errors.securityQuestion} 
                  show={!!errors.securityQuestion}
                />
              </div>

              <div style={{ marginBottom: '40px' }}>
                <input
                  type="text"
                  placeholder="Respuesta"
                  value={formData.securityAnswer}
                  onChange={(e) => handleInputChange('securityAnswer', e.target.value)}
                  onBlur={() => handleBlur('securityAnswer')}
                  required
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: `1px solid ${errors.securityAnswer ? theme.colors.error : theme.colors.disabled}`,
                    borderRadius: '15px',
                    fontSize: '16px',
                    fontFamily: theme.fonts.primary,
                    backgroundColor: theme.colors.white,
                    color: theme.colors.primary,
                    boxSizing: 'border-box'
                  }}
                />
                <ErrorMessage 
                  message={errors.securityAnswer} 
                  show={!!errors.securityAnswer}
                />
              </div>

              <div style={{
                display: 'flex',
                gap: '16px',
                justifyContent: 'center'
              }}>
                <CancelButton onClick={() => setStep(1)} disabled={isLoading}>Atrás</CancelButton>
                <SaveButton type="submit" isValid={isStep2Valid()} disabled={isLoading}>
                  {isLoading ? 'Guardando...' : 'Guardar'}
                </SaveButton>
              </div>
            </form>
          )}
        </div>
      </main>
    </div>
  )
}

export default Register

