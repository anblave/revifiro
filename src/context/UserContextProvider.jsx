import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { createContext, useEffect, useState } from "react"
import { auth, db } from "../backend/conn"
import { getDoc, doc } from "firebase/firestore"

export const UserContext = createContext()

export const UserProvider = ({children}) => {
  const [user, setUser] = useState(null)

  const login = async (email, password) => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password)
      console.log('user')
      console.log(user)
      const userRef = doc(db, "users", user?.user?.uid)
      const userData = await getDoc(userRef)
      if (userData.exists()) {
        return {...user}
      } else {
        console.log('No user in database')
      }
    } catch (error) {
      console.log('error')
      console.log(error)
      //throw new Error(error)
      throw error
    }
  }

  const logout = () => {
    try {
      return signOut(auth)
    } catch (error) {
      console.log('error - logout')
      console.log(error)
      throw error
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        setUser(null) // on user logout, redirect to login cause is not user anymore
        return
      }
      const userRef = doc(db, "users", currentUser.uid)
      const userData = await getDoc(userRef)
      console.log('userData.data()')
      console.log(userData.data())
      setUser({...currentUser, firedb: userData.data()})
    })
    return () => {
      unsubscribe()
    }
  }, [])

  return <UserContext.Provider value={{user, login, logout}}>
    {children}
  </UserContext.Provider>
}