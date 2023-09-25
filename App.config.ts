// Staging Server
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL_STAGING

// Production Server
// export const BASE_URL = process.env.REACT_APP_BASE_URL_PRODUCTION

// Map API Access Token
export const MAP_API_ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAP_API_ACCESS_TOKEN

// Auth Configs
export const AUTH = {
  LOGIN: `${ BASE_URL }/auth/login`,
  GET_USER_DETAILS: `${ BASE_URL }/auth/me`,
}

// Map Configs
export const MAP = {
  ACCESS_TOKEN: MAP_API_ACCESS_TOKEN,
  STYLES: [
    {
      title: 'OSM Liberty',
      uri: `https://map.barikoi.com/styles/osm-liberty/style.json?key=${ MAP_API_ACCESS_TOKEN }`,
    },
    {
      title: 'Bangla Map',
      uri: `https://map.barikoi.com/styles/barikoi-bangla/style.json?key=${ MAP_API_ACCESS_TOKEN }`,
    },
    {
      title: 'One Map',
      uri: `https://map.barikoi.com/styles/OneMap/style.json?key=${ MAP_API_ACCESS_TOKEN }`,
    },
    {
      title: 'Travel Map',
      uri: `https://travel.map.barikoi.com/styles/barikoi/style.json?key=${ MAP_API_ACCESS_TOKEN }`,
    },
    {
      title: 'Dark Map',
      uri: `https://map.barikoi.com/styles/barikoi-dark/style.json?key=${ MAP_API_ACCESS_TOKEN }`,
    },
  ],
}
