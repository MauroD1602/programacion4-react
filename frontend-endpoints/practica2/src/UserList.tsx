import { useEffect, useState } from 'react'
import type { UserDetail, UserSummary } from './types'

interface UserListProps {
  token: string
}

export function UserList({ token }: UserListProps) {
  const [users, setUsers] = useState<UserSummary[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [selectedUser, setSelectedUser] = useState<UserDetail | null>(null)

  useEffect(() => {
    async function loadUsers() {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/user`, {
          headers: { Authorization: `Bearer ${token}` },
        })

        if (!response.ok) {
          const data = await response.json().catch(() => null)
          setError(data?.detail ?? 'Error al cargar los usuarios')
          return
        }

        const data: UserSummary[] = await response.json()
        setUsers(data)
      } catch {
        setError('No se pudo conectar con el servidor')
      } finally {
        setLoading(false)
      }
    }

    loadUsers()
  }, [token])

  useEffect(() => {
    if (selectedId === null) {
      setSelectedUser(null)
      return
    }

    async function loadUserDetail() {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/user/${selectedId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )
      if (!response.ok) return
      const data: UserDetail = await response.json()
      setSelectedUser(data)
    }

    loadUserDetail()
  }, [selectedId, token])

  return (
    <div>
      <h1>Usuarios</h1>

      {loading ? (
        <p>Cargando...</p>
      ) : error ? (
        <p style={{ color: 'crimson' }}>{error}</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <button type="button" onClick={() => setSelectedId(user.id)}>
                {user.name}
              </button>
            </li>
          ))}
        </ul>
      )}

      {selectedUser && (
        <article>
          <h2>{selectedUser.name}</h2>
          <p>Email: {selectedUser.email}</p>
          <p>Edad: {selectedUser.age}</p>
          <p>País: {selectedUser.country?.name ?? 'Sin país'}</p>
          <p>
            Roles:{' '}
            {selectedUser.roles.length > 0
              ? selectedUser.roles.map((r) => r.name).join(', ')
              : 'Sin roles'}
          </p>
        </article>
      )}
    </div>
  )
}