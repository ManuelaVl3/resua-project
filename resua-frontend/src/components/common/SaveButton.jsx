import React from 'react'
import { theme } from '../../styles/theme'

const SaveButton = ({ 
  children = 'Guardar',
  onClick,
  type = 'submit',
  disabled = false,
  isValid = true,
  style = {},
  ...props 
}) => {
  const isDisabled = disabled || !isValid
  const backgroundColor = isValid ? theme.colors.primary : theme.colors.disabled
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      style={{
        backgroundColor: backgroundColor,
        color: theme.colors.white,
        padding: '12px 40px',
        fontSize: '16px',
        fontWeight: 600,
        borderRadius: theme.borderRadius.md,
        border: 'none',
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        transition: 'all 0.3s ease',
        fontFamily: theme.fonts.primary,
        opacity: isDisabled ? 0.6 : 1,
        ...style
      }}
      onMouseOver={(e) => {
        if (!isDisabled) {
          e.currentTarget.style.opacity = '0.9'
        }
      }}
      onMouseOut={(e) => {
        if (!isDisabled) {
          e.currentTarget.style.opacity = '1'
        }
      }}
      {...props}
    >
      {children}
    </button>
  )
}

export default SaveButton

