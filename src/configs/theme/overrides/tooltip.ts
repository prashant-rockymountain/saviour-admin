// ** MUI Imports
import { Theme } from '@mui/material/styles'
import { textcolor } from '../palette'

const Tooltip = (theme: Theme) => {
  return {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: `rgba(${theme.palette.mode === 'light' ? textcolor.rgba_light : textcolor.rgba_dark}, 0.9)`,
          color: theme.palette.common[theme.palette.mode === 'light' ? 'white' : 'black']
        },
        arrow: {
          color: `rgba(${theme.palette.mode === 'light' ? textcolor.rgba_light : textcolor.rgba_dark}, 0.9)`
        }
      }
    }
  }
}

export default Tooltip
