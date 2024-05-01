import { getEnvVar } from '~shared/config'

export const API_BASE_URL = getEnvVar('VITE_API_URL')
export const API_AUTH = `${API_BASE_URL}/Auth`
