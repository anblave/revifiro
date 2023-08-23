import { Navigate, Route, Routes } from "react-router-dom"
import { Login } from "./views/Login"
import { Home } from "./views/Home"
import { NavBarTemp } from "./components/NavBarTemp"
import { RequireAuth } from "./components/RequireAuth"
import { Admin } from "./views/Admin"
import { Sales } from "./views/Sales"

function App() {

  return (
    <>
      <NavBarTemp />
      <h1>App</h1>
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* <Route path="/" element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        /> */}
        <Route element={<RequireAuth allowedRoles={[9001]} />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={[1003]}/>}>
          <Route path="/admin" element={<Admin />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={[2002]}/>}>
          <Route path="/sales" element={<Sales />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  )
}

export default App
