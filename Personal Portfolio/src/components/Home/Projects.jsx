import React, { useEffect } from 'react'
import { useInView, useAnimate } from 'framer-motion'
import { useSelector } from 'react-redux'
import ProjectCard from './ProjectCard'
import emojiPixel from '../../assets/pixel-emojis.jpg'
import jsonIcon from '../../assets/jsondb.jpg'
import morseIcon from '../../assets/morse-in-one.jpg'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export default function Projects() {
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
          duration: 0.2,
          delay: 0.2,
        },
      )
    } else {
      //   console.log('not in view')
      animate(aboutRef.current, { opacity: 0, x: 100 })
    }
  }, [isInView])

  return (
    <div
      className=" w-full min-h-screen flex flex-col items-center justify-center text-center gap-4 lg:gap-8 "
      id="projects"
    >
      <div
        ref={aboutRef}
        className=""
        style={{
          fontFamily: 'Borel, sans-serif',
          color: colorTheme.primaryText,
        }}
      >
        <h1 className="text-3xl mb-4 font-bold">Projects</h1>
        <div className="flex flex-col items-center justify-center lg:flex-row gap-4">
          <ProjectCard
            title="Emoji Pixel Art"
            description="Emoji Pixel Art is a open source project of pixel arts. It contains emojis in 32x32 canvas made with a free platform called Pixilart."
            image={emojiPixel}
            link="https://github.com/iamBijoyKar/emojis-pixel-art"
            delay={1}
          />
          <ProjectCard
            title="JsonDb"
            description="JsonDb is a open source project of a database cli app, made with json files. It is written in C++."
            image={jsonIcon}
            link="https://github.com/iamBijoyKar/jsondb"
            delay={1.3}
          />
          <ProjectCard
            title="Morse in one "
            description="A npm package that converts morse code to text and vice versa. It is written in JavaScript."
            image={morseIcon}
            link="https://github.com/iamBijoyKar/morse-in-one"
            delay={1.6}
          />
        </div>
        <div className="w-full flex justify-center mt-4">
          <Button
            onClick={() => navigate('projects')}
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
