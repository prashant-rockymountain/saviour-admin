// ** MUI Imports
import { Theme } from '@mui/material/styles'

// ** Hook Import
import { useSettings } from '../../g_hooks/useSettings'
import { textcolor } from '../palette'

const Accordion = (theme: Theme) => {
  // Hook & Var
  const { settings } = useSettings()
  const { skin } = settings

  return {
    MuiAccordion: {
      styleOverrides: {
        root: {
          margin: theme.spacing(2, 0),
          '&:before': { display: 'none' },
          borderRadius: theme.shape.borderRadius,
          transition: 'box-shadow .35s ease, margin .35s ease',
          boxShadow: theme.shadows[skin === 'bordered' ? 0 : 1],
          ...(skin === 'bordered' && { border: `1px solid ${theme.palette.divider}` }),
          '&.Mui-disabled': {
            backgroundColor:  theme.palette.mode === 'dark' ? `rgba(${textcolor.rgba_dark}, 0.12)` : `rgba(${textcolor.rgba_light}, 0.12)`
          },
          '&.Mui-expanded': {
            margin: theme.spacing(2, 0),
            boxShadow: theme.shadows[skin === 'bordered' ? 0 : 6]
          },
          '& .MuiCollapse-root': {
            minHeight: 'unset !important',
            transition: 'height .35s ease !important',
            '&.MuiCollapse-entered': {
              height: 'auto !important'
            }
          }
        }
      }
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          borderRadius: 'inherit',
          padding: `0 ${theme.spacing(4.5)}`,
          '& + .MuiCollapse-root': {
            '& .MuiAccordionDetails-root:first-of-type': {
              paddingTop: 0
            }
          },
          '&.Mui-expanded': {
            minHeight: 'unset',
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            '& .MuiAccordionSummary-content': {
              margin: theme.spacing(3, 0)
            }
          },
          '& .MuiTypography-root': {
            fontWeight: 500
          }
        },
        content: {
          margin: theme.spacing(3, 0)
        },
        expandIconWrapper: {
          color: theme.palette.text.primary
        }
      }
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          padding: theme.spacing(4.5),
          '& + .MuiAccordionDetails-root': {
            paddingTop: 0
          }
        }
      }
    }
  }
}

export default Accordion
