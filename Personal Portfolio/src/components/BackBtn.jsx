import React, { useCallback } from 'react'
import { Button, Breadcrumbs, Link } from '@mui/material'
import { useNavigate, useLocation } from 'react-router-dom'
import { BsArrowLeft } from 'react-icons/bs'
import { AiFillHome, AiFillProject, AiFillPhone } from 'react-icons/ai'
import { FaGithub, FaLinkedin, FaTwitter, FaBlog } from 'react-icons/fa'
import { BiCodeAlt } from 'react-icons/bi'
import { SlDocs } from 'react-icons/sl'
import { GrResources } from 'react-icons/gr'
import { BsFillPersonVcardFill } from 'react-icons/bs'
import { FcAbout } from 'react-icons/fc'
import { PiConfettiFill } from 'react-icons/pi'
import { useSelector } from 'react-redux'

export default function BackBtn() {
  const navigate = useNavigate()
  const location = useLocation()
  // const theme = useSelector((state) => state.mode.darkMode)
  const colorTheme = useSelector((state) => state.mode.colorTheme)

  const getLocation = useCallback(() => {
    if (location.pathname === '/') {
      return 'Home'
    } else if (location.pathname === '/about') {
      return (
        <>
          <FcAbout className="text-xl mr-2" />
          About
        </>
      )
    } else if (location.pathname === '/skills') {
      return (
        <>
          <BiCodeAlt className="text-xl mr-2" />
          Skills
        </>
      )
    } else if (location.pathname === '/projects') {
      return (
        <>
          <AiFillProject className="text-xl mr-2" />
          Projects
        </>
      )
    } else if (location.pathname === '/testimonials') {
      return (
        <>
          <BsFillPersonVcardFill className="text-xl mr-2" />
          Testimonials
        </>
      )
    } else if (location.pathname === '/blog') {
      return (
        <>
          <FaBlog className="text-xl mr-2" />
          Blog
        </>
      )
    } else if (location.pathname === '/contact') {
      return (
        <>
          <AiFillPhone className="text-xl mr-2" />
          Contact
        </>
      )
    } else if (location.pathname === '/resources') {
      return (
        <>
          <GrResources className="text-xl mr-2" />
          Resources
        </>
      )
    } else if (location.pathname === '/github') {
      return (
        <>
          <FaGithub className="text-xl mr-2" />
          GitHub
        </>
      )
    } else if (location.pathname === '/linkedin') {
      return (
        <>
          <FaLinkedin className="text-xl mr-2" />
          LinkedIn
        </>
      )
    } else if (location.pathname === '/twitter') {
      return (
        <>
          <FaTwitter className="text-xl mr-2" />
          Twitter
        </>
      )
    } else if (location.pathname === '/resume') {
      return (
        <>
          <SlDocs className="text-xl mr-2" />
          Resume
        </>
      )
    } else if (location.pathname === '/confetti') {
      return (
        <>
          <PiConfettiFill className="text-xl mr-2" />
          Confetti
        </>
      )
    }
  }, [location.pathname])

  return (
    <div
      className="flex flex-col justify-start items-start gap-4 w-full mt-4"
      id="back-btn"
    >
      <Breadcrumbs
        sx={{
          color: colorTheme.primaryText,
          borderColor: colorTheme.primaryText,
          border: '1px solid',
          borderRadius: '20px',
          paddingX: '0.8rem',
          paddingY: '0.25rem',
        }}
        aria-label="breadcrumb"
      >
        <Link
          underline="hover"
          className="flex items-center"
          sx={{ cursor: 'pointer', color: colorTheme.primaryText }}
          to="/"
          onClick={() => navigate('/')}
        >
          <AiFillHome className="text-xl mr-2 " />
          Home
        </Link>
        <Link
          underline="none"
          sx={{ cursor: 'pointer', color: colorTheme.primaryText }}
          to=""
          className="flex items-center"
        >
          {getLocation()}
        </Link>
      </Breadcrumbs>
      <Button
        // style={{ color: "#000000" }}
        variant="outlined"
        color="primary"
        onClick={() => navigate(-1)}
      >
        <BsArrowLeft className="text-xl mr-2" />
        Back
      </Button>
    </div>
  )
}
