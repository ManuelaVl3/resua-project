import React from 'react'
import { theme } from '../../styles/theme'
import Button from '../common/Button'

const IconButton = ({ icon, ariaLabel, onClick, style }) => {
  return (
    <button
      aria-label={ariaLabel}
      onClick={onClick}
      style={{
        width: '36px',
        height: '36px',
        borderRadius: '50%',
        border: 'none',
        backgroundColor: theme.colors.primary,
        color: theme.colors.white,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'background-color 0.2s ease',
        ...style
      }}
      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = theme.colors.disabled }}
      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = theme.colors.primary }}
    >
      <span className="material-icons-outlined" style={{ fontSize: '20px', lineHeight: 0 }}>{icon}</span>
    </button>
  )
}

const MyObservationCard = ({
  image,
  commonName,
  scientificName,
  location,
  date,
  onViewMore,
  onEdit,
  onDelete
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
        justifyContent: 'center',
        marginRight: '1%'
      }}>
        <img
          src={image}
          alt={commonName}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>

      <div style={{
        flex: 1,
        display: 'grid',
        gridTemplateColumns: '1fr auto',
        gridTemplateRows: 'auto 1fr auto',
        columnGap: '10px',
        rowGap: '4px'
      }}>
        <div style={{ gridColumn: '1 / 2', gridRow: '1 / 2' }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: 600,
            color: theme.colors.primary,
            margin: 0
          }}>{commonName}</h3>
          <p style={{
            fontStyle: 'italic',
            color: theme.colors.primary,
            opacity: 0.8,
            margin: '4px 0 0 0'
          }}>{scientificName}</p>
        </div>

        <div style={{
          gridColumn: '2 / 3',
          gridRow: '1 / 2',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
          gap: '8px'
        }}>
          <IconButton icon="mode_edit" ariaLabel="Editar" onClick={onEdit} style={{ marginRight: '2px' }} />
          <IconButton icon="delete" ariaLabel="Eliminar" onClick={onDelete} />
        </div>

        <div style={{ gridColumn: '1 / 2', gridRow: '2 / 3', alignSelf: 'center' }}>
          <p style={{
            color: theme.colors.primary,
            margin: '10% 0 0 0'
          }}>{location}</p>
        </div>

        <div style={{
          gridColumn: '1 / 3',
          gridRow: '3 / 4',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: '8px'
        }}>
          <p style={{
            color: theme.colors.primary,
            margin: 0
          }}>{date}</p>
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
            onMouseEnter={(e) => { e.target.style.backgroundColor = theme.colors.disabled }}
            onMouseLeave={(e) => { e.target.style.backgroundColor = theme.colors.primary }}
          >
            Ver más
          </Button>
        </div>
      </div>
    </div>
  )
}

export default MyObservationCard


