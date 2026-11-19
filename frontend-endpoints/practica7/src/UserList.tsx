import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import type { UserDetail, UserSummary } from './types'
import { UserForm } from './UserForm'

interface UserListProps {
  token: string
}

export function UserList({ token }: UserListProps) {
  const [users, setUsers] = useState<UserSummary[]>([])
  const [search, setSearch] = useState('')
  const [onlyAdults, setOnlyAdults] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [deleteError, setDeleteError] = useState<string | null>(null)
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [selectedUser, setSelectedUser] = useState<UserDetail | null>(null)

  async function fetchUsers(url: string) {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(url, {
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

  function loadList(adults: boolean) {
    const endpoint = adults ? '/user_mayores' : '/user'
    fetchUsers(`${import.meta.env.VITE_API_URL}${endpoint}`)
  }

  useEffect(() => {
    loadList(onlyAdults)
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

  function handleSearch(event: FormEvent) {
    event.preventDefault()
    setSelectedId(null)

    const query = search.trim()
    if (query === '') {
      loadList(onlyAdults)
      return
    }

    setOnlyAdults(false)
    fetchUsers(
      `${import.meta.env.VITE_API_URL}/user/search/${encodeURIComponent(query)}`,
    )
  }

  function handleClear() {
    setSearch('')
    setOnlyAdults(false)
    setSelectedId(null)
    loadList(false)
  }

  function handleToggleAdults() {
    const next = !onlyAdults
    setOnlyAdults(next)
    setSearch('')
    setSelectedId(null)
    loadList(next)
  }

  async function handleDelete(user: UserSummary) {
    setDeleteError(null)

    if (!window.confirm(`¿Seguro que querés borrar a ${user.name}?`)) {
      return
    }

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/user/${user.id}`,
      {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      },
    )

    if (!response.ok) {
      const data = await response.json().catch(() => null)
      setDeleteError(data?.detail ?? 'Error al borrar el usuario')
      return
    }

    setUsers(users.filter((u) => u.id !== user.id))
    if (selectedId === user.id) {
      setSelectedId(null)
    }
  }

  function handleUserCreated() {
    setSearch('')
    loadList(onlyAdults)
  }

  return (
    <div>
      <h1>Usuarios</h1>

      <UserForm token={token} onUserCreated={handleUserCreated} />

      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">Buscar</button>
        <button type="button" onClick={handleClear}>
          Limpiar
        </button>
      </form>

      <button type="button" onClick={handleToggleAdults}>
        {onlyAdults ? 'Todos' : 'Solo mayores'}
      </button>

      {deleteError && <p style={{ color: 'crimson' }}>{deleteError}</p>}

      {loading ? (
        <p>Cargando...</p>
      ) : error ? (
        <p style={{ color: 'crimson' }}>{error}</p>
      ) : users.length === 0 ? (
        <p>No se encontraron usuarios</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li
              key={user.id}
              style={{ display: 'flex', gap: '8px', alignItems: 'center' }}
            >
              <button type="button" onClick={() => setSelectedId(user.id)}>
                {user.name}
              </button>
              <button type="button" onClick={() => handleDelete(user)}>
                Borrar
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
