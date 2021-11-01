import { PaletteMode } from "@mui/material";
import MapArea from "../components/MapArea";

export interface FilmData {
  title: string
  release_year: number
  location: string
  fun_fact: string
  production_company: string
  distributor: string
  director: string
  writer: string
  actor1: string
  actor2: string
  actor3: string
}

export interface InputBoxState {
  isSearchOpen: boolean
  suggestions: FilmData[]
}
export interface AppState {
  mode: PaletteMode,
  infoBoxOpen: boolean,
  infoBoxData?: FilmData
}
export interface AppBarProps {
  changeMode: () => void
  onOptionClicked: (data: FilmData) => void
  mode: string
}
export interface InfoBoxProps {
  data?: FilmData
  map?: MapArea
}
export interface InputBoxProps {
  onOptionClicked: (data: FilmData) => void
}
export interface EmptyObj { }

