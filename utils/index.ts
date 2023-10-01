import axios from 'axios'
import { message } from "antd"

// Http Error Handler
export const httpErrorHandler = (err: any) => {
  if (axios.isAxiosError(err)) {
    const response = err?.response
    const request = err?.request

    if (response) {
      const statusCode = response?.status
      if (statusCode === 404) {
        message.error({ key: 'server-error-404', content: 'The requested resource does not exist or has been deleted' })
      } else if (statusCode === 422) {
        message.error({ key: 'network-error-422', content: 'Bad Request' })
      } else if (statusCode === 401) {
        message.error({ key: 'network-error-401', content: 'Please login to access this resource' })
      } else {
        message.error({ key: 'server-error', content: 'Something Went Wrong' })
      }
    } else if (request) {
      message.error({ key: 'network-error', content: 'Network Error' })
    } else {
      message.error({ key: 'uncaught-error', content: 'An Error Occured' })
    }
  }
}

// Seperate Points and LineStrings from Kml Data
export const separatePointsAndLineStrings = (kmlData: any) => {
  const points: any = []
  const lineStrings: any = []

  kmlData.features.forEach((feature: any) => {
    if (feature.geometry.type === 'Point') {
      points.push(feature)
    } else if (feature.geometry.type === 'LineString') {
      lineStrings.push(feature)
    }
  })

  // Find Data
  // kmlData.features.forEach((feature: any) => {
  //   if (feature.properties.name === 'DHTIA53 (DH0705) to DHRMN53 (Hub05)') {
  //     console.log(feature)
  //   }
  // })
  // console.log(lineStrings, 'lineStrings')
  return { points, lineStrings }
}

// Convert HEX to RGB
export const hexToRgb = (hexCode: string) => {
  // Remove the hash if it exists
  const hex = hexCode.replace(/^#/, '')

  // Parse the hexadecimal values for R, G, B
  const bigint = parseInt(hex, 16)
  const r = (bigint >> 16) & 255
  const g = (bigint >> 8) & 255
  const b = bigint & 255

  return [r, g, b]
}
