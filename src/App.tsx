import { Theme } from '@mui/material/styles'
import { PaletteMode } from '@mui/material'
import createTheme from '@mui/material/styles/createTheme'
import ThemeProvider from '@mui/material/styles/ThemeProvider'
import { LngLat } from 'mapbox-gl'
import React from 'react'
import SearchAppBar from './components/AppBar'
import MapArea, { MapStyles } from './components/MapArea'
import InfoBox from './components/InfoBox'
import { AppState, EmptyObj, FilmData } from './data/Interfaces'


class App extends React.Component<EmptyObj, AppState> {
  private map: MapArea | undefined
  constructor(props: any) {
    super(props)

    this.state = {
      mode: 'light',
      infoBoxOpen: false,
      infoBoxData: undefined
    }
  }
  componentDidMount() {
    this.map = new MapArea('map', new LngLat(-122.431297, 37.773972), 9)
    // this.map.addMarker(new LngLat(77.1025, 28.7041))
  }
  onOptionClicked = (data: FilmData) => {
    this.setState({ infoBoxOpen: true, infoBoxData: data })
  }

  changeMode = () => {
    let mode: PaletteMode
    if (this.state.mode === 'light') {
      mode = 'dark'
      this.map?.changeStyle(MapStyles.DARK)
    } else {
      mode = 'light'
      this.map?.changeStyle(MapStyles.LIGHT)
    }
    this.setState({ mode })
  }

  render() {
    const searchBarProps = {
      changeMode: this.changeMode,
      mode: this.state.mode,
      onOptionClicked: this.onOptionClicked
    }
    const theme: Theme = createTheme({
      palette: {
        mode: this.state.mode,
        primary: {
          main: '#2c4d35',
        },
        secondary: {
          main: '#0f73b7',
        },
      },
    })
    return (
      <ThemeProvider theme={theme}>
        {/* App bar */}
        <SearchAppBar {...searchBarProps} />
        <div id="map" style={{ height: '100%', width: '100%' }}></div>
        {/* Drawer  */}
        {/* Main Content */}
        {this.state.infoBoxOpen && <InfoBox data={this.state.infoBoxData} map={this.map} />}
      </ThemeProvider>
    )
  }
}

export default App
