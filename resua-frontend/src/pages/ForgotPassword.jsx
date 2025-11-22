import React, { useState } from 'react'
import TopBar from '../components/layout/TopBar'
import Button from '../components/common/Button'
import ErrorMessage from '../components/common/ErrorMessage'
import Alert from '../components/common/Alert'
import AuthService from '../services/AuthService'
import { theme } from '../styles/theme'

const ForgotPassword = () => {
  const authService = new AuthService()
  
  const [step, setStep] = useState(1) // 1: Email, 2: Pregunta seguridad, 3: Nueva contraseña, 4: Confirmación
  const [email, setEmail] = useState('')
  const [securityAnswer, setSecurityAnswer] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [emailError, setEmailError] = useState('')
  const [emailTouched, setEmailTouched] = useState(false)
  const [securityAnswerError, setSecurityAnswerError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [confirmPasswordError, setConfirmPasswordError] = useState('')
  const [passwordTouched, setPasswordTouched] = useState(false)
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [userSecurityQuestion, setUserSecurityQuestion] = useState('')
  const [userId, setUserId] = useState(null)

  const securityQuestionsMap = {
    'mascota': '¿Cuál es el nombre de tu primera mascota?',
    'ciudad': '¿En qué ciudad naciste?',
    'escuela': '¿Cuál es el nombre de tu escuela primaria?',
    'comida': '¿Cuál es tu comida favorita?',
    'libro': '¿Cuál es tu libro favorito?'
  }

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

  const handleNextStep = async (e) => {
    e.preventDefault()
    
    setErrorMessage('')
    setEmailError('')
    
    if (!validateEmail(email)) {
      setEmailError('El formato del correo electrónico no es válido')
      setEmailTouched(true)
      return
    }
    
    setIsLoading(true)
    
    try {
      // Obtener pregunta de  y userId por email
      const response = await authService.getUserSecurityQuestionByEmail(email)
      
      if (response && response.userId) {
        setUserId(response.userId)
        
        if (response.securityQuestion && securityQuestionsMap[response.securityQuestion]) {
          setUserSecurityQuestion(securityQuestionsMap[response.securityQuestion])
          setStep(2)
        } else {
          setErrorMessage('No se pudo obtener la información de seguridad. Por favor, contacta al soporte.')
        }
      } else {
        setErrorMessage('No encontramos una cuenta asociada a este correo electrónico')
      }
    } catch (error) {
      console.error('Error al verificar email:', error)
      if (error.response && error.response.status === 404) {
        setErrorMessage('No encontramos una cuenta asociada a este correo electrónico')
      } else {
        setErrorMessage('Error al verificar el correo. Por favor, intenta de nuevo.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifySecurityAnswer = async (e) => {
    e.preventDefault()
    
    setErrorMessage('')
    setSecurityAnswerError('')
    
    if (!securityAnswer.trim()) {
      setSecurityAnswerError('Debes ingresar la respuesta a la pregunta de seguridad')
      return
    }
    
    setIsLoading(true)
    
    try {
      const response = await authService.verifySecurityAnswer(userId, securityAnswer)
      
      if (response.success || response.valid) {
        setStep(3) 
      } else {
        setErrorMessage('La respuesta de seguridad no es correcta. Por favor, intenta de nuevo.')
      }
    } catch (error) {
      console.error('Error al verificar respuesta:', error)
      if (error.response && error.response.status === 401) {
        setErrorMessage('La respuesta de seguridad no es correcta. Por favor, intenta de nuevo.')
      } else {
        setErrorMessage('Error al verificar la respuesta. Por favor, intenta de nuevo.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const validatePassword = (password) => {
    if (!password.trim()) {
      setPasswordError('La contraseña es requerida')
      return false
    } else if (password.length < 6) {
      setPasswordError('La contraseña debe tener al menos 6 caracteres')
      return false
    } else {
      setPasswordError('')
      return true
    }
  }

  const validateConfirmPassword = (confirmPassword, password) => {
    if (!confirmPassword.trim()) {
      setConfirmPasswordError('Debes confirmar la contraseña')
      return false
    } else if (confirmPassword !== password) {
      setConfirmPasswordError('Las contraseñas no coinciden')
      return false
    } else {
      setConfirmPasswordError('')
      return true
    }
  }

  const handlePasswordChange = (e) => {
    const value = e.target.value
    setNewPassword(value)
    
    if (passwordTouched) {
      validatePassword(value)
    }
    
    if (confirmPasswordTouched && value.trim() && confirmPassword.trim()) {
      validateConfirmPassword(confirmPassword, value)
    }
  }

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value
    setConfirmPassword(value)
    
    if (confirmPasswordTouched && newPassword.trim()) {
      validateConfirmPassword(value, newPassword)
    }
  }

  const handlePasswordBlur = () => {
    setPasswordTouched(true)
    validatePassword(newPassword)
  }

  const handleConfirmPasswordBlur = () => {
    setConfirmPasswordTouched(true)
    if (newPassword.trim()) {
      validateConfirmPassword(confirmPassword, newPassword)
    }
  }

  const handleResetPassword = async (e) => {
    e.preventDefault()
    
    setErrorMessage('')
    setPasswordTouched(true)
    setConfirmPasswordTouched(true)
    
    const isPasswordValid = validatePassword(newPassword)
    const isConfirmPasswordValid = validateConfirmPassword(confirmPassword, newPassword)
    
    if (!isPasswordValid || !isConfirmPasswordValid) {
      return
    }
    
    setIsLoading(true)
    
    try {
      await authService.resetPassword(userId, newPassword, confirmPassword)
      
      setSuccessMessage('¡Contraseña restablecida exitosamente!')
      setStep(4)
    } catch (error) {
      console.error('Error al restablecer contraseña:', error)
      if (error.response && error.response.status === 400) {
        setErrorMessage('La contraseña no cumple con los requisitos. Por favor, intenta con otra.')
      } else {
        setErrorMessage('Error al restablecer la contraseña. Por favor, intenta de nuevo.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleRememberPassword = () => {
    window.location.href = '/login'
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: "white",
      display: 'flex',
      flexDirection: 'column'
    }}>
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
          {step === 1 && (
            <>
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

              <Alert
                type="error"
                message={errorMessage}
                show={!!errorMessage}
                onClose={() => setErrorMessage('')}
              />

              <form onSubmit={handleNextStep}>
                <div style={{ marginBottom: '24px' }}>
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

                <Button
                  type="submit"
                  variant="primary"
                  disabled={isLoading || !validateEmail(email)}
                  style={{
                    width: '100%',
                    marginBottom: '24px',
                    backgroundColor: isLoading || !validateEmail(email) ? theme.colors.disabled : theme.colors.primary,
                    fontSize: '16px',
                    fontWeight: 600,
                    opacity: isLoading ? 0.7 : 1
                  }}
                >
                  {isLoading ? 'Verificando...' : 'Siguiente'}
                </Button>
              </form>

              <div style={{
                textAlign: 'center'
              }}>
                <p
                  onClick={handleRememberPassword}
                  style={{
                    color: theme.colors.primary,
                    fontSize: '14px',
                    cursor: 'pointer',
                    fontFamily: theme.fonts.primary,
                    transition: 'opacity 0.3s ease',
                    margin: 0
                  }}
                  onMouseOver={(e) => e.target.style.opacity = '0.7'}
                  onMouseOut={(e) => e.target.style.opacity = '1'}
                >
                  Ya recordé mi contraseña 😌
                </p>
              </div>
            </>
          )}

          {step === 2 && (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '60vh'
            }}>
              <Alert
                type="error"
                message={errorMessage}
                show={!!errorMessage}
                onClose={() => setErrorMessage('')}
                style={{ width: '100%', marginBottom: '24px' }}
              />

              <form onSubmit={handleVerifySecurityAnswer} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                <div style={{ marginBottom: '24px', width: '100%' }}>
                  <p style={{
                    fontSize: '16px',
                    color: theme.colors.primary,
                    marginBottom: '16px',
                    fontFamily: theme.fonts.primary,
                    fontWeight: 500,
                    textAlign: 'center'
                  }}>
                    {userSecurityQuestion}
                  </p>
                  
                  <input
                    type="text"
                    placeholder="Tu respuesta"
                    value={securityAnswer}
                    onChange={(e) => setSecurityAnswer(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: `1px solid ${securityAnswerError ? theme.colors.error : theme.colors.disabled}`,
                      borderRadius: '15px',
                      fontSize: '16px',
                      fontFamily: theme.fonts.primary,
                      backgroundColor: theme.colors.white,
                      color: theme.colors.primary,
                      boxSizing: 'border-box'
                    }}
                  />
                  <ErrorMessage 
                    message={securityAnswerError} 
                    show={!!securityAnswerError}
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  disabled={isLoading || !securityAnswer.trim()}
                  style={{
                    width: '100%',
                    marginBottom: '24px',
                    backgroundColor: isLoading || !securityAnswer.trim() ? theme.colors.disabled : theme.colors.primary,
                    fontSize: '16px',
                    fontWeight: 600,
                    opacity: isLoading ? 0.7 : 1
                  }}
                >
                  {isLoading ? 'Verificando...' : 'Verificar'}
                </Button>
              </form>

              <div style={{
                textAlign: 'center'
              }}>
                <p
                  onClick={() => setStep(1)}
                  style={{
                    color: theme.colors.primary,
                    fontSize: '14px',
                    cursor: 'pointer',
                    fontFamily: theme.fonts.primary,
                    transition: 'opacity 0.3s ease',
                    margin: 0
                  }}
                  onMouseOver={(e) => e.target.style.opacity = '0.7'}
                  onMouseOut={(e) => e.target.style.opacity = '1'}
                >
                  Volver
                </p>
              </div>
            </div>
          )}

            {step === 3 && (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '60vh'
              }}>
                <p style={{
                  fontSize: '16px',
                  color: theme.colors.primary,
                  marginBottom: '32px',
                  textAlign: 'center',
                  fontFamily: theme.fonts.primary,
                  fontWeight: 400
                }}>
                  Ahora puedes crear una nueva contraseña
                </p>

                <Alert
                  type="error"
                  message={errorMessage}
                  show={!!errorMessage}
                  onClose={() => setErrorMessage('')}
                  style={{ width: '100%', marginBottom: '24px' }}
                />

                <form onSubmit={handleResetPassword} style={{ width: '100%' }}>
                <div style={{ marginBottom: passwordError ? '0' : '24px' }}>
                  <div style={{ position: 'relative', marginBottom: '0' }}>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Nueva contraseña"
                      value={newPassword}
                      onChange={handlePasswordChange}
                      onBlur={handlePasswordBlur}
                      required
                      style={{
                        width: '100%',
                        padding: '12px 50px 12px 16px',
                        border: `1px solid ${passwordError ? theme.colors.error : theme.colors.disabled}`,
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
                  <ErrorMessage 
                    message={passwordError} 
                    show={!!passwordError}
                  />
                </div>

                <div style={{ marginBottom: confirmPasswordError ? '0' : '24px' }}>
                  <div style={{ position: 'relative', marginBottom: '0' }}>
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Confirmar contraseña"
                      value={confirmPassword}
                      onChange={handleConfirmPasswordChange}
                      onBlur={handleConfirmPasswordBlur}
                      required
                      style={{
                        width: '100%',
                        padding: '12px 50px 12px 16px',
                        border: `1px solid ${confirmPasswordError ? theme.colors.error : theme.colors.disabled}`,
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
                      onClick={toggleConfirmPasswordVisibility}
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
                  </div>
                  <ErrorMessage 
                    message={confirmPasswordError} 
                    show={!!confirmPasswordError}
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  disabled={isLoading || !newPassword.trim() || !confirmPassword.trim() || newPassword !== confirmPassword || newPassword.length < 6 || !!passwordError || !!confirmPasswordError}
                  style={{
                    width: '100%',
                    marginBottom: '24px',
                    backgroundColor: isLoading || !newPassword.trim() || !confirmPassword.trim() || newPassword !== confirmPassword || newPassword.length < 6 || !!passwordError || !!confirmPasswordError ? theme.colors.disabled : theme.colors.primary,
                    fontSize: '16px',
                    fontWeight: 600,
                    opacity: isLoading ? 0.7 : 1
                  }}
                >
                  {isLoading ? 'Restableciendo...' : 'Restablecer contraseña'}
                </Button>
              </form>

              <div style={{
                textAlign: 'center'
              }}>
                <p
                  onClick={() => setStep(2)}
                  style={{
                    color: theme.colors.primary,
                    fontSize: '14px',
                    cursor: 'pointer',
                    fontFamily: theme.fonts.primary,
                    transition: 'opacity 0.3s ease',
                    margin: 0
                  }}
                  onMouseOver={(e) => e.target.style.opacity = '0.7'}
                  onMouseOut={(e) => e.target.style.opacity = '1'}
                >
                  Volver
                </p>
              </div>
            </div>
          )}

          {step === 4 && (
            <>
              <h1 style={{
                fontSize: '32px',
                fontWeight: 600,
                color: theme.colors.primary,
                marginBottom: '32px',
                textAlign: 'center',
                fontFamily: theme.fonts.primary,
                padding: '48px',
              }}>
                ¡Listo! ✅
              </h1>

              <Alert
                type="success"
                message={successMessage}
                show={!!successMessage}
              />

              <div style={{
                textAlign: 'center',
                marginTop: '32px'
              }}>
                <p style={{
                  color: theme.colors.primary,
                  fontSize: '16px',
                  marginBottom: '24px',
                  fontFamily: theme.fonts.primary
                }}>
                  Tu contraseña ha sido restablecida exitosamente. Ahora puedes iniciar sesión con tu nueva contraseña.
                </p>

                <Button
                  variant="primary"
                  onClick={() => window.location.href = '/login'}
                  style={{
                    width: '100%',
                    backgroundColor: theme.colors.primary,
                    fontSize: '16px',
                    fontWeight: 600
                  }}
                >
                  Ir al Login
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword

