import { BitmapLayer, GeoJsonLayer } from '@deck.gl/layers/typed'
import { TileLayer } from '@deck.gl/geo-layers/typed'
import axios from 'axios'
import { message } from "antd"

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
        // err.response?.data?.message(few response message are include inside object instead plain text)
        message.error({ key: 'server-error', content: 'Something Went Wrong' })
      }
    } else if (request) {
      message.error({ key: 'network-error', content: 'Network Error' })
    } else {
      message.error({ key: 'uncaught-error', content: 'An Error Occured' })
    }
  }
}

export const renderLayers = (props: any) => {
  const { data } = props
  // console.log(data, 'data')
  const geoJSONlayer = new GeoJsonLayer({
    id: "geojson-layer",
    data,
    pickable: true,
    stroked: true,
    filled: true,
    pointType: "circle",
    getPointRadius: 10,
    getFillColor: [0, 160, 0, 180],
    getLineColor: [0, 0, 0, 255],
    lineWidthMinPixels: 1
  })

  const tileLayer = new TileLayer({
    data: "https://c.tile.openstreetmap.org/{z}/{x}/{y}.png",
    minZoom: 0,
    maxZoom: 19,
    tileSize: 256,

    // eslint-disable-next-line @typescript-eslint/no-shadow
    renderSubLayers: (props: any) => {
      const {
        bbox: { west, south, east, north }
      } = props.tile

      return new BitmapLayer(props, {
        // data: null,
        image: props.data,
        bounds: [west, south, east, north]
      })
    }
  })

  return [tileLayer, geoJSONlayer]
}
