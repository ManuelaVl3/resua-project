import React from 'react'
import { theme } from '../../styles/theme'

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  disabled = false,
  onClick,
  style = {},
  ...props 
}) => {
  const getButtonStyles = () => {
    const baseStyles = {
      fontFamily: theme.fonts.primary,
      fontWeight: 500,
      borderRadius: theme.borderRadius.md,
      border: 'none',
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: 'all 0.3s ease',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      ...style
    }

    const sizes = {
      sm: { padding: '8px 16px', fontSize: '14px' },
      md: { padding: '12px 24px', fontSize: '16px' },
      lg: { padding: '16px 32px', fontSize: '18px' }
    }

    const variants = {
      primary: {
        backgroundColor: disabled ? theme.colors.disabled : theme.colors.primary,
        color: theme.colors.light
      },
      secondary: {
        backgroundColor: disabled ? theme.colors.disabled : theme.colors.secondary,
        color: theme.colors.primary,
        border: `1px solid ${theme.colors.primary}`
      },
      disabled: {
        backgroundColor: theme.colors.disabled,
        color: theme.colors.light,
        cursor: 'not-allowed'
      }
    }

    return {
      ...baseStyles,
      ...sizes[size],
      ...variants[variant]
    }
  }

  const handleClick = (e) => {
    if (!disabled && onClick) {
      onClick(e)
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      style={getButtonStyles()}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
