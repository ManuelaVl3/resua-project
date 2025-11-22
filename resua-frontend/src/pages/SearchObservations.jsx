import React, { useState, useEffect } from 'react'
import { theme } from '../styles/theme'
import TopBar from '../components/layout/TopBar'
import ObservationCard from '../components/observations/ObservationCard'
import ChatBot from '../components/chat/ChatBot'
import { SPECIES_CATEGORIES } from '../utils/constants'
import AgentService from "../services/AgentService.js";

const SearchObservations = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [observations, setObservations] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [pageSize, setPageSize] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)

  const agentService = new AgentService()

  const loadObservations = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await agentService.queryObservations("muestrame todas las observaciones")
      console.log(response.data.result)
      setObservations(response.data.result || [])
    } catch (err) {
      setError('Error al cargar las observaciones')
      console.error('Error:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadObservations()
  }, [])

  const handleChatQueryResults = (queryResults) => {
    setObservations(queryResults)
    setError(null)
    setCurrentPage(1)
  }

  const handleViewMore = (observationId) => {
    const url = `/observation-detail?id=${encodeURIComponent(observationId)}`
    window.location.assign(url)
  }

  const handlePageSizeChange = (e) => {
    const newSize = parseInt(e.target.value, 10)
    setPageSize(newSize)
    setCurrentPage(1)
  }

  const totalPages = Math.max(1, Math.ceil(observations.length / pageSize))
  const safeCurrentPage = Math.min(currentPage, totalPages)
  const startIndex = (safeCurrentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const visibleObservations = observations.slice(startIndex, endIndex)

  const goToPrevPage = () => {
    setCurrentPage(prev => Math.max(1, prev - 1))
  }

  const goToNextPage = () => {
    setCurrentPage(prev => Math.min(totalPages, prev + 1))
  }

  const categoryOptions = [
    { value: '', label: 'Todas las categorías' },
    ...SPECIES_CATEGORIES
  ]

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F3EFE4' }}>
      <TopBar />
      
      <main style={{ padding: '2% 3% 3% 7%' }}>
        <h1 style={{
          fontSize: '28px',
          fontWeight: 600,
          color: theme.colors.primary,
          marginBottom: '32px'
        }}>
          Buscar avistamientos
        </h1>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 2fr',
          gap: '24px',
          alignItems: 'start'
        }}>
          <div>
            <ChatBot onQueryResults={handleChatQueryResults} />
          </div>

          <div>
            <div style={{
              backgroundColor: theme.colors.white,
              borderRadius: '15px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              height: '600px',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <div style={{
                padding: '20px 24px',
                borderBottom: `1px solid ${theme.colors.disabled}`,
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px'
              }}>
                <h2 style={{
                  fontSize: '20px',
                  fontWeight: 600,
                  color: theme.colors.primary,
                  margin: 0
                }}>
                  Avistamientos encontrados ({observations.length})
                </h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: theme.colors.primary, fontSize: '14px' }}>Mostrar:</span>
                  <select
                    value={pageSize}
                    onChange={handlePageSizeChange}
                    style={{
                      padding: '6px 10px',
                      borderRadius: '15px',
                      border: `1px solid ${theme.colors.primary}`,
                      color: theme.colors.primary,
                      backgroundColor: 'white',
                      cursor: 'pointer',
                      appearance: 'none',
                      WebkitAppearance: 'none',
                      MozAppearance: 'none',
                      backgroundImage: "url('data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'16\\' height=\\'16\\' viewBox=\\'0 0 24 24\\'><path fill=\\'%236a8c7a\\' d=\\'M7 10l5 5 5-5z\\'/></svg>')",
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 10px center',
                      paddingRight: '34px'
                    }}
                  >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={30}>30</option>
                    <option value={50}>50</option>
                  </select>
                  <span style={{ color: theme.colors.disabled, fontSize: '12px' }}>por página</span>
                </div>
              </div>

              <div style={{
                flex: 1,
                overflowY: 'auto',
                padding: '20px 24px'
              }}>
                {loading ? (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
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
                      Cargando observaciones...
                    </p>
                  </div>
                ) : error ? (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    flexDirection: 'column'
                  }}>
                    <span className="material-icons-outlined" style={{
                      fontSize: '48px',
                      color: '#dc3545',
                      marginBottom: '16px'
                    }}>
                      error_outline
                    </span>
                    <p style={{
                      color: '#dc3545',
                      fontSize: '16px',
                      textAlign: 'center'
                    }}>
                      {error}
                    </p>
                  </div>
                ) : observations.length > 0 ? (
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px'
                  }}>
                    {visibleObservations.map((observation) => (
                      <ObservationCard
                        key={observation.id}
                        image={observation.images && observation.images.length > 0 
                          ? observation.images[0].image_url 
                          : '/src/assets/images/default-species.jpg'}
                        commonName={observation.species.common_name}
                        scientificName={observation.species.scientific_name}
                        location={observation.location.location}
                        date={new Date(observation.created_at).toLocaleDateString('es-CO', {
                          day: '2-digit',
                          month: 'long',
                          year: 'numeric'
                        })}
                        onViewMore={() => handleViewMore(observation.id)}
                      />
                    ))}
                  </div>
                ) : (
                  <div style={{
                    textAlign: 'center',
                    padding: '40px 20px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%'
                  }}>
                    <span className="material-icons-outlined" style={{
                      fontSize: '64px',
                      color: theme.colors.disabled,
                      marginBottom: '16px'
                    }}>
                      chat_bubble_outline
                    </span>
                    <h3 style={{
                      fontSize: '18px',
                      fontWeight: 600,
                      color: theme.colors.primary,
                      marginBottom: '8px'
                    }}>
                      Pregúntale al asistente de IA
                    </h3>
                    <p style={{
                      fontSize: '14px',
                      color: theme.colors.disabled,
                      margin: 0
                    }}>
                      Escribe en el chat para buscar especies, ubicaciones o información sobre avistamientos
                    </p>
                  </div>
                )}
              </div>
              {observations.length > 0 && (
                <div style={{
                  padding: '12px 16px',
                  borderTop: `1px solid ${theme.colors.disabled}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <span style={{ color: theme.colors.disabled, fontSize: '12px' }}>
                    Mostrando {startIndex + 1}-{Math.min(endIndex, observations.length)} de {observations.length}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <button
                      onClick={goToPrevPage}
                      disabled={safeCurrentPage === 1}
                      style={{
                        padding: '8px 12px',
                        borderRadius: '15px',
                        border: 'none',
                        backgroundColor: safeCurrentPage === 1 ? theme.colors.disabled : theme.colors.primary,
                        color: 'white',
                        cursor: safeCurrentPage === 1 ? 'not-allowed' : 'pointer'
                      }}
                    >
                      Anterior
                    </button>
                    <span style={{ color: theme.colors.primary, fontSize: '12px' }}>
                      Página {safeCurrentPage} de {totalPages}
                    </span>
                    <button
                      onClick={goToNextPage}
                      disabled={safeCurrentPage === totalPages}
                      style={{
                        padding: '8px 12px',
                        borderRadius: '15px',
                        border: 'none',
                        backgroundColor: safeCurrentPage === totalPages ? theme.colors.disabled : theme.colors.primary,
                        color: 'white',
                        cursor: safeCurrentPage === totalPages ? 'not-allowed' : 'pointer'
                      }}
                    >
                      Siguiente
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default SearchObservations
