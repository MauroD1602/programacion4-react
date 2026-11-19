import { useEffect, useState } from 'react'
import { Login } from './Login'
import type { UserDetail } from './types'
import { UserList } from './UserList'

export default function App() {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem('token'),
  )
  const [currentUser, setCurrentUser] = useState<UserDetail | null>(null)

  function handleLogout() {
    localStorage.removeItem('token')
    setToken(null)
    setCurrentUser(null)
  }

  useEffect(() => {
    if (!token) return

    async function loadMe() {
      const meRes = await fetch(`${import.meta.env.VITE_API_URL}/user/me/id`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!meRes.ok) {
        handleLogout()
        return
      }
      const { id }: { id: number } = await meRes.json()

      const userRes = await fetch(
        `${import.meta.env.VITE_API_URL}/user/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )
      if (!userRes.ok) {
        handleLogout()
        return
      }
      const userData: UserDetail = await userRes.json()
      setCurrentUser(userData)
    }

    loadMe()
  }, [token])

  if (!token) {
    return <Login onLogin={setToken} />
  }

  return (
    <>
      <header>
        <strong>Panel de usuarios</strong>
        <span>Hola, {currentUser ? currentUser.name : '...'}</span>
        <button type="button" onClick={handleLogout}>
          Salir
        </button>
      </header>
      <main>
        <UserList token={token} />
      </main>
    </>
  )
}