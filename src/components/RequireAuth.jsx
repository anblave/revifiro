import { useContext } from "react"
import { UserContext } from "../context/UserContextProvider"
import { Navigate, Outlet, useLocation } from "react-router-dom"

export const RequireAuth = ({allowedRoles}) => {
  const {user} = useContext(UserContext)
  //const location = useLocation()

  /* if (!user) {
    return <Navigate to="/login" />
  } */

  console.log('user - RequireAuth')
  console.log(user)
  return (
    user?.firedb?.roles?.find(role => allowedRoles?.includes(role))
      ? <Outlet />
      : !user
        ? <Navigate to="/login" /* state={{from: location}} replace */ />
        : <Navigate to="/" />
  )
}