import { createContext, useContext, useReducer, useEffect } from 'react'
import { authService } from '../services/authService'

const AuthContext = createContext()

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, loading: true, error: null }
    case 'LOGIN_SUCCESS':
      return { 
        ...state, 
        loading: false, 
        isAuthenticated: true, 
        user: action.payload.user,
        token: action.payload.token,
        error: null 
      }
    case 'LOGIN_ERROR':
      return { 
        ...state, 
        loading: false, 
        isAuthenticated: false, 
        user: null,
        token: null,
        error: action.payload 
      }
    case 'LOGOUT':
      return { 
        ...state, 
        isAuthenticated: false, 
        user: null,
        token: null,
        error: null 
      }
    case 'SET_USER':
      return { 
        ...state, 
        user: action.payload,
        isAuthenticated: true 
      }
    case 'CLEAR_ERROR':
      return { ...state, error: null }
    default:
      return state
  }
}

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  loading: false,
  error: null
}

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState)

  // Check for existing token once on mount
  useEffect(() => {
    const token = localStorage.getItem('auth_token')
    if (token) {
      authService.verifyToken()
        .then((userData) => {
          dispatch({ 
            type: 'LOGIN_SUCCESS', 
            payload: { user: userData.user, token } 
          })
        })
        .catch(() => {
          localStorage.removeItem('auth_token')
          dispatch({ type: 'LOGOUT' })
        })
    }
  }, [])

  const login = async (credentials) => {
    dispatch({ type: 'LOGIN_START' })
    try {
      const data = await authService.login(credentials)
      localStorage.setItem('auth_token', data.token)
      dispatch({ 
        type: 'LOGIN_SUCCESS', 
        payload: { user: data.user, token: data.token }
      })
      return data
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Login failed'
      dispatch({ type: 'LOGIN_ERROR', payload: errorMessage })
      throw error
    }
  }

  const logout = () => {
    localStorage.removeItem('auth_token')
    dispatch({ type: 'LOGOUT' })
  }

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' })
  }

  const value = {
    ...state,
    login,
    logout,
    clearError
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export default AuthContext
