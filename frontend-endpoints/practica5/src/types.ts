export interface LoginResponse {
  msg: string
  token: string
}

export interface UserSummary {
  id: number
  name: string
}

export interface Country {
  id: number
  name: string
}

export interface RoleSummary {
  id: number
  name: string
}

export interface UserDetail extends UserSummary {
  age: number
  email: string
  country: Country | null
  roles: RoleSummary[]
}