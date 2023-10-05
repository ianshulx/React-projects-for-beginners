import React, { useEffect } from 'react'
import { useInView, useAnimate, motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import reactIcon from '../../assets/react.svg'
import reduxIcon from '../../assets/icons8-redux.svg'
import cIcon from '../../assets/icons8-c.svg'
import htmlIcon from '../../assets/icons8-html.svg'
import cssIcon from '../../assets/icons8-css.svg'
import jsIcon from '../../assets/js_logo.svg'
import nodeIcon from '../../assets/icons8-nodejs.svg'
import gitIcon from '../../assets/icons8-git.svg'
import tailwindIcon from '../../assets/tailwindcss.svg'
import flaskIcon from '../../assets/icons8-flask.svg'
import pythonIcon from '../../assets/icons8-python.svg'
import astroIconLight from '../../assets/astro-icon-light.svg'
import astroIconDark from '../../assets/astro-icon-dark.svg'
import SkillCard from './SkillCard'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export default function Skills() {
  const colorTheme = useSelector((state) => state.mode.colorTheme)
  const isDark = useSelector((state) => state.mode.darkMode)
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
          duration: 0.2,
          delay: 0.2,
        },
      )
    } else {
      //   console.log('not in view')
      animate(aboutRef.current, { opacity: 0, x: -100 })
    }
  }, [isInView])

  return (
    <div
      className=" w-full h-screen flex flex-col items-center justify-center text-center gap-4 lg:gap-8 max-w-[600px]"
      id="skills"
    >
      <div
        ref={aboutRef}
        className=""
        style={{
          fontFamily: 'Borel, sans-serif',
          color: colorTheme.primaryText,
        }}
      >
        <h1 className="text-3xl mb-4 font-bold">Skills</h1>
        <div className="flex flex-wrap gap-3 justify-center">
          <SkillCard title={`React`}>
            <motion.img
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              src={reactIcon}
              width={'60px'}
              className="group"
              style={{ filter: 'drop-shadow(0px 0px 10px #5BC0F8f5)' }}
              alt=""
            />
          </SkillCard>

          <SkillCard title={`HTML`}>
            <motion.img
              whileHover={{ scale: 1.2 }}
              src={htmlIcon}
              width={'60px'}
              style={{ filter: 'drop-shadow(0px 0px 10px #FD8D14A5)' }}
              alt=""
            />
          </SkillCard>

          <SkillCard title={`CSS`}>
            <motion.img
              whileHover={{ scale: 1.2 }}
              src={cssIcon}
              width={'60px'}
              style={{ filter: 'drop-shadow(0px 0px 10px #2CD3E1A5)' }}
              alt=""
            />
          </SkillCard>

          <SkillCard title={`JavaScript`}>
            <motion.img
              whileHover={{ scale: 1.2 }}
              src={jsIcon}
              width={'50px'}
              style={{ filter: 'drop-shadow(0px 0px 10px #F0DE36A5)' }}
              alt=""
            />
          </SkillCard>

          <SkillCard title={`Tailwindcss`}>
            <motion.img
              whileHover={{ scale: 1.2 }}
              src={tailwindIcon}
              width={'60px'}
              style={{ filter: 'drop-shadow(0px 0px 10px #75C2F6A5)' }}
              alt=""
            />
          </SkillCard>

          <SkillCard title={`Python`}>
            <motion.img
              whileHover={{ scale: 1.2 }}
              src={pythonIcon}
              style={{ filter: 'drop-shadow(0px 0px 10px #F0DE36A5)' }}
              width={'60px'}
              alt=""
            />
          </SkillCard>

          <SkillCard title={`Git`}>
            <motion.img
              whileHover={{ scale: 1.2 }}
              src={gitIcon}
              width={'70px'}
              style={{ filter: 'drop-shadow(0px 0px 10px #FD8D14A5)' }}
              alt=""
            />
          </SkillCard>

          <SkillCard title={`NodeJs`}>
            <motion.img
              whileHover={{ scale: 1.2 }}
              src={nodeIcon}
              width={'60px'}
              style={{ filter: 'drop-shadow(0px 0px 10px #03C988A5)' }}
              alt=""
            />
          </SkillCard>

          <SkillCard title={`Redux`}>
            <motion.img
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              src={reduxIcon}
              style={{ filter: 'drop-shadow(0px 0px 10px #6F61C0A5)' }}
              width={'60px'}
              alt=""
            />
          </SkillCard>

          <SkillCard title={`C++`}>
            <motion.img
              whileHover={{ scale: 1.2 }}
              src={cIcon}
              width={'60px'}
              style={{ filter: 'drop-shadow(0px 0px 10px #2CD3E1A5)' }}
              alt=""
            />
          </SkillCard>

          <SkillCard title={`Flask`}>
            <motion.img
              whileHover={{ scale: 1.2 }}
              src={flaskIcon}
              width={'70px'}
              style={{ filter: 'drop-shadow(0px 0px 10px #000000A5)' }}
              alt=""
            />
          </SkillCard>

          <SkillCard title={`Astro`}>
            <motion.img
              whileHover={{ scale: 1.2 }}
              src={isDark ? astroIconLight : astroIconDark}
              style={{
                filter: `drop-shadow(0px 0px 10px ${
                  isDark ? '#ffffff55' : '#00000055'
                })`,
              }}
              width={'45px'}
              alt=""
            />
          </SkillCard>
        </div>
        <div className="w-full flex justify-center mt-4">
          <Button
            onClick={() => navigate('/skills')}
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
