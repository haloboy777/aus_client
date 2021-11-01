import React from 'react'
import { styled, alpha } from '@mui/material/styles'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Brightness3 from '@mui/icons-material/Brightness3'
import Brightness7 from '@mui/icons-material/Brightness7'
import SearchIcon from '@mui/icons-material/Search'
import IconButton from '@mui/material/IconButton'
import InputBox from './InputBox'
import { AppBarProps, EmptyObj } from '../data/Interfaces'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))



export default class SearchAppBar extends React.Component<AppBarProps, EmptyObj> {
  constructor(props: any) {
    super(props)
  }

  render() {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
              AUS Movie Map
            </Typography>
            <IconButton size="small" color="inherit" sx={{ mr: 1 }} onClick={() => this.props.changeMode()}>
              {this.props.mode === 'light' ? <Brightness7 /> : <Brightness3 />}
            </IconButton>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <InputBox onOptionClicked={(data) => this.props.onOptionClicked(data)} />
              {/* <StyledInputBase /> */}
            </Search>
          </Toolbar>
        </AppBar>
      </Box>
    )
  }
}
