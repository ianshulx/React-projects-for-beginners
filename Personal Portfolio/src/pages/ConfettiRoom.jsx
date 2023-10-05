import React, { useEffect, useState } from 'react'
import Layout from '../Layouts/Layout'
import BackBtn from '../components/BackBtn'
import Confetti from 'react-confetti'
import { useSelector } from 'react-redux'
import { Switch, FormControlLabel } from '@mui/material'

export default function ConfettiRoom() {
  const colorTheme = useSelector((state) => state.mode.colorTheme)
  const [width, setWidth] = useState(window.innerWidth)
  const [height, setHeight] = useState(window.innerHeight)
  const [confetti, setConfetti] = useState(true)

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth)
      setHeight(window.innerHeight)
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <Layout>
      <div
        style={{ color: colorTheme.primaryText }}
        className="flex flex-col items-center justify-start min-h-screen mt-[4.5rem]"
      >
        {confetti && (
          <div className="w-full fixed">
            <Confetti width={width} height={height} />
          </div>
        )}
        <BackBtn />
        <div className="text-center flex flex-col items-center ">
          <h1 className="text-4xl font-bold">Confetti Room</h1>
          <div className="flex flex-col my-4">
            <FormControlLabel
              control={
                <Switch
                  color="secondary"
                  checked={confetti}
                  onChange={() => setConfetti(!confetti)}
                />
              }
              label="Confetti Showers"
            />
          </div>
        </div>
      </div>
    </Layout>
  )
}
