import React from 'react'
import PropTypes from 'prop-types'
import profile from '../../assets/profile-min.png'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import './../../css/fonts.css'

export default function Intro() {
  const colorTheme = useSelector((state) => state.mode.colorTheme)
  // const theme = useSelector((state) => state.mode.darkMode)

  function BounceSpan({ children }) {
    return (
      <motion.span
        whileHover={{ y: -10 }}
        style={{ color: colorTheme.mainHeading }}
        className=""
      >
        {children}
      </motion.span>
    )
  }

  BounceSpan.propTypes = {
    children: PropTypes.node.isRequired,
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3, ease: 'easeInOut' }}
      className="w-full flex flex-col items-center text-center gap-4 lg:gap-8 max-w-[600px]  h-screen"
      style={{ color: colorTheme.primaryText }}
    >
      <span id="intro" className=" h-[4rem]"></span>
      <div className="max-w-[300px] w-full">
        <motion.img
          whileHover={{ scale: 1.15 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          src={profile}
          alt="profile"
          className="w-full rounded-full"
        />
      </div>
      <div className="flex flex-col gap-3 items-center  ">
        <div
          className="text-4xl font-bold font-['Borel']  "
          style={{ fontFamily: 'Raleway,sans-serif' }}
        >
          <BounceSpan>B</BounceSpan>
          <BounceSpan>i</BounceSpan>
          <BounceSpan>j</BounceSpan>
          <BounceSpan>o</BounceSpan>
          <BounceSpan>y</BounceSpan>
          <BounceSpan>{` `}</BounceSpan>
          <BounceSpan>K</BounceSpan>
          <BounceSpan>a</BounceSpan>
          <BounceSpan>r</BounceSpan>
        </div>
        <h3 className="text-2xl">Full Stack Web Developer</h3>
        <p className="text-xl">
          I am a full stack web developer and a computer science student. I love
          to code and learn new technologies. Looking for good opportunities to
          work with a team of developers.
        </p>
      </div>
    </motion.div>
  )
}
