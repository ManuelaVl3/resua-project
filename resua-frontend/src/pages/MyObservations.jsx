import React, { useState, useEffect } from 'react'
import { theme } from '../styles/theme'
import TopBar from '../components/layout/TopBar'
import MyObservationCard from '../components/observations/MyObservationCard'
import Alert from '../components/common/Alert'
import ObservationsService from '../services/observations/ObservationsService'

const MyObservations = () => {
  const [observations, setObservations] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [confirmDeleteId, setConfirmDeleteId] = useState(null)
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false)

  const observationsService = new ObservationsService()

  const loadObservations = async () => {
    const userId = localStorage.getItem('userId')
    
    if (!userId) {
      window.location.href = '/login'
      return
    }
    
    setLoading(true)
    setError(null)
    try {
      const response = await observationsService.getAllObservationsByUserId(userId)
      
      const transformedObservations = response.map(observation => ({
        id: observation.id,
        image: (observation.images && observation.images.length > 0) ? observation.images[0].imageUrl : undefined,
        commonName: observation.species.commonName,
        scientificName: observation.species.scientificName,
        location: observation.location.location,
        date: new Date(observation.createdAt).toLocaleDateString('es-CO', {
          day: '2-digit',
          month: 'long',
          year: 'numeric'
        })
      }))
      
      setObservations(transformedObservations)
    } catch (err) {
      setError('Error al cargar tus observaciones. Por favor, inténtalo de nuevo.')
      console.error('Error:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadObservations()
  }, [])

  const handleAdd = () => {
    window.location.assign('/create-observation')
  }

  const handleEdit = (id) => {
    const url = `/edit-observation?id=${encodeURIComponent(id)}`
    window.location.assign(url)
  }

  const handleDeleteRequest = (id) => {
    setConfirmDeleteId(id)
  }

  const handleConfirmDelete = async () => {
    const id = confirmDeleteId
    if (!id) return
    try {
      await observationsService.deleteObservation(id)
      if (typeof window !== 'undefined') {
        window.location.reload()
      }
    } finally {
      setConfirmDeleteId(null)
    }
  }

  const handleCancelDelete = () => {
    setConfirmDeleteId(null)
  }

  const handleViewMore = (id) => {
    const url = `/observation-detail?id=${encodeURIComponent(id)}`
    window.location.assign(url)
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: theme.colors.white }}>
      <TopBar />
      <main style={{ padding: '2% 3% 3% 7%', position: 'relative' }}>
        <Alert
          type="error"
          message="Registro eliminado"
          show={showDeleteSuccess}
          onClose={() => setShowDeleteSuccess(false)}
          style={{
            position: 'fixed',
            top: '90px',
            right: '30px',
            zIndex: 2200,
            maxWidth: '400px'
          }}
        />
        
        {/* Botón Volver */}
        <button
          onClick={() => window.location.href = '/profile'}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: theme.colors.primary,
            fontSize: '16px',
            fontFamily: theme.fonts.primary,
            fontWeight: 500,
            marginBottom: '24px',
            padding: '8px 0',
            transition: 'opacity 0.3s ease'
          }}
          onMouseOver={(e) => e.currentTarget.style.opacity = '0.7'}
          onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
        >
          <span className="material-icons-outlined" style={{ fontSize: '20px' }}>
            arrow_back
          </span>
          Volver
        </button>

        <h1 style={{
          fontSize: '28px',
          fontWeight: 600,
          color: theme.colors.primary,
          marginBottom: '24px'
        }}>
          Mis registros
        </h1>

        <button
          onClick={handleAdd}
          aria-label="Agregar registro"
          style={{
            position: 'absolute',
            top: '24px',
            right: '3%',
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            border: 'none',
            backgroundColor: 'transparent',
            color: theme.colors.primary,
            cursor: 'pointer'
          }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '36px' }}>
            add_circle
          </span>
        </button>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '860px' }}>
          {loading ? (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '60px 20px',
              flexDirection: 'column'
            }}>
              <span className="material-icons-outlined" style={{
                fontSize: '48px',
                color: theme.colors.primary,
                animation: 'spin 1s linear infinite'
              }}>
                refresh
              </span>
              <p style={{
                marginTop: '16px',
                color: theme.colors.primary,
                fontSize: '16px'
              }}>
                Cargando tus observaciones...
              </p>
            </div>
          ) : error ? (
            <div style={{ padding: '20px' }}>
              <Alert
                type="error"
                message={error}
                show={!!error}
                onClose={() => setError(null)}
              />
            </div>
          ) : observations.length > 0 ? (
            observations.map(o => (
              <MyObservationCard
                key={o.id}
                image={o.image}
                commonName={o.commonName}
                scientificName={o.scientificName}
                location={o.location}
                date={o.date}
                onViewMore={() => handleViewMore(o.id)}
                onEdit={() => handleEdit(o.id)}
                onDelete={() => handleDeleteRequest(o.id)}
              />
            ))
          ) : (
            <div style={{
              textAlign: 'center',
              padding: '60px 20px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <span className="material-icons-outlined" style={{
                fontSize: '64px',
                color: theme.colors.disabled,
                marginBottom: '16px'
              }}>
                visibility_off
              </span>
              <h3 style={{
                fontSize: '18px',
                fontWeight: 600,
                color: theme.colors.primary,
                marginBottom: '8px'
              }}>
                No tienes observaciones registradas
              </h3>
              <p style={{
                fontSize: '14px',
                color: theme.colors.disabled,
                margin: 0
              }}>
                Haz clic en el botón + para crear tu primera observación
              </p>
            </div>
          )}
        </div>

        {confirmDeleteId !== null && (
          <div style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2000
          }}>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '15px',
              padding: '20px 24px',
              width: 'min(92vw, 420px)',
              boxShadow: '0 8px 24px rgba(0,0,0,0.2)'
            }}>
              <h3 style={{
                margin: 0,
                marginBottom: '12px',
                color: theme.colors.primary,
                fontSize: '18px',
                fontWeight: 600
              }}>
                ¿Eliminar este registro?
              </h3>
              <p style={{
                margin: 0,
                marginBottom: '16px',
                color: theme.colors.primary,
                fontSize: '14px'
              }}>
                Esta acción no se puede deshacer.
              </p>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button onClick={handleCancelDelete} style={{
                  padding: '10px 14px',
                  borderRadius: '12px',
                  border: `1px solid ${theme.colors.disabled}`,
                  backgroundColor: 'white',
                  color: theme.colors.primary,
                  cursor: 'pointer'
                }}>
                  No
                </button>
                <button onClick={handleConfirmDelete} style={{
                  padding: '10px 14px',
                  borderRadius: '12px',
                  border: 'none',
                  backgroundColor: theme.colors.primary,
                  color: 'white',
                  cursor: 'pointer'
                }}>
                  Sí, eliminar
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default MyObservations