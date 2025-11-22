import React from 'react'
import { theme } from '../../styles/theme'

const TextArea = ({ 
  label,
  placeholder,
  value,
  onChange,
  rows = 4,
  error,
  style = {},
  ...props 
}) => {
  return (
    <div style={{ marginBottom: '16px' }}>
      {label && (
        <label style={{
          display: 'block',
          marginBottom: '8px',
          fontSize: '16px',
          fontWeight: 600,
          color: theme.colors.primary
        }}>
          {label}
        </label>
      )}
      
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={rows}
        style={{
          width: '100%',
          padding: '12px 16px',
          border: `1px solid ${theme.colors.disabled}`,
          borderRadius: '15px',
          fontSize: '16px',
          fontFamily: theme.fonts.primary,
          backgroundColor: theme.colors.white,
          color: theme.colors.primary,
          resize: 'vertical',
          minHeight: `${rows * 20}px`,
          transition: 'border-color 0.3s ease',
          '&:focus': {
            outline: 'none',
            borderColor: theme.colors.primary
          },
          ...style
        }}
        {...props}
      />
      
      {error && (
        <div style={{
          color: theme.colors.error,
          fontSize: '14px',
          marginTop: '4px'
        }}>
          {error}
        </div>
      )}
    </div>
  )
}

export default TextArea
