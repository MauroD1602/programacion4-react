import { useState } from 'react'
import type { FormEvent } from 'react'
import type { LoginResponse } from './types'

interface LoginProps {
  onLogin: (token: string) => void
}

export function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setError(null)

    const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    if (!response.ok) {
      const data = await response.json().catch(() => null)
      setError(data?.detail ?? 'Error al iniciar sesión')
      return
    }

    const data: LoginResponse = await response.json()
    localStorage.setItem('token', data.token)
    onLogin(data.token)
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Ingresar</h1>
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
        required
      />
      <button type="submit">Ingresar</button>
      {error && <p style={{ color: 'crimson' }}>{error}</p>}
    </form>
  )
}