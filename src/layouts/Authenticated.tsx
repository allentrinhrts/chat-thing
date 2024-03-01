import { Navigate, Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { useNavigate } from 'react-router-dom'

function Authenticated() {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  if (!isLoggedIn) {
    return <Navigate to="/login" />
  }

  /**
   * Log the user out and redirect to the login page
   * @returns {void}
   */
  function handleLogOut() {
    // TODO: add some real logic here
    try {
      dispatch({ type: 'auth/setIsLoggedIn', payload: false })
      navigate('/login', { replace: true })
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div className="bg-slate-800 relative">
      <div className="container mx-auto flex justify-center items-center h-screen py-8">
        <Outlet />
      </div>
    </div>
  )
}

export default Authenticated
