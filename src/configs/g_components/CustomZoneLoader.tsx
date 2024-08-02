import { Box, Skeleton } from '@mui/material'
import React from 'react'

const CustomZoneLoader = () => {
  return (
    <Box className="withoutscroll">
      <Skeleton
        variant={"rectangular"}
        width={"100%"}
        height={"230px"}
      />
    </Box>
  )
}

export default CustomZoneLoader