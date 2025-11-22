# 📁 Arquitectura del Proyecto
## Avistamientos de Especies Silvestres - Armenia, Quindío

Este documento describe la estructura de carpetas y archivos del proyecto frontend en React.

## 🌳 Estructura de Carpetas

```
src/
├── assets/                 # Recursos estáticos
│   ├── images/            # Imágenes (logos, ilustraciones, etc.)
│   └── icons/             # Iconos SVG o PNG
│
├── components/            # Componentes React reutilizables
│   ├── common/           # Componentes genéricos y reutilizables
│   │   ├── Button/       # Botón personalizado con estilos del proyecto
│   │   ├── Input/        # Input con validación
│   │   ├── Card/         # Card para mostrar información
│   │   ├── Modal/        # Modal/Dialog
│   │   ├── Loader/       # Spinner de carga
│   │   └── ...
│   │
│   ├── layout/           # Componentes de estructura/layout
│   │   ├── TopBar/       # Barra superior de navegación
│   │   ├── Footer/       # Pie de página
│   │   └── Sidebar/      # Barra lateral (opcional)
│   │
│   ├── observations/     # Componentes relacionados con observaciones
│   │   ├── ObservationCard/      # Card para mostrar una observación
│   │   ├── ObservationList/      # Lista de observaciones
│   │   ├── ObservationForm/      # Formulario para crear observación
│   │   ├── ImageUploader/        # Componente para subir imágenes
│   │   └── SpeciesSuggestions/   # Muestra las 3 sugerencias de IA
│   │
│   ├── community/        # Componentes de interacción social
│   │   ├── CommentList/          # Lista de comentarios
│   │   ├── CommentForm/          # Formulario de comentarios
│   │   └── LikeButton/           # Botón de "me gusta"
│   │
│   ├── auth/             # Componentes de autenticación
│   │   ├── LoginForm/            # Formulario de login
│   │   ├── RegisterForm/         # Formulario de registro
│   │   └── ProtectedRoute/       # HOC para rutas protegidas
│   │
│   └── map/              # Componentes relacionados con mapas
│       ├── MapView/              # Visualización del mapa
│       ├── MapMarker/            # Marcador en el mapa
│       └── LocationPicker/       # Selector de ubicación
│
├── pages/                # Páginas/Vistas principales
│   ├── Home.jsx                  # Página principal
│   ├── Login.jsx                 # Página de login
│   ├── Register.jsx              # Página de registro
│   ├── ObservationDetail.jsx    # Detalle de una observación
│   ├── CreateObservation.jsx    # Crear nueva observación
│   ├── Profile.jsx               # Perfil de usuario
│   └── MapExplorer.jsx           # Vista del mapa con observaciones
│
├── hooks/                # Custom Hooks
│   ├── useAuth.js               # Hook para autenticación
│   ├── useObservations.js       # Hook para manejar observaciones
│   ├── useComments.js           # Hook para comentarios
│   └── useGeolocation.js        # Hook para geolocalización
│
├── services/             # Servicios de comunicación con APIs
│   ├── authService.js           # Llamadas al auth-ms
│   ├── observationsService.js   # Llamadas al observations-ms
│   ├── communityService.js      # Llamadas al community-ms
│   └── iaService.js             # Llamadas al servicio de IA (Python)
│
├── contexts/             # Context API para estado global
│   ├── AuthContext.jsx          # Contexto de autenticación
│   └── NotificationContext.jsx  # Contexto de notificaciones
│
├── utils/                # Utilidades y helpers
│   ├── formatDate.js            # Formatear fechas
│   ├── validators.js            # Funciones de validación
│   ├── imageHelpers.js          # Helpers para manejo de imágenes
│   └── constants.js             # Constantes del proyecto
│
├── styles/               # Estilos globales
│   ├── theme.js                 # Tema (colores, fuentes, etc.)
│   └── globals.css              # Estilos CSS globales
│
├── config/               # Archivos de configuración
│   └── api.js                   # Configuración de endpoints de APIs
│
├── App.jsx               # Componente raíz de la aplicación
├── main.jsx              # Punto de entrada
└── index.css             # Estilos base
```

## 🎨 Paleta de Colores

| Color | Hex | Uso |
|-------|-----|-----|
| Primary (Verde oscuro) | `#355543` | TopBar, botones principales, bordes de campos |
| Light (Gris claro) | `#EEEEEE` | Texto, botones sobre fondos verdes, campos sin seleccionar |
| Secondary (Beige) | `#ECDDB7` | Background de cards, botones de cancelar |
| Disabled (Verde grisáceo) | `#B4C0B9` | Botones deshabilitados, hover de dropdowns |

## 🔤 Tipografía

- **Fuente principal**: Montserrat (Google Fonts)
- **Pesos disponibles**: 300, 400, 500, 600, 700

## 🔗 Microservicios Backend

El proyecto se conecta a 4 microservicios:

1. **auth-ms** (Java) - Puerto 8081
   - Autenticación y autorización
   - Gestión de usuarios

2. **observations-ms** (Java) - Puerto 8082
   - CRUD de observaciones
   - Gestión de imágenes
   - Geolocalización

3. **community-ms** (Java) - Puerto 8083
   - Comentarios
   - Likes/Reacciones
   - Compartir

4. **ia-service** (Python) - Puerto 8000
   - Identificación de especies mediante IA
   - Sugerencias de especies basadas en imagen

## 🚀 Comandos Disponibles

```bash
npm run dev      # Iniciar servidor de desarrollo
npm run build    # Crear build de producción
npm run preview  # Previsualizar build de producción
```

## 📝 Convenciones de Código

1. **Componentes**: PascalCase (ej: `ObservationCard.jsx`)
2. **Hooks**: camelCase con prefijo "use" (ej: `useAuth.js`)
3. **Utilidades**: camelCase (ej: `formatDate.js`)
4. **Constantes**: UPPER_SNAKE_CASE (ej: `API_BASE_URL`)
5. **Variables CSS**: kebab-case con prefijo "--" (ej: `--color-primary`)

## 🔐 Variables de Entorno

Crear un archivo `.env` basado en `.env.example`:

```bash
cp .env.example .env
```

Configurar las URLs de los microservicios y API keys necesarias.

## 📚 Próximos Pasos

1. Instalar dependencias adicionales (React Router, librería de mapas, etc.)
2. Implementar sistema de enrutamiento
3. Crear componentes base del design system
4. Implementar servicios de API
5. Desarrollar páginas principales

