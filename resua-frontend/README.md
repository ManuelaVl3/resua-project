# 🦜 Avistamientos Armenia
### Plataforma de Registro de Especies Silvestres en Zonas Urbanas

Aplicación web para registrar y compartir avistamientos de especies silvestres en las zonas urbanas de Armenia, Quindío, Colombia.

## 🌟 Características

- 📸 **Subir observaciones** con imágenes de especies
- 🤖 **IA para identificación** de especies (3 sugerencias automáticas)
- 🗺️ **Mapa interactivo** para ubicar avistamientos
- 💬 **Comunidad activa** con comentarios y reacciones
- 🔐 **Sistema de autenticación** seguro
- 📱 **Diseño responsive** para móviles y desktop

## 🛠️ Tecnologías

### Frontend
- ⚛️ React 18
- ⚡ Vite
- 🎨 CSS3 con variables personalizadas
- 🔤 Fuente Montserrat

### Backend (Microservicios)
- ☕ Java (auth-ms, observations-ms, community-ms)
- 🐍 Python (ia-service)

## 🎨 Paleta de Colores

- **Primary**: `#355543` (Verde oscuro)
- **Light**: `#EEEEEE` (Gris claro)
- **Secondary**: `#ECDDB7` (Beige)
- **Disabled**: `#B4C0B9` (Verde grisáceo)

## 🚀 Inicio Rápido

### Instalación

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

### Configuración

1. Copiar el archivo de ejemplo de variables de entorno:
```bash
cp .env.example .env
```

2. Configurar las URLs de los microservicios en `.env`

3. Configurar API keys si usas servicios de mapas (Google Maps o Mapbox)

## 📚 Documentación

Para más detalles sobre la arquitectura del proyecto, consulta [ARQUITECTURA.md](./ARQUITECTURA.md)

## 🤝 Contribuir

Este proyecto está en desarrollo activo. Para contribuir:

1. Revisa la documentación de arquitectura
2. Sigue las convenciones de código establecidas
3. Asegúrate de que tu código siga el estilo del proyecto

## 📝 Licencia

Proyecto educativo - Armenia, Quindío 🇨🇴

---

Desarrollado con 💚 para la conservación de la biodiversidad urbana

