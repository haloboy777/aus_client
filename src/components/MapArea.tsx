import mapboxgl from 'mapbox-gl'
import { MAPBOX_TOKEN } from '../config/keys'
import 'mapbox-gl/dist/mapbox-gl.css'
export enum MapStyles {
  LIGHT = 'streets-v11',
  DARK = 'dark-v10',
  SATELLITE = 'satellite-v9',
}
export default class MapArea {
  private map: mapboxgl.Map
  private defaultStyle: string = 'mapbox://styles/mapbox/'

  constructor(divId: string, obj?: mapboxgl.LngLat, zoom?: number) {
    mapboxgl.accessToken = MAPBOX_TOKEN
    let m = document.getElementById(divId)
    if (!m) throw new Error('map div not found! check if div#' + divId + ' exists')
    this.map = new mapboxgl.Map({
      container: divId, // container ID
      style: this.defaultStyle + MapStyles.LIGHT, // style URL
      center: obj, // starting position [lng, lat]
      zoom: zoom || 9, // starting zoom
    })
  }

  public addMarker(location: mapboxgl.LngLat, text: string) {
    let marker = new mapboxgl.Marker({
      color: 'red',
    })
    // console.log(marker.getLngLat())
    return marker.setLngLat(location).setPopup(new mapboxgl.Popup({ offset: 25 }).setText(text)).addTo(this.map)
  }
  public changeStyle(style: MapStyles) {
    this.map.setStyle(this.defaultStyle + style)
  }
}
