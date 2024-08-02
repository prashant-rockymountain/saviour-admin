import { useContext } from 'react'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { AbilityNames } from 'src/configs/g_constants/allConstants'
import { useAbility } from 'src/configs/g_hooks/useAbility'
import { Button, TextField } from '@mui/material'

const ACLPage = () => {
  const ability = useAbility()
  return (
    <Grid container spacing={6}>
      <Grid item md={6} xs={12}>
        <Card>
          <CardHeader title='Common' />
          <CardContent>
            <Typography sx={{ mb: 4 }}>No ability is required to view this card</Typography>
            <Typography sx={{ color: 'primary.main' }}>This card is visible to 'user' and 'admin' both</Typography>
          </CardContent>
        </Card>
      </Grid>
      {ability?.can('read', 'analytics') ? (
        <Grid item md={6} xs={12}>
          <Card>
            <CardHeader title='Analytics' />
            <CardContent>
              <Typography sx={{ mb: 4 }}>User with 'Analytics' subject's 'Read' ability can view this card</Typography>
              <Typography sx={{ color: 'error.main' }}>This card is visible to 'admin' only</Typography>
            </CardContent>
          </Card>
        </Grid>
      ) : null}
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Grid container spacing={4}>
              <Grid item xs={4}>
                <TextField label="Search" fullWidth size='small' />
              </Grid>
              <Grid item xs={8} sx={{ textAlign: "right" }}>
                <Button variant='contained'>Show page</Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

    </Grid>
  )
}

ACLPage.acl = {
  subject: AbilityNames.ACL_PAGE
}

export default ACLPage
