import React, { useEffect, useState } from 'react'
import { theme } from '../styles/theme'
import TopBar from '../components/layout/TopBar'
import Input from '../components/common/Input'
import TextArea from '../components/common/TextArea'
import Select from '../components/common/Select'
import SaveButton from '../components/common/SaveButton'
import CancelButton from '../components/common/CancelButton'
import Alert from '../components/common/Alert'
import { SPECIES_CATEGORIES } from '../utils/constants'
import ObservationsService from '../services/observations/ObservationsService'

const EditObservation = () => {
  const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null
  const observationId = params ? params.get('id') : null

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [loadedObservation, setLoadedObservation] = useState(null)
  const [formData, setFormData] = useState({
    image: null,
    commonName: '',
    scientificName: '',
    category: '',
    observationDetail: '',
    addressDescription: ''
  })

  const observationsService = new ObservationsService()

  useEffect(() => {
    const load = async () => {
      if (!observationId) return
      setLoading(true)
      setError(null)
      try {
        const obs = await observationsService.getObservationById(observationId)
        setFormData({
          image: null,
          commonName: obs.species?.commonName || '',
          scientificName: obs.species?.scientificName || '',
          category: obs.category || '',
          observationDetail: obs.description || '',
          addressDescription: obs.location?.location || ''
        })
        setLoadedObservation(obs)
        if (obs.images && obs.images.length > 0) {
          setImagePreview(obs.images[0].imageUrl)
        } else {
          setImagePreview(null)
        }
      } catch (e) {
        console.error(e)
        setError('Error cargando el registro')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [observationId])

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      setFormData(prev => ({ ...prev, image: file }))
      const reader = new FileReader()
      reader.onloadend = () => setImagePreview(reader.result)
      reader.readAsDataURL(file)
    }
  }

  const isFormValid = () => {
    return (
      formData.commonName.trim() !== '' &&
      formData.scientificName.trim() !== '' &&
      formData.observationDetail.trim() !== '' &&
      formData.addressDescription.trim() !== ''
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!isFormValid()) return
    setShowConfirm(true)
  }

  const handleConfirmUpdate = async () => {
    try {
      const body = {
        userId: loadedObservation?.userId || 1,
        commonName: formData.commonName,
        scientificName: formData.scientificName,
        longitude: loadedObservation?.location?.longitude,
        latitude: loadedObservation?.location?.latitude,
        location: formData.addressDescription,
        description: formData.observationDetail
      }
      await observationsService.updateObservation(observationId, body)
      setShowConfirm(false)
      setShowSuccess(true)
      setTimeout(() => {
        setShowSuccess(false)
        if (typeof window !== 'undefined') window.location.reload()
      }, 1200)
    } catch (e) {
      console.error(e)
      setShowConfirm(false)
      setError('Error guardando los cambios')
    }
  }

  const handleCancelUpdate = () => setShowConfirm(false)

  return (
    <div style={{ minHeight: '100vh', backgroundColor: theme.colors.white }}>
      <TopBar />
      <main style={{ padding: '2% 3% 3% 7%' }}>
        {showConfirm && (
          <div style={{
            position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.35)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 3000
          }}>
            <div style={{ backgroundColor: 'white', borderRadius: '15px', padding: '20px 24px', width: 'min(92vw, 420px)' }}>
              <h3 style={{ margin: 0, marginBottom: '10px', color: theme.colors.primary }}>¿Editar este registro?</h3>
              <p style={{ margin: 0, marginBottom: '16px', color: theme.colors.primary, opacity: 0.9 }}>Se actualizará la información del avistamiento.</p>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button onClick={handleCancelUpdate} style={{ padding: '10px 14px', borderRadius: '12px', border: `1px solid ${theme.colors.disabled}`, backgroundColor: 'white', color: theme.colors.primary, cursor: 'pointer' }}>No</button>
                <button onClick={handleConfirmUpdate} style={{ padding: '10px 14px', borderRadius: '12px', border: 'none', backgroundColor: theme.colors.primary, color: 'white', cursor: 'pointer' }}>Sí, editar</button>
              </div>
            </div>
          </div>
        )}
        <Alert
          type="success"
          message="Cambios guardados correctamente"
          show={showSuccess}
          onClose={() => setShowSuccess(false)}
          style={{
            position: 'fixed',
            top: '90px',
            right: '30px',
            zIndex: 3000,
            maxWidth: '400px'
          }}
        />
        <h1 style={{
          fontSize: '28px', fontWeight: 600, color: theme.colors.primary, marginBottom: '24px'
        }}>
          Editar registro
        </h1>

        {loading ? (
          <p style={{ color: theme.colors.primary }}>Cargando...</p>
        ) : error ? (
          <Alert
            type="error"
            message={error}
            show={!!error}
            onClose={() => setError(null)}
          />
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6%', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{
                display: 'flex', alignItems: 'center', padding: '4% 5%', border: `1px solid ${theme.colors.disabled}`,
                borderRadius: '15px', marginBottom: '24px', gap: '3%'
              }}>
                <div style={{ width: 'clamp(40px, 5vw, 60px)', height: 'clamp(40px, 5vw, 60px)', borderRadius: '15px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {imagePreview ? (
                    <img src={imagePreview} alt={'Vista previa'} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <span className="material-icons-outlined" style={{ fontSize: 'clamp(32px, 4vw, 48px)', color: theme.colors.disabled }}>add_photo_alternate</span>
                  )}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ color: theme.colors.primary, margin: 0, marginBottom: '6px', fontSize: '16px', fontWeight: 500 }}>
                    {formData.image ? formData.image.name : 'Actualiza la imagen si es necesario'}
                  </p>
                  <p style={{ color: theme.colors.disabled, fontSize: '14px', margin: 0 }}>Formatos permitidos: JPEG, PNG</p>
                </div>
                <label htmlFor="edit-image-input" style={{ cursor: 'pointer' }}>
                  <div style={{
                    backgroundColor: theme.colors.primary, color: 'white', padding: '8px 12px', borderRadius: '15px'
                  }}>Subir</div>
                </label>
                <input id="edit-image-input" type="file" accept="image/jpeg,image/png,image/jpg" onChange={handleImageUpload} style={{ display: 'none' }} />
              </div>

              <Input label="Nombre común" value={formData.commonName} onChange={(e) => handleInputChange('commonName', e.target.value)} />
              <Input label="Nombre científico" value={formData.scientificName} onChange={(e) => handleInputChange('scientificName', e.target.value)} />
                {/*<Select label="Categoría" options={SPECIES_CATEGORIES} value={formData.category} onChange={(e) => handleInputChange('category', e.target.value)} placeholder="Selecciona una categoría" />*/}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <TextArea label="Detalle de avistamiento" rows={4} value={formData.observationDetail} onChange={(e) => handleInputChange('observationDetail', e.target.value)} />

              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 600, color: theme.colors.primary, marginBottom: '16px' }}>Ubicar en el mapa el lugar de avistamiento</h3>
                <div style={{ height: '200px', borderRadius: '15px', overflow: 'hidden', border: `1px solid ${theme.colors.disabled}`, position: 'relative' }}>
                  <span className="material-icons-outlined" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: theme.colors.primary }}>place</span>
                </div>
              </div>

              <TextArea label="Descripción de la dirección de avistamiento" rows={4} value={formData.addressDescription} onChange={(e) => handleInputChange('addressDescription', e.target.value)} />

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '8px' }}>
                <CancelButton onClick={() => window.history.back()} style={{ padding: '10px 18px' }} />
                <SaveButton type="submit" isValid={isFormValid()} style={{ padding: '10px 18px' }}>
                  Guardar cambios
                </SaveButton>
              </div>
            </div>
          </form>
        )}
      </main>
    </div>
  )
}

export default EditObservation


