
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import styled from '@mui/material/styles/styled'
import { LngLat, Marker } from 'mapbox-gl'
import React from 'react'
import { MAPBOX_TOKEN } from '../config/keys'
import { EmptyObj, InfoBoxProps } from '../data/Interfaces'

const StyledPaper = styled(Paper)(({ theme }) => ({
  width: 314,
  height: 'auto',
  padding: 20,
  position: 'fixed',
  right: 10,
  top: 'inherit',
  bottom: 10,
  transition: 'transform 0.5s, opacity 0.5s',
  [theme.breakpoints.up('sm')]: {
    width: 360,
    top: 74,
    bottom: 'inherit'
  }
}))

class InfoBox extends React.Component<InfoBoxProps, EmptyObj> {
  private markers: (Marker | undefined)[]
  constructor(props: any) {
    super(props)
    this.markers = []
  }

  async getDataOnUpdate() {
    this.removeMarkers()
    // get corresponding movie locations and map them onto map
    let locations = await this.getFilmLocations(this.props.data?.title)
    let coordinates = await Promise.all(locations.map(el => this.getCoordinatesForLoc(el)))
    let namedCoordinates = locations.map((el, i) => { return { text: el, coordinates: coordinates[i] } })
    // console.log(namedCoordinates)
    this.markers = namedCoordinates.filter(el => el.coordinates.length > 0).map(el => this.addMarkers(el))
  }

  addMarkers(el: { text: string, coordinates: number[] }) {
    return this.props.map?.addMarker(new LngLat(el.coordinates[0], el.coordinates[1]), el.text)
  }

  removeMarkers() {
    this.markers.forEach(marker => marker && marker.remove())
  }
  async componentDidMount() {
    await this.getDataOnUpdate()
  }
  async componentDidUpdate() {
    await this.getDataOnUpdate()
  }

  getFilmLocations = async (film: string | undefined) => {
    if (!film) return []
    let r = await fetch('/api/getFilmLocations?film=' + film)
    let filmLocations: { location: string }[] = await r.json()
    return filmLocations.map(el => el.location)
  }

  getCoordinatesForLoc = async (loc: string) => {
    // console.log("LOC: ", loc.location)
    let r = await fetch('https://api.mapbox.com/geocoding/v5/mapbox.places/' + loc + '.json?bbox=-122.56373153395461%2C37.59355295186727%2C-122.34817039626597%2C37.828163031434954&limit=1&fuzzyMatch=true&access_token=' + MAPBOX_TOKEN)
    let data = await r.json()
    return data.features[0]?.center || []
  }

  render() {
    const { data } = this.props
    const actors = [data?.actor1, data?.actor2, data?.actor3]
    return (
      <StyledPaper className="mainPaper">
        <div>
          <Typography variant="h4">
            {data?.title}
          </Typography>
          <br />
          {actors.length > 0 && <Typography variant="body1" component="p">
            Actors: {actors.join(", ")}
          </Typography>}
          {data?.writer && <Typography variant="caption" component="p">
            Writer: {data?.writer}
          </Typography>}
          {data?.director && <Typography variant="caption" component="p">
            Director: {data?.director}
          </Typography>}
          {data?.production_company && <Typography variant="caption" component="p">
            Production Company: {data?.production_company}
          </Typography>}
          {data?.distributor && <Typography variant="caption" component="p">
            Distributor: {data?.distributor}
          </Typography>}
          {data?.fun_fact && <>
            <br />
            <Typography variant="h5">Fun Fact</Typography>
            <Typography variant="body2">{data?.fun_fact}</Typography></>}

          {data?.location && <>
            <br />
            <Typography variant="h5">Location</Typography>
            <Typography variant="body2">{data?.location}</Typography></>}

        </div>
      </StyledPaper>
    )
  }
}

export default InfoBox
