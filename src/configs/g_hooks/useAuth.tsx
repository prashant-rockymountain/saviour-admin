import { useContext } from 'react'
import { AuthContext } from '../g_contexts/AuthContext'

export const useAuth = () => useContext(AuthContext)
