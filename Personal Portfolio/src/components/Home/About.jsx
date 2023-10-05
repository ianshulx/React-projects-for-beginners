import React, { useEffect } from 'react'
import { useInView, useAnimate } from 'framer-motion'
import { useSelector } from 'react-redux'
import { BiSolidQuoteAltLeft, BiSolidQuoteAltRight } from 'react-icons/bi'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'

export default function About() {
  const colorTheme = useSelector((state) => state.mode.colorTheme)
  const navigate = useNavigate()
  const [aboutRef, animate] = useAnimate()
  const isInView = useInView(aboutRef)

  useEffect(() => {
    if (isInView) {
      //   console.log('in view')
      animate(
        aboutRef.current,
        {
          opacity: 1,
          x: 0,
        },
        {
          delay: 0.2,
          duration: 0.2,
        },
      )
    } else {
      //   console.log('not in view')
      animate(aboutRef.current, { opacity: 0, x: 100 })
    }
  }, [isInView])

  return (
    <div
      className=" w-full h-screen flex flex-col items-center justify-center text-center gap-4 lg:gap-8 max-w-[600px]"
      id="about"
    >
      <div
        ref={aboutRef}
        className=""
        style={{
          fontFamily: 'Borel, sans-serif',
          color: colorTheme.primaryText,
        }}
      >
        <h1 className="text-3xl mb-4 font-bold">About</h1>
        <p className="text-lg">
          Hello! {`I'm`} a full stack web developer and a CS student. I make
          websites and apps with various technologies and frameworks. Check out
          my portfolio for my work samples and contact details. Cheers!
        </p>
        <h3 className="text-2xl font-bold mt-4">My Favourite Quote</h3>
        <div className=" mx-auto max-w-[500px]">
          <p className="text-lg mt-4 ">
            <BiSolidQuoteAltLeft className="inline-block text-2xl relative top-[-.5rem]" />{' '}
            You can never cross the ocean until you have the courage to lose
            sight of the shore.{' '}
            <BiSolidQuoteAltRight className="inline-block text-2xl relative bottom-[.5rem]" />
          </p>
          <p className="text-lg mt-2 text-end">–Christopher Columbus</p>
        </div>
        <div className="w-full flex justify-center mt-8">
          <Button
            onClick={() => navigate('/about')}
            variant="outlined"
            color="primary"
          >
            See more
          </Button>
        </div>
      </div>
    </div>
  )
}
