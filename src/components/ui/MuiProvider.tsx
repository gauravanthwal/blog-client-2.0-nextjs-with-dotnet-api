// import { ThemeProvider } from '@mui/material'
import React from 'react'

const MuiProvider = ({children}: any) => {
  return (
    // <ThemeProvider theme={{}}>
    <>
      {children}
    </>
    // </ThemeProvider>
  )
}

export default MuiProvider
