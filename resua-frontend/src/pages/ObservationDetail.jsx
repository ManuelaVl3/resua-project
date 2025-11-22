import React, { useMemo, useState, useEffect } from 'react'
import { theme } from '../styles/theme'
import TopBar from '../components/layout/TopBar'
import mapImage from '../assets/images/ui/map-placeholder.png'
import ObservationsService from '../services/observations/ObservationsService'
import CommunityService from '../services/CommunityService'
import AuthService from '../services/AuthService'
import Alert from '../components/common/Alert'

const ObservationDetail = () => {
  const authService = new AuthService()
  const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null
  const observationId = params ? params.get('id') : null
  const [observation, setObservation] = useState({
    id: 1,
    user: { username: '@jahashjas' },
    species: {
      commonName: 'Mono aullador rojo',
      scientificName: 'Alouatta seniculus'
    },
    location: {
      location: 'Oro Negro'
    },
    createdAt: '2024-04-10T00:00:00Z',
    description: 'Vi una tropa de monos aulladores rojos en Oro Negro, desplazándose entre los árboles y emitiendo fuertes vocalizaciones. Este avistamiento es atípico, pues usualmente la especie se registra en bosques del Quindío.',
    category: 'Mamíferos',
    images: [
      {
        imageUrl: 'https://images.unsplash.com/photo-1548095115-45697e220cf3?q=80&w=1200&auto=format&fit=crop'
      }
    ]
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchDetail = async () => {
      if (!observationId) return
      setLoading(true)
      setError(null)
      try {
        const service = new ObservationsService()
        const data = await service.getObservationById(observationId)
        setObservation({
          id: data.id,
          user: { username: '@usuario' }, // placeholder mientras haya usuario en API
          species: {
            commonName: data.species.commonName,
            scientificName: data.species.scientificName
          },
          location: { location: data.location.location },
          createdAt: data.createdAt,
          description: data.description,
          category: data.category || '—',
          images: data.images?.map(img => ({ imageUrl: img.imageUrl })) || []
        })
      } catch (e) {
        console.error(e)
        setError('Error cargando el detalle del registro')
      } finally {
        setLoading(false)
      }
    }
    fetchDetail()
  }, [observationId])

  const loadComments = async () => {
    if (!observationId) return
    
    try {
      const communityService = new CommunityService()
      const commentsData = await communityService.getCommentsByObservationId(parseInt(observationId))
      
      // Verificar si commentsData es un array
      if (!Array.isArray(commentsData)) {
        console.error('Los comentarios recibidos no son un array:', commentsData)
        setComments([])
        return []
      }
      
      // Mapear los datos del backend a la estructura del frontend
      const mappedComments = commentsData.map((comment) => ({
        id: comment.id,
        user: comment.commenterName || '@usuario',
        text: comment.description || '',
        userId: comment.userId || null
      }))
      
      setComments(mappedComments)
      return mappedComments
    } catch (error) {
      console.error('Error al cargar comentarios:', error)
      // No mostramos error al usuario, solo dejamos la lista vacía
      setComments([])
      return []
    }
  }

  useEffect(() => {
    loadComments()
  }, [observationId])

  const [comments, setComments] = useState([])
  const [commentText, setCommentText] = useState('')
  const [imageLoaded, setImageLoaded] = useState(false)
  const [isSubmittingComment, setIsSubmittingComment] = useState(false)
  const [commentSuccess, setCommentSuccess] = useState('')
  const [commentError, setCommentError] = useState('')
  const [currentUserId, setCurrentUserId] = useState(null)
  const [isDeletingComment, setIsDeletingComment] = useState(null)

  useEffect(() => {
    // Obtener el userId del usuario autenticado
    const userId = authService.getCurrentUserId()
    setCurrentUserId(userId ? parseInt(userId) : null)
  }, [])

  const addComment = async (e) => {
    e.preventDefault()
    const text = commentText.trim()
    if (!text) return
    
    if (!observationId) {
      setCommentError('No se pudo identificar el registro')
      return
    }

    setIsSubmittingComment(true)
    setCommentError('')
    setCommentSuccess('')

    try {
      const communityService = new CommunityService()
      console.log('Agregando comentario - observationId:', parseInt(observationId), 'texto:', text)
      const addResponse = await communityService.addComment(parseInt(observationId), text)
      console.log('Respuesta al agregar comentario:', addResponse)
      
      // Mostrar mensaje de éxito
      setCommentSuccess('Comentario agregado exitosamente')
      
      // Limpiar el campo de texto
      setCommentText('')
      
      // Recargar comentarios
      await loadComments()
      
      // Ocultar el mensaje de éxito después de 3 segundos
      setTimeout(() => {
        setCommentSuccess('')
      }, 3000)
      
    } catch (error) {
      console.error('Error al agregar comentario:', error)
      
      if (error.isCorsError) {
        setCommentError('Error de conexión (CORS). El backend necesita configurar los headers CORS para permitir peticiones desde este origen.')
      } else if (error.response && error.response.status === 401) {
        setCommentError('No estás autenticado. Redirigiendo al login...')
        // Redirigir al login después de 2 segundos
        setTimeout(() => {
          window.location.href = '/login'
        }, 2000)
      } else if (error.response && error.response.status === 403) {
        setCommentError('No tienes permisos para comentar.')
      } else if (error.requiresLogin || (error.message && error.message.includes('token'))) {
        setCommentError('No se encontró el token de autenticación. Redirigiendo al login...')
        // Redirigir al login después de 2 segundos
        setTimeout(() => {
          window.location.href = '/login'
        }, 2000)
      } else if (error.response && error.response.status === 500) {
        const serverMessage = error.response?.data?.message || error.response?.data?.error || ''
        let userFriendlyMessage = 'Error interno del servidor. Por favor, intenta de nuevo más tarde.'
        
        if (serverMessage.includes('JDBC Connection') || serverMessage.includes('Unable to commit')) {
          userFriendlyMessage = 'Error de conexión con la base de datos. Por favor, intenta de nuevo en unos momentos.'
        } else if (serverMessage) {
          userFriendlyMessage = serverMessage
        }
        
        setCommentError(userFriendlyMessage)
      } else if (error.response && error.response.data && error.response.data.error) {
        setCommentError(error.response.data.error)
      } else if (error.code === 'ERR_NETWORK' || error.message === 'Network Error') {
        setCommentError('Error de conexión. Verifica que el servidor esté corriendo y que los headers CORS estén configurados correctamente.')
      } else {
        setCommentError('Error al agregar el comentario. Por favor, intenta de nuevo.')
      }
    } finally {
      setIsSubmittingComment(false)
    }
  }

  const deleteComment = async (commentId) => {
    if (!commentId) {
      console.error(' No se proporcionó un ID de comentario válido')
      setCommentError('No se pudo identificar el comentario a eliminar.')
      return
    }

    // Asegurar que commentId sea un número
    const numericCommentId = parseInt(commentId)
    if (isNaN(numericCommentId)) {
      console.error(' El ID del comentario no es un número válido:', commentId)
      setCommentError('ID de comentario inválido.')
      return
    }

    setIsDeletingComment(commentId)
    setCommentError('')
    setCommentSuccess('')

    try {
      const communityService = new CommunityService()
      console.log('Eliminando comentario con ID:', numericCommentId, '(tipo:', typeof numericCommentId, ')')
      await communityService.deleteComment(numericCommentId)
      console.log('Comentario eliminado exitosamente')
      
      // Recargar los comentarios
      await loadComments()
      
      // Mostrar mensaje de éxito
      setCommentSuccess('Comentario eliminado exitosamente')
      setTimeout(() => {
        setCommentSuccess('')
      }, 3000)
      
    } catch (error) {
      console.error('Error al eliminar comentario:', error)
      
      if (error.isCorsError) {
        setCommentError('Error de conexión (CORS). El backend necesita configurar los headers CORS para permitir peticiones desde este origen.')
      } else if (error.response && error.response.status === 401) {
        setCommentError('No estás autenticado. Redirigiendo al login...')
        setTimeout(() => {
          window.location.href = '/login'
        }, 2000)
      } else if (error.response && error.response.status === 403) {
        setCommentError('No tienes permisos para eliminar este comentario.')
      } else if (error.requiresLogin || (error.message && error.message.includes('token'))) {
        setCommentError('No se encontró el token de autenticación. Redirigiendo al login...')
        setTimeout(() => {
          window.location.href = '/login'
        }, 2000)
      } else if (error.response && error.response.status === 500) {
        const serverMessage = error.response?.data?.message || error.response?.data?.error || ''
        let userFriendlyMessage = 'Error interno del servidor. Por favor, intenta de nuevo más tarde.'
        
        if (serverMessage.includes('JDBC Connection') || serverMessage.includes('Unable to commit')) {
          userFriendlyMessage = 'Error de conexión con la base de datos. Por favor, intenta de nuevo en unos momentos.'
        } else if (serverMessage) {
          userFriendlyMessage = serverMessage
        }
        
        setCommentError(userFriendlyMessage)
      } else if (error.response && error.response.data && error.response.data.error) {
        setCommentError(error.response.data.error)
      } else if (error.code === 'ERR_NETWORK' || error.message === 'Network Error') {
        setCommentError('Error de conexión. Verifica que el servidor esté corriendo y que los headers CORS estén configurados correctamente.')
      } else {
        setCommentError('Error al eliminar el comentario. Por favor, intenta de nuevo.')
      }
    } finally {
      setIsDeletingComment(null)
    }
  }

  const formattedDate = new Date(observation.createdAt).toLocaleDateString('es-CO', {
    day: '2-digit', month: 'long', year: 'numeric'
  })

  return (
    <div style={{ minHeight: '100vh', backgroundColor: theme.colors.white }}>
      <TopBar />
      
      <Alert
        type="success"
        message={commentSuccess}
        show={!!commentSuccess}
        onClose={() => setCommentSuccess('')}
        style={{
          position: 'fixed',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10000,
          maxWidth: '500px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}
      />

      <Alert
        type="error"
        message={commentError}
        show={!!commentError}
        onClose={() => setCommentError('')}
        style={{
          position: 'fixed',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10000,
          maxWidth: '500px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}
      />
      
      <main style={{ padding: '3% 4% 4% 8%' }}>
        {/* Botón Volver */}
        <button
          onClick={() => window.history.back()}
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

        {loading && (
          <p style={{ color: theme.colors.primary }}>Cargando...</p>
        )}
        {error && (
          <p style={{ color: '#dc3545' }}>{error}</p>
        )}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.1fr 1fr',
          gap: '40px',
          alignItems: 'center',
          minHeight: 'calc(100vh - 160px)'
        }}>

          <div>
            <div style={{
              borderRadius: '15px',
              overflow: 'hidden',
              width: '100%',
              height: '360px',
              minHeight: '340px',
              position: 'relative',
              backgroundColor: '#f5f5f5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {!imageLoaded && (
                <span className="material-icons-outlined" style={{
                  position: 'absolute',
                  fontSize: '64px',
                  color: theme.colors.disabled
                }}>
                  image
                </span>
              )}
              <img
                src={observation.images?.[0]?.imageUrl}
                alt={observation.species.commonName}
                onLoad={() => setImageLoaded(true)}
                style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: imageLoaded ? 1 : 0 }}
              />
            </div>
            <p style={{
              color: theme.colors.primary,
              fontSize: '12px',
              opacity: 0.8,
              marginTop: '8px'
            }}>
              Publicado por {observation.user.username}
            </p>
            
            <div style={{
              marginTop: '24px',
              borderRadius: '15px',
              backgroundColor: '#F3EFE4',
              padding: '18px 18px'
            }}>
              <h3 style={{
                fontSize: '14px',
                fontWeight: 600,
                color: theme.colors.primary,
                margin: 0,
                marginBottom: '12px'
              }}>Comunidad</h3>

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                maxHeight: '218px',
                overflowY: 'auto',
                paddingRight: '6px'
              }}>
                {comments.map(c => {
                  // Verificar si el comentario pertenece al usuario actual
                  const isOwner = currentUserId && c.userId && parseInt(currentUserId) === parseInt(c.userId)
                  
                  return (
                    <div key={c.id} style={{
                      backgroundColor: 'white',
                      borderRadius: '12px',
                      padding: '12px 14px',
                      border: `1px solid ${theme.colors.disabled}`,
                      position: 'relative'
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '6px'
                      }}>
                        <span style={{ color: theme.colors.disabled, fontSize: '12px' }}>{c.user}</span>
                        {isOwner && (
                          <button
                            onClick={() => deleteComment(c.id)}
                            disabled={isDeletingComment === c.id}
                            style={{
                              background: 'none',
                              border: 'none',
                              cursor: isDeletingComment === c.id ? 'not-allowed' : 'pointer',
                              padding: '4px',
                              borderRadius: '6px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: theme.colors.error,
                              opacity: isDeletingComment === c.id ? 0.5 : 1,
                              transition: 'all 0.2s ease'
                            }}
                            onMouseOver={(e) => {
                              if (isDeletingComment !== c.id) {
                                e.currentTarget.style.backgroundColor = '#fee'
                              }
                            }}
                            onMouseOut={(e) => {
                              e.currentTarget.style.backgroundColor = 'transparent'
                            }}
                            title="Eliminar comentario"
                          >
                            <span className="material-icons-outlined" style={{ fontSize: '18px' }}>
                              {isDeletingComment === c.id ? 'hourglass_empty' : 'delete'}
                            </span>
                          </button>
                        )}
                      </div>
                      <p style={{ color: theme.colors.primary, fontSize: '13px', margin: 0 }}>{c.text}</p>
                    </div>
                  )
                })}
              </div>

              <form onSubmit={addComment} style={{ marginTop: '14px' }}>
                <div style={{
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  border: `1px solid ${theme.colors.disabled}`,
                  display: 'flex',
                  alignItems: 'center',
                  padding: '10px 12px',
                  gap: '12px'
                }}>
                  <input
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Agregar un comentario"
                    disabled={isSubmittingComment}
                    style={{
                      flex: 1,
                      border: 'none',
                      outline: 'none',
                      color: theme.colors.primary,
                      fontSize: '14px',
                      backgroundColor: isSubmittingComment ? '#f5f5f5' : 'transparent',
                      cursor: isSubmittingComment ? 'not-allowed' : 'text'
                    }}
                  />
                  <button 
                    type="submit" 
                    disabled={isSubmittingComment || !commentText.trim()}
                    style={{
                      border: 'none',
                      backgroundColor: isSubmittingComment || !commentText.trim() ? theme.colors.disabled : theme.colors.primary,
                      color: 'white',
                      borderRadius: '12px',
                      padding: '10px 14px',
                      cursor: isSubmittingComment || !commentText.trim() ? 'not-allowed' : 'pointer',
                      opacity: isSubmittingComment ? 0.7 : 1,
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {isSubmittingComment ? 'Publicando...' : 'Publicar'}
                  </button>
                </div>
              </form>
            </div>
          </div>

          
          <div>
            <div style={{
              backgroundColor: '#F3EFE4',
              borderRadius: '15px',
              padding: '16px 18px',
              marginBottom: '18px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h1 style={{ fontSize: '18px', fontWeight: 600, color: theme.colors.primary, margin: 0 }}>
                    {observation.species.commonName}
                  </h1>
                  <p style={{ fontStyle: 'italic', color: theme.colors.primary, opacity: 0.8, margin: 0 }}>
                    {observation.species.scientificName}
                  </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ color: theme.colors.primary, fontSize: '12px', margin: 0 }}>{observation.location.location}</p>
                  <p style={{ color: theme.colors.primary, fontSize: '12px', margin: 0 }}>{formattedDate}</p>
                </div>
              </div>
            </div>

            <div style={{
              borderRadius: '15px',
              border: `1px solid ${theme.colors.disabled}`,
              padding: '16px 18px',
              marginBottom: '18px'
            }}>
              <h3 style={{ fontSize: '14px', fontWeight: 600, color: theme.colors.primary, margin: 0, marginBottom: '12px' }}>Notas del observador</h3>
              <p style={{ color: theme.colors.primary, fontSize: '14px', margin: 0 }}>{observation.description}</p>
            </div>

            {/*
            <div style={{ marginBottom: '18px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 600, color: theme.colors.primary, margin: 0, marginBottom: '12px' }}>Categoría</h3>
              <p style={{ color: theme.colors.primary, fontSize: '14px', margin: 0 }}>{observation.category}</p>
            </div>
            */}

            <div>
              <h3 style={{ fontSize: '14px', fontWeight: 600, color: theme.colors.primary, margin: 0, marginBottom: '12px' }}>Mapa</h3>
              <div style={{
                height: '285px',
                borderRadius: '15px',
                overflow: 'hidden',
                border: `1px solid ${theme.colors.disabled}`
              }}>
                <img
                  src={mapImage}
                  alt={'Mapa de ubicación'}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default ObservationDetail


