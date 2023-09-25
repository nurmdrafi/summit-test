import React from 'react'
import { NextPage } from 'next'
import dynamic from 'next/dynamic'

// ImportComponents
import { Col, Row } from 'antd'
import MapControls from '../components/MapControls'

// Import Dynamic Components
const DeckGLMap = dynamic(() => import('../components/Map/DeckGLMap'), { ssr: false })

const dashboard: NextPage = () => {
  return (
    <div style={ containerStyles }>
      <Row gutter={ [0, 32] }>
        <Col span={ 6 }>
          <MapControls />
        </Col>
        <Col span={ 18 }>
          <div style={ mapContainerStyles }>
            <DeckGLMap />
          </div>
        </Col>
      </Row>
    </div>
  )
}

// Styles
const containerStyles = {
  overflow: 'hidden'
}

const mapContainerStyles = {
  height: 'calc(100vh - 65px)',
  minWidth: "100%",
  overflow: 'hidden'
}

export default dashboard
