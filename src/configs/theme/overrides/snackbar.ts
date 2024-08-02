// ** MUI Imports
import { Theme } from '@mui/material/styles'

// ** Theme Type Import
import { Skin } from '../../g_types/types'
import { textcolor } from '../palette'

const Snackbar = (theme: Theme, skin: Skin) => {
  return {
    MuiSnackbarContent: {
      styleOverrides: {
        root: {
          ...(skin === 'bordered' && { boxShadow: 'none' }),
          backgroundColor: `rgb(${theme.palette.mode === 'light' ? textcolor.rgba_light : textcolor.rgba_dark})`,
          color: theme.palette.common[theme.palette.mode === 'light' ? 'white' : 'black']
        }
      }
    }
  }
}

export default Snackbar
