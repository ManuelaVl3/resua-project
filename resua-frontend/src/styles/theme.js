/**
 * Paleta de colores del proyecto
 * Avistamientos de Especies Silvestres - Armenia, Quindío
 */

export const colors = {
  // Color principal - Verde oscuro
  primary: '#355543',
  
  // Color de texto y elementos claros
  light: '#EEEEEE',
  
  // Color para cards y botones secundarios
  secondary: '#ECDDB7',
  
  // Color para elementos deshabilitados y hover
  disabled: '#B4C0B9',
  
  // Colores adicionales útiles
  white: '#FFFFFF',
  black: '#000000',
  
  // Estados
  success: '#4CAF50',
  error: '#F44336',
  warning: '#FF9800',
  info: '#2196F3',
}

export const theme = {
  colors,
  
  // Tipografía
  fonts: {
    primary: '"Montserrat", sans-serif',
  },
  
  // Espaciados
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },
  
  // Bordes
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    full: '50%',
  },
  
  // Sombras
  shadows: {
    sm: '0 1px 3px rgba(0,0,0,0.12)',
    md: '0 4px 6px rgba(0,0,0,0.1)',
    lg: '0 10px 20px rgba(0,0,0,0.15)',
  },
}

export default theme

