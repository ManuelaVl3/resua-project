import MyObservations from './pages/MyObservations'
import CreateObservation from './pages/CreateObservation'
import ObservationDetail from './pages/ObservationDetail'
import EditObservation from './pages/EditObservation'
import SearchObservations from './pages/SearchObservations'
import Login from './pages/Login'
import Profile from './pages/Profile'
import EditProfile from './pages/EditProfile'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import Home from './pages/Home'

function App() {
  const path = typeof window !== 'undefined' ? window.location.pathname : '/'
  const isHome = path === '/'
  const isCreate = path === '/create-observation'
  const isDetail = path === '/observation-detail'
  const isEdit = path === '/edit-observation'
  const isMy = path === '/my-observations'
  const isSearch = path === '/search-observation'
  const isLogin = path === '/login'
  const isProfile = path === '/profile'
  const isEditProfile = path === '/edit-profile'
  const isRegister = path === '/register'
  const isForgotPassword = path === '/forgot-password'

  return (
    <div>
      {isHome ? (
        <Home />
      ) : isLogin ? (
        <Login />
      ) : isRegister ? (
        <Register />
      ) : isForgotPassword ? (
        <ForgotPassword />
      ) : isProfile ? (
        <Profile />
      ) : isEditProfile ? (
        <EditProfile />
      ) : isCreate ? (
        <CreateObservation />
      ) : isDetail ? (
        <ObservationDetail />
      ) : isEdit ? (
        <EditObservation />
      ) : isSearch ? (
        <SearchObservations />
      ) : (
        <MyObservations />
      )}
    </div>
  )
}

export default App

