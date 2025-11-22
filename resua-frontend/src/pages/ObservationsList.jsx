import React from 'react'
import { theme } from '../styles/theme'
import TopBar from '../components/layout/TopBar'
import ObservationCard from '../components/observations/ObservationCard'

const ObservationsList = () => {
  const observations = [
    {
      id: 1,
      image: '/src/assets/images/mapspng.png',
      commonName: 'Mono aullador rojo',
      scientificName: 'Alouatta seniculus',
      location: 'Oro Negro',
      date: '10 de abril de 2024'
    },
    {
      id: 2,
      image: '/src/assets/images/mapspng.png',
      commonName: 'Gavilán pollero',
      scientificName: 'Rupornis magnirostris',
      location: 'Centro de Armenia',
      date: '15 de marzo de 2024'
    },
    {
      id: 3,
      image: '/src/assets/images/mapspng.png',
      commonName: 'Colibrí esmeralda',
      scientificName: 'Amazilia saucerottei',
      location: 'Parque de la Vida',
      date: '22 de febrero de 2024'
    }
  ]

  const handleViewMore = (observationId) => {
    console.log('Ver más detalles de la observación:', observationId)
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      <TopBar />
      
      <main style={{ padding: '2% 3% 3% 7%' }}>
        <h1 style={{
          fontSize: '28px',
          fontWeight: 600,
          color: theme.colors.primary,
          marginBottom: '32px'
        }}>
          Avistamientos registrados
        </h1>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          maxWidth: '800px'
        }}>
          {observations.map((observation) => (
            <ObservationCard
              key={observation.id}
              image={observation.image}
              commonName={observation.commonName}
              scientificName={observation.scientificName}
              location={observation.location}
              date={observation.date}
              onViewMore={() => handleViewMore(observation.id)}
            />
          ))}
        </div>
      </main>
    </div>
  )
}

export default ObservationsList
