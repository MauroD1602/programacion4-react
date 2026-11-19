import { useState } from 'react'
import type { FormEvent } from 'react'

interface UserFormProps {
  token: string
  onUserCreated: () => void
  onUnauthorized: () => void
}

export function UserForm({ token, onUserCreated, onUnauthorized }: UserFormProps) {
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [countryId, setCountryId] = useState('1')
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setMessage(null)
    setError(null)

    const response = await fetch(`${import.meta.env.VITE_API_URL}/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        age: Number(age),
        email,
        password,
        country_id: Number(countryId),
      }),
    })

    if (response.status === 401) {
      onUnauthorized()
      return
    }

    const data = await response.json().catch(() => null)

    if (!response.ok) {
      setError(data?.detail ?? 'Error al crear usuario')
      return
    }

    setMessage(data?.msg ?? 'Usuario creado')
    setName('')
    setAge('')
    setEmail('')
    setPassword('')
    setCountryId('1')
    onUserCreated()
  }

  return (
    <section>
      <h2>Nuevo usuario</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Edad"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={4}
          required
        />
        <select
          value={countryId}
          onChange={(e) => setCountryId(e.target.value)}
        >
          <option value="1">Argentina</option>
          <option value="2">Brasil</option>
        </select>
        <button type="submit">Crear</button>
      </form>

      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'crimson' }}>{error}</p>}
    </section>
  )
}
