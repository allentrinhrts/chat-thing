import { Outlet } from 'react-router-dom'
// import { useDispatch, useSelector } from 'react-redux'
// import { RootState } from '../store/store'
// import { useNavigate } from 'react-router-dom'

function Authenticated() {
  // const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn)
  // const dispatch = useDispatch()
  // const navigate = useNavigate()

  // TODO: Maybe replace this with an API key check?
  // if (!isLoggedIn) {
  //   return <Navigate to="/login" />
  // }

  return (
    <div className="flex justify-center items-center h-full">
      <Outlet />
    </div>
  )
}

export default Authenticated
