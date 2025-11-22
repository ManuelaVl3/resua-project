import React from 'react'
import { theme } from '../../styles/theme'

const CancelButton = ({ 
  children = 'Cancelar',
  onClick,
  type = 'button',
  disabled = false,
  style = {},
  ...props 
}) => {
  const handleClick = (e) => {
    if (!disabled && onClick) {
      onClick(e)
    }
  }

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled}
      style={{
        backgroundColor: '#ECDDB7',
        color: theme.colors.primary,
        padding: '12px 40px',
        fontSize: '16px',
        fontWeight: 600,
        borderRadius: theme.borderRadius.md,
        border: 'none',
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'all 0.3s ease',
        fontFamily: theme.fonts.primary,
        opacity: disabled ? 0.6 : 1,
        ...style
      }}
      onMouseOver={(e) => {
        if (!disabled) {
          e.currentTarget.style.opacity = '0.9'
        }
      }}
      onMouseOut={(e) => {
        if (!disabled) {
          e.currentTarget.style.opacity = '1'
        }
      }}
      {...props}
    >
      {children}
    </button>
  )
}

export default CancelButton

