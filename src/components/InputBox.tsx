import * as React from 'react';
import styled from '@mui/material/styles/styled'
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { InputBoxProps, FilmData, InputBoxState } from '../data/Interfaces';

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

const StyledPaper = styled(Paper)(({ theme }) => ({
  position: 'fixed',
  zIndex: 1400,
  width: 300,
  [theme.breakpoints.up('sm')]: {
    width: '43.5ch',
  }
}))

const Input = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '28ch',
      '&:focus': {
        width: '36ch',
      },
    },
  },
}))

export default class InputBox extends React.Component<InputBoxProps, InputBoxState> {

  constructor(props: any) {
    super(props)
    this.state = {
      isSearchOpen: false,
      suggestions: []
    }
  }

  onFocus = () => {
    // show paper and show suggestion history
    this.setState({ isSearchOpen: true, suggestions: [] })
  }
  onChange = (e: React.BaseSyntheticEvent) => {
    if (e.target.value.length !== 0) {
      this.fetchSuggestion(e.target.value)
    }

  }
  onKeyDown = (ev: React.KeyboardEvent) => {
    if (ev.key === 'Enter') {
      // console.log("Enter Pressed")
    }
  }
  onBlur = async (e: React.BaseSyntheticEvent) => {
    // e.preventDefault()
    await sleep(150)
    this.setState({ isSearchOpen: false })
    // Now remove paper
  }
  suggestionItem = (data: FilmData, i: number) => {
    // console.log(data.title)
    return <ListItem key={i} onClick={() => this.props.onOptionClicked(data)}>
      <ListItemText primary={data.title} secondary={<Typography
        color="text.secondary"
        variant="body2"
        component="p"
      >
        {data.location}<br />
        {data.actor1 + ", " + data.actor2 + ", " + data.actor3}
      </Typography>}></ListItemText>
    </ListItem>
  }


  fetchSuggestion = async (query: string) => {
    let data: FilmData[]
    try {
      let res = await fetch('/api/search?q=' + query)
      data = await res.json() as FilmData[]
      // console.log("RES:", query, data)
      this.setState({ suggestions: data })
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    return (
      <div>
        <Input placeholder="Search Movie, Location, Actor…" inputProps={{
          onFocus: this.onFocus,
          onChange: this.onChange,
          onKeyDown: this.onKeyDown,
          onBlur: this.onBlur,
          // onClick: this.showSuggestionHistory,
          'aria-label': 'search'
        }} />
        {this.state.isSearchOpen && <StyledPaper>
          <List>
            {this.state.suggestions.map(this.suggestionItem)}
          </List>
        </StyledPaper>}
      </div>
    );
  }
}


