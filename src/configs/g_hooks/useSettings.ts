import { useContext } from 'react'
import { SettingsContext } from '../g_contexts/settingsContext'
import { SettingsContextValue } from '../g_types/types'

export const useSettings = (): SettingsContextValue => useContext(SettingsContext)
