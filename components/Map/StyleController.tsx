import { MapboxStyleSwitcherControl } from 'mapbox-gl-style-switcher'
import { useControl } from 'react-map-gl'
import { MAP } from '../../App.config'

// Import CSS Styles
import 'mapbox-gl-style-switcher/styles.css'

// Import Map Styles Config
const styles = MAP.STYLES

// Options
const options = {
  defaultStyle: 'OSM Liberty',
}

const StyleController = () => {
  useControl<MapboxStyleSwitcherControl>(
    () => new MapboxStyleSwitcherControl(styles, options),
    {
      position: 'bottom-right'
    }
  )

  return null
}

export default StyleController
