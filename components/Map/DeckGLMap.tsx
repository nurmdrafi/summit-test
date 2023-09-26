import React, { useCallback, useEffect, useRef, useState } from 'react'
import { MapboxOverlay, MapboxOverlayProps } from '@deck.gl/mapbox/typed'
import { IconLayer } from '@deck.gl/layers/typed'
import { load } from '@loaders.gl/core'
import { KMLLoader } from '@loaders.gl/kml'
import { MAP } from '../../App.config'
import { renderLayers } from '../../utils'
import { parseString } from 'xml2js'

// Import from Redux
import { useAppDispatch } from '../../redux/store'

// Import Components
import { Map, useControl, FullscreenControl, NavigationControl, AttributionControl } from 'react-map-gl'
import StyleController from './StyleController'

// Import Types
import type { MapRef } from "react-map-gl"

// Import Styles
import 'mapbox-gl/dist/mapbox-gl.css'

const kmlFile: any = require('../../data/doc.kml')
// const fileLoader: any = require('file-loader')

// Create DeckGL Overlay
const DeckGLOverlay = (props: MapboxOverlayProps) => {
  const overlay = useControl<MapboxOverlay>(() => new MapboxOverlay(props))
  overlay.setProps(props)
  return null
}

const DeckGLMap: React.FC = () => {
  // States
  const dispatch = useAppDispatch()
  // const [kmlData, setkmlData] = useState()
  const [markerData, setMarkerData] = useState<any>([])
  const [selectedItem, setSelectedItem] = useState(null)
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

  // Get Icon URL
  const _onGetIconUrl = (type: string) => {
    let t = 'default'
    if (type?.includes(',')) {
      const text = type.split(',')
      t = text[0]?.toLowerCase().trim()
      return `/icons/pTypes/${ t }.png`
    } if (type === 'Religious Place') {
      return `/icons/pTypes/religious+place.png`
    }
  
    t = type?.toLowerCase()
    return `/icons/pTypes/${ t }.png`
  }

  const _onSingleClickOnMarker = useCallback((info: any): void => {
    // Set Selected Item Id
    // dispatch(setSelectedItem(info?.object?.id))
    if (info?.object?.place_code) {
      // dispatch(getPlaceDataByPlaceCode(info?.object?.place_code))
    }
    // dispatch(setPopupInfo({ coordinate: info?.coordinate, object: info?.object }))
    // dispatch(setCenterPoint(info?.coordinate))
    // dispatch(setZoomLevel(18))
    // setIsClickRight(false)
  }, [])

  // On Double Click on Marker
  const _onDoubleClickOnMarker = useCallback((): void => {
    // dispatch(setPopupInfo(null))
    // dispatch(setPlaceDetails(null))
    // setIsClickRight(false)
  }, [])

  // On Marker Click
  const _onMarkerClick = useCallback((info: any, e: any): void => {
    const tapCount: any = e?.tapCount ?? 0
    if (tapCount === 2) {
      _onDoubleClickOnMarker()
    } else if (tapCount === 1) {
      _onSingleClickOnMarker(info)
    }
  }, [_onDoubleClickOnMarker, _onSingleClickOnMarker])

  // On Create Layers
  const _onCreateLayers = useCallback((): void => {
    // default rgba = [228, 253, 242, 100]
    const newLayers = [
      new IconLayer({
        id: 'icon-layer',
        data: markerData,
        pickable: true,
        getPosition: (d: any) => (d ? [+d.longitude, +d.latitude] : [90.3938010872331, 23.821600277500405]),
        sizeScale: 6.5,
        getSize: (d: any) => 4,        
        getIcon: (d: any) => (
          {
            url: d.id === selectedItem 
              ? _onGetIconUrl('default') : _onGetIconUrl(d?.type),
            width: d.id === selectedItem ? 256 : 16.5,
            height: d.id === selectedItem ? 256 : 22,
          }),
        updateTriggers: {
          getIcon: selectedItem,
          getSize: selectedItem,
        },
        onClick: (info, event) => _onMarkerClick(info, event)
      }),
    ]
    setLayers(newLayers)
  }, [_onMarkerClick, markerData, selectedItem])

  // Remove Layers
  const _onRemoveLayers = (): void => {
    setLayers([])
  }

  // On Change `markerData` & `geoJsonData` => Remove Layers & Popup Info
  useEffect(() => {
    _onCreateLayers()
  
    return () => {
      _onRemoveLayers()
      // dispatch(setPopupInfo(null))
    }
  }, [markerData, _onCreateLayers, dispatch])

  useEffect(() => {
    const parseKML = async () => {
      try {
        const response = await fetch('/data/doc.kml')
        const kmlData = await response.text()

        // Parse KML to JSON
        parseString(kmlData, (err, result) => {
          if (err) {
            // console.error('Error parsing KML:', err)
          } else {
            console.log(result)
            // console.log('Parsed KML:', JSON.stringify(result, null, 2))
            // Handle the parsed JSON data as needed
          }
        })
      } catch (error) {
        console.error('Error fetching or parsing KML:', error)
      }
    }

    parseKML()
  }, [])

  // Resize Map
  useEffect(() => {
    if (map && map !== null) {
      map.resize()
    }
  }, [map])

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
        {/* <DeckGLOverlay layers={ renderLayers({ kmlData }) } /> */}

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
