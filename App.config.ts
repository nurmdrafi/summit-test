// Local Server
export const BASE_URL = 'http://192.168.68.165:9191/api'

// Staging Server
// export const BASE_URL = process.env.REACT_APP_BASE_URL_STAGING

// Production Server
// export const BASE_URL = process.env.REACT_APP_BASE_URL_PRODUCTION

// Auth Configs
export const AUTH = {
    LOGIN: `${BASE_URL}/auth/login`,
    GET_USER_DETAILS: `${BASE_URL}/auth/me`,
}