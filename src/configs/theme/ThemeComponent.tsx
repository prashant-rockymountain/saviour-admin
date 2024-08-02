
import { ReactNode } from 'react'
import { deepmerge } from '@mui/utils'
import { Theme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import GlobalStyles from '@mui/material/GlobalStyles'
import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material/styles'
import themeConfig from '../themeConfig'
import overrides from './overrides'
import typography from './typography'
import themeOptions from './ThemeOptions'
import GlobalStyling from './globalStyles'
import Directionx from '../layouts/Direction'
import { Settings } from '../g_types/types'

interface Props {
  settings: Settings
  children: ReactNode
}

const ThemeComponent = (props: Props) => {
  const { settings, children } = props
  const coreThemeConfig = themeOptions(settings)
  let theme = createTheme(coreThemeConfig)
  const mergeComponentOverrides = (theme: Theme, settings: Settings) => deepmerge({ ...overrides(theme, settings) }, undefined)
  const mergeTypography = (theme: Theme) => deepmerge(typography(theme), undefined)
  theme = createTheme(theme, {
    components: { ...mergeComponentOverrides(theme, settings) },
    typography: { ...mergeTypography(theme) }
  })
  if (themeConfig.responsiveFontSizes) {
    theme = responsiveFontSizes(theme)
  }

  return (
    <ThemeProvider theme={theme}>
      <Directionx direction={settings.direction}>
        <CssBaseline />
        <GlobalStyles styles={() => GlobalStyling(theme) as any} />
        {children}
      </Directionx>
    </ThemeProvider>
  )
}

export default ThemeComponent
