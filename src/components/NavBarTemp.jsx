import { useContext, useEffect } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { UserContext } from "../context/UserContextProvider"

export const NavBarTemp = () => {
  //const navigate = useNavigate()
  const {user, logout} = useContext(UserContext)

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.log('error - logout')
      console.log(error)
    }
  }

  /* useEffect(() => {
    if (!user) {
      return navigate("/login")
    }
  }, [user]) */

  return <div>{user ?
      <>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/admin">Admin</NavLink>
        <NavLink to="/sales">Sales</NavLink>
        <button onClick={handleLogout}>Log me out</button>
      </>
      : <NavLink to="/login">Login</NavLink>
    }
  </div>

}