import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import Header from '../components/Header'
import Footer from '../components/Footer'

// prop validation for children
Layout.propTypes = {
  children: PropTypes.node.isRequired,
}
// default prop for children
Layout.defaultProps = {
  children: <h1>Empty!</h1> | null,
}

export default function Layout({ children }) {
  const location = useLocation()
  useEffect(() => {
    if (location.pathname !== '/') {
      window.scrollTo(0, 0)
    }
  }, [location.pathname])

  const colorTheme = useSelector((state) => state.mode.colorTheme)

  return (
    <div style={{ backgroundColor: colorTheme.primaryBg }}>
      <Header />
      <main className="container px-3 mx-auto">{children}</main>
      <Footer />
    </div>
  )
}
