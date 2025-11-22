import React, { useState, useRef, useEffect } from 'react'
import { theme } from '../../styles/theme'

const Select = ({ 
  label,
  placeholder,
  value,
  onChange,
  options = [],
  error,
  style = {},
  ...props 
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleSelect = (optionValue) => {
    onChange({ target: { value: optionValue } })
    setIsOpen(false)
  }

  const selectedOption = options.find(option => option.value === value)

  return (
    <div style={{ marginBottom: '16px', position: 'relative' }} ref={dropdownRef}>
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

      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          padding: '4px 40px 4px 16px',
          border: `1px solid ${isOpen ? theme.colors.primary : theme.colors.disabled}`,
          borderRadius: '15px',
          fontSize: '16px',
          fontFamily: theme.fonts.primary,
          backgroundColor: theme.colors.white,
          color: theme.colors.primary,
          cursor: 'pointer',
          transition: 'border-color 0.3s ease',
          position: 'relative',
          ...style
        }}
      >
        <span style={{ color: value ? theme.colors.primary : theme.colors.disabled }}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>

        <span style={{
          position: 'absolute',
          right: '12px',
          top: '50%',
          fontSize: '16px',
          color: theme.colors.disabled,
          transition: 'transform 0.3s ease',
          transform: isOpen ? 'translateY(-50%) rotate(180deg)' : 'translateY(-50%)'
        }}>
          ▼
        </span>
      </div>

      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          backgroundColor: theme.colors.white,
          border: `1px solid ${theme.colors.primary}`,
          borderRadius: '15px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          zIndex: 1000,
          marginTop: '4px'
        }}>
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => handleSelect(option.value)}
              style={{
                padding: '4px 16px',
                color: theme.colors.primary,
                cursor: 'pointer',
                backgroundColor: 'transparent',
                transition: 'background-color 0.2s ease'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = theme.colors.disabled}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
      
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

export default Select
