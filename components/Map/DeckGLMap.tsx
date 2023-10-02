import React, { useCallback, useEffect, useRef, useState } from 'react'
import { MapboxOverlay, MapboxOverlayProps } from '@deck.gl/mapbox/typed'
import { IconLayer, TextLayer, PathLayer } from '@deck.gl/layers/typed'
import { load } from '@loaders.gl/core'
import { KMLLoader } from '@loaders.gl/kml'
import { MAP } from '../../App.config'

// Import Antd Components
import { message } from 'antd'

// Import Utility Functions
import { hexToRgb, separatePointsAndLineStrings } from '../../utils'

// Import from Redux
import { useAppDispatch } from '../../redux/store'

// Import Components
import { Map, useControl, FullscreenControl, NavigationControl, AttributionControl } from 'react-map-gl'
import StyleController from './StyleController'

// Import Types
import type { MapRef } from "react-map-gl"

// Import Styles
import 'mapbox-gl/dist/mapbox-gl.css'

// KML File
const kmlFile: any = require('../../data/doc.kml')

// Create DeckGL Overlay
const DeckGLOverlay = (props: MapboxOverlayProps) => {
  const overlay = useControl<MapboxOverlay>(() => new MapboxOverlay(props))
  overlay.setProps(props)
  return null
}

const DeckGLMap: React.FC = () => {
  // States
  const dispatch = useAppDispatch()
  const [kmlData, setkmlData] = useState()
  const [layers, setLayers] = useState<any>([])
  const initialViewState = {
    longitude: 90.3938010872331,
    latitude: 23.821600277500405,
    minZoom: 4,
    maxZoom: 30,
    zoom: 13,
    bearing: 0,
    pitch: 0,
    antialias: true
  }
  const mapRef = useRef<MapRef>(null)
  const map: any = mapRef.current

  // On Create Layers
  const _onCreateLayers = useCallback((points: any, lineStrings: any): void => {
    const newLayers = [
      new PathLayer({
        id: 'path-layer',
        data: lineStrings,
        pickable: true,
        widthMinPixels: 2,
        getPath: (d: any) => d.geometry.coordinates,
        getColor: (d: any) => hexToRgb(d.properties.stroke) as any,
        getWidth: (d: any) => d.properties['stroke-width'],
      }),
      new TextLayer({
        id: 'text-layer',
        data: points,
        pickable: true,
        getSize: 14,
        getAngle: 0,
        getPixelOffset: [0, -35],
        getTextAnchor: 'middle',
        getAlignmentBaseline: 'top',
        getPosition: (d: any) => d.geometry.coordinates,
        getText: (d: any) => d.properties.name,
        getColor: (d: any) => (d.properties['label-color'] ? hexToRgb(d.properties['label-color']) as any : [128, 0, 128]),
      }),
      new IconLayer({
        id: 'icon-layer',
        data: points,
        pickable: true,
        getIcon: (d: any) => ({
          url: d.properties.icon,
          width: 32,
          height: 32
        }),
        getColor: (d: any) => (d.properties['icon-color'] ? hexToRgb(d.properties['icon-color']) as any : [255, 0, 0]),
        getSize: (d: any) => 32,
        getPosition: (d: any) => d.geometry.coordinates,
        // getPixelOffset: (d: any) => d.properties['icon-offset'],
      }),
    ]
    setLayers(newLayers)
  }, [])

  // Remove Layers
  const _onRemoveLayers = (): void => {
    setLayers([])
  }

  useEffect(() => {
    const parseKML = async () => {
      load('/api/fetchData', KMLLoader)
        .then((res) => {
          // console.log(res, 'res')
          setkmlData(res)
        })
        .catch((error: any) => {
          // console.log(error, 'error')
          message.error({ key: 'parse-error', content: error.response?.data?.message ? error.response?.data?.message : 'KML Parsing Error' })
        })
    }

    parseKML()
  }, [])

  // Resize Map
  useEffect(() => {
    if (map && map !== null) {
      map.resize()
    }
  }, [map])

  useEffect(() => {
    if (kmlData) {
      const { points, lineStrings } = separatePointsAndLineStrings(kmlData)
      _onCreateLayers(points, lineStrings)
    }

    return () => {
      _onRemoveLayers()
    }
  }, [_onCreateLayers, kmlData])
  
  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        position: 'absolute',
      }}
    >
      <Map
        ref={ mapRef }
        mapStyle={ MAP.STYLES[0].uri }
        style={{ width: '100%', height: '100%' }}
        initialViewState={ initialViewState }
        doubleClickZoom={ false }
        dragRotate={ true }
        attributionControl={ false }
        // mapLib={}
        // onClick={ () => _onLeftClickOnMap() }
        // onContextMenu={ (e) => _onRightClickOnMap(e) }
        // onRender={ (event) => event.target.resize() }
      >
        {/* DeckGL Overlay */}
        <DeckGLOverlay layers={ layers } />

        {/* Full Screen Control */}
        <FullscreenControl position='top-right' />

        {/* Navigation Control */}
        <NavigationControl position='bottom-right' />

        {/* Attribute Control */}
        <AttributionControl position='bottom-left' />

        {/* Style Control */}
        <StyleController />

      </Map>
    </div>
  )
}

export default DeckGLMap
