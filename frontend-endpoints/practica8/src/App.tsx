import { useEffect, useState } from 'react'
import { Login } from './Login'
import type { UserDetail } from './types'
import { UserList } from './UserList'

export default function App() {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem('token'),
  )
  const [currentUser, setCurrentUser] = useState<UserDetail | null>(null)
  const [sessionMessage, setSessionMessage] = useState<string | null>(null)

  function handleLogout() {
    localStorage.removeItem('token')
    setToken(null)
    setCurrentUser(null)
  }

  function handleUnauthorized() {
    handleLogout()
    setSessionMessage('Tu sesión venció')
  }

  function handleLogin(newToken: string) {
    setSessionMessage(null)
    setToken(newToken)
  }

  useEffect(() => {
    if (!token) return

    async function loadMe() {
      const meRes = await fetch(`${import.meta.env.VITE_API_URL}/user/me/id`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (meRes.status === 401) {
        handleUnauthorized()
        return
      }
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
      if (userRes.status === 401) {
        handleUnauthorized()
        return
      }
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
    return <Login onLogin={handleLogin} sessionMessage={sessionMessage} />
  }

  const rolesText =
    currentUser && currentUser.roles.length > 0
      ? currentUser.roles.map((r) => r.name).join(', ')
      : 'Sin roles'

  return (
    <>
      <header>
        <strong>Panel de usuarios</strong>
        <span>
          Hola, {currentUser ? `${currentUser.name} (${rolesText})` : '...'}
        </span>
        <button type="button" onClick={handleLogout}>
          Salir
        </button>
      </header>
      <main>
        <UserList token={token} onUnauthorized={handleUnauthorized} />
      </main>
    </>
  )
}
