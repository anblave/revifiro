import { useContext, useEffect, useState } from "react"
import { UserContext } from "../context/UserContextProvider"
import { useNavigate } from "react-router-dom"

export const Login = () => {
  const navigate = useNavigate()
  const {user: currentUser, login} = useContext(UserContext)

  const [user, setUser] = useState(null)
  const [pass, setPass] = useState(null)

  const handleLogin = async () => {
    try {
      const loginResp = await login(user, pass)
    } catch (error) {
      console.log('error - LOGIN COMP')
      console.log(error)
      console.log(error.message)
      alert("Ocurrio error al tratar de iniciar sesión, por favor intentelo nuevamente")
    }
  }

  useEffect(() => {
    if (currentUser) {
      return navigate("/")
    }
  }, [currentUser])

  return <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
  {/* <img src={ImageLogo} alt='Logo' style={{width: 300, paddingTop: 50}} /> */}
  <div>
    <div>
      <label htmlFor="usuario">Usuario</label>
      <input
        id="usuario"
        onChange={(e) => {setUser(e.target.value)}}
      />
    </div>
    <div>
      <label htmlFor="contraseña">Contraseña</label>
      <input
        id="contraseña"
        onChange={(e) => setPass(e.target.value)}
        type='password'
      />
    </div>
  </div>
  <button
    label='Iniciar Sesión'
    onClick={handleLogin}
  >Iniciar sesión</button>
</div>
}