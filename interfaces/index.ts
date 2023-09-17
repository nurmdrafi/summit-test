export interface AuthState {
  isAuthenticated: boolean,
  isAuthenticating: boolean,
  token: null | string
  user: object,
}
