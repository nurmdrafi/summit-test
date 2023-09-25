import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Map, useControl, FullscreenControl, NavigationControl, AttributionControl } from 'react-map-gl'
import { MapboxOverlay, MapboxOverlayProps } from '@deck.gl/mapbox/typed'
import { IconLayer } from '@deck.gl/layers/typed'
import { useAppDispatch } from '../redux/store'
import { MAP } from '../App.config'

// Import Types
import type { MapRef } from "react-map-gl"

// Create DeckGL Overlay
const DeckGLOverlay = (props: MapboxOverlayProps) => {
  const overlay = useControl<MapboxOverlay>(() => new MapboxOverlay(props))
  overlay.setProps(props)
  return null
}

const DeckGLMap: React.FC = () => {
  // States
  const dispatch = useAppDispatch()
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
        // onClick={ () => _onLeftClickOnMap() }
        // onContextMenu={ (e) => _onRightClickOnMap(e) }
        onRender={ (event) => event.target.resize() }
      >
        {/* Full Screen Control */}
        <FullscreenControl position='top-right' />

        {/* DeckGL Overlay */}
        <DeckGLOverlay layers={ [layers] } />

        {/* Navigation Control */}
        <NavigationControl position='bottom-right' />

        {/* Attribute Control */}
        <AttributionControl position='bottom-left' />

        {/* Style Control */}
        {/* <StyleControl /> */}

      </Map>
    </div>
  )
}

export default DeckGLMap
