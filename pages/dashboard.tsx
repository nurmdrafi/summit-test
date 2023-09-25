import { Col, Row } from 'antd'
import React from 'react'
import MapControls from '../components/MapControls'
import DeckGLMap from '../components/DeckGLMap'

const dashboard = () => {
  return (
    <div style={ containerStyles }>
      <Row gutter={ [0, 32] }>
        <Col span={ 6 }>
          <MapControls />
        </Col>
        <Col span={ 18 }>
          <DeckGLMap />
        </Col>
      </Row>
    </div>
  )
}

// Styles
const containerStyles = {

}

export default dashboard
