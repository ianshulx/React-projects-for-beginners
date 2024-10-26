import React from 'react'
import { ThemeProvider } from 'next-themes'
import AppLayout from './AppLayout'

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AppLayout />
    </ThemeProvider>
  )
}

export default App