import React, { createContext } from 'react'
import Routes from './routes/routes'
// import 'animate.css'

// const colorTheme = {
//   primaryBlue: '#1D5D9B',
//   secondaryBlue: '#75C2F6',
//   primaryYellow: '#F4D160',
//   secondaryYellow: '#FBEEAC',
// }

export const ColorThemeContext = createContext()

function App() {
  return (
    <>
      <Routes />
    </>
  )
}

export default App
