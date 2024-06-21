import { getEnvVar } from '~shared/config'

export const API_AUTH_URL = getEnvVar('VITE_AUTH_API_URL')
export const API_COMPANIES_URL = getEnvVar('VITE_COMPANIES_API_URL')
export const API_INTERVIEWS_URL = getEnvVar('VITE_INTERVIEWS_API_URL')
export const API_INTERVIEWS2_URL = getEnvVar('VITE_INTERVIEWS2_API_URL')
export const API_THIRD_COURSE_URL = getEnvVar('VITE_THIRD_COURSE_API_URL')
export const API_CHATS_URL = getEnvVar('VITE_CHATS_API_URL')
export const API_CHATS_SIGNALR_URL = `${API_CHATS_URL}/chatting`
