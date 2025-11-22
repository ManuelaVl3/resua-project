import React from 'react'
import { theme } from '../../styles/theme'

const ErrorMessage = ({ 
  message, 
  show = false,
  style = {}
}) => {
  if (!show || !message) return null

  return (
    <div style={{
      color: theme.colors.error,
      fontSize: '14px',
      marginTop: '6px',
      fontFamily: theme.fonts.primary,
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      ...style
    }}>
      <svg 
        width="16" 
        height="16" 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          d="M12 8V12M12 16H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </svg>
      <span>{message}</span>
    </div>
  )
}

export default ErrorMessage

