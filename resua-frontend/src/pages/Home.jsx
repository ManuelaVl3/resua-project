import { theme } from '../styles/theme'
import TopBar from '../components/layout/TopBar'
import aotusImage from '../assets/images/mainpage/aotus.jpg'
import searchImage from '../assets/images/mainpage/search.png'
import summaryAboutResuaImage from '../assets/images/mainpage/summary-about-resua.png'

const Home = () => {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: theme.colors.white }}>
      <TopBar />
      
      {/* Hero Section con imagen principal */}
      <section
        style={{
          position: 'relative',
          width: '100%',
          minHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: '90px',
          overflow: 'hidden'
        }}
      >
        {/* Imagen de fondo */}
        <img
          src={aotusImage}
          alt="Aotus"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0
          }}
        />
        
        {/* Overlay oscuro para mejorar legibilidad del texto */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.49)',
            zIndex: 1,
          }}
        />
        
        {/* Contenido del texto */}
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            maxWidth: '800px',
            color: theme.colors.white, 
            marginTop: '50px'
          }}
        >
          {/* Subtítulo */}
          <p
            style={{
              fontSize: '20px',
              fontWeight: 400,
              margin: 0,
              marginBottom: '20px',
              color: theme.colors.white,
              fontFamily: theme.fonts.primary
            }}
          >
            RESUA | Registros de Avistamiento de Especies Silvestres<br />
            en Zonas Urbanas de Armenia
          </p>
          
          {/* Título principal */}
          <h1
            style={{
              fontSize: '46px',
              fontWeight: 500,
              margin: 0,
              marginBottom: '80px',
              lineHeight: '1.1',
              color: theme.colors.white,
              fontFamily: theme.fonts.primary,
              textShadow: '0 2px 8px rgba(0, 0, 0, 0.28)'
            }}
          >
            Registra tus avistamientos, comparte con la comunidad y aporta al conocimiento y conservación de las especies silvestres del Quindío
          </h1>
          
          {/* Imagen de búsqueda */}
          <a
            href="/search-observation"
            onClick={(e) => {
              e.preventDefault()
              window.location.href = '/search-observation'
            }}
            style={{
              cursor: 'pointer',
              display: 'inline-block',
              textDecoration: 'none'
            }}
          >
            <img
              src={searchImage}
              alt="Búsqueda"
              style={{
                maxWidth: '150%',
                opacity: 0.75,
                transition: 'opacity 0.3s ease'
              }}
              onMouseOver={(e) => e.currentTarget.style.opacity = '0.9'}
              onMouseOut={(e) => e.currentTarget.style.opacity = '0.75'}
            />
          </a>
        </div>
      </section>

      {/* Sección ¿Qué es RESUA? */}
      <section
        style={{
          padding: '80px 8%',
          marginTop: '60px',
          backgroundColor: theme.colors.white
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '60px',
            alignItems: 'center',
            maxWidth: '1400px',
            margin: '0 auto'
          }}
        >
          {/* Texto a la izquierda */}
          <div>
            <h2
              style={{
                fontSize: '40px',
                fontWeight: 600,
                color: theme.colors.primary,
                margin: 0,
                marginBottom: '50px',
                fontFamily: theme.fonts.primary
              }}
            >
              ¿Qué es RESUA?
            </h2>
            <p
              style={{
                fontSize: '19px',
                fontWeight: 400,
                color: theme.colors.primary,
                lineHeight: '1.6',
                margin: 0,
                fontFamily: theme.fonts.primary
              }}
            >
              Es un espacio colaborativo que permite a cualquier persona, en cualquier lugar, registrar, consultar y compartir información sobre la fauna silvestre presente en entornos urbanos y periurbanos de la ciudad de Armenia, Quindío.
            </p>
          </div>

          {/* Imagen a la derecha */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              overflow: 'visible'
            }}
          >
            <img
              src={summaryAboutResuaImage}
              alt="Resumen sobre RESUA"
              style={{
                width: '100%',
                height: 'auto',
                transformOrigin: 'center',
                marginLeft: '30%'
              }}
            />
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home

