import React from 'react'
import { theme } from '../../styles/theme'
import Button from '../common/Button'

const ObservationCard = ({ 
  image,
  commonName,
  scientificName,
  location,
  date,
  onViewMore
}) => {
  return (
    <div style={{
      backgroundColor: theme.colors.white,
      borderRadius: '15px',
      padding: '15px',
      display: 'flex',
      gap: '15px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      transition: 'box-shadow 0.3s ease'
    }}>
      <div style={{
        width: '150px',
        height: '180px',
        borderRadius: '15px',
        overflow: 'hidden',
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        marginRight: '1%',
        justifyContent: 'center'
      }}>
        <img 
          src={image} 
          alt={commonName}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
      </div>

      {}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}>
        <div>
          <h3 style={{
            fontSize: '16px',
            fontWeight: 600,
            color: theme.colors.primary,
            margin: '0 0 4px 0'
          }}>
            {commonName}
          </h3>

          <p style={{
            fontSize: '14px',
            fontStyle: 'italic',
            color: theme.colors.primary,
            margin: '0 0 12px 0'
          }}>
            {scientificName}
          </p>

          <p style={{
            fontSize: '14px',
            color: theme.colors.primary,
            margin: '10% 0 0 0'
          }}>
            {location}
          </p>

          {}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '8px'
          }}>
            <p style={{
              fontSize: '14px',
              color: theme.colors.primary,
              margin: 0
            }}>
              {date}
            </p>

            <Button
              variant="primary"
              onClick={onViewMore}
              style={{
                backgroundColor: theme.colors.primary,
                color: theme.colors.white,
                fontSize: '14px',
                borderRadius: '15px',
                border: 'none',
                cursor: 'pointer',
                transition: 'background-color 0.2s ease',
                padding: '8px 16px'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = theme.colors.disabled
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = theme.colors.primary
              }}
            >
              Ver más
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ObservationCard
