import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import handShake from '../../assets/handshake-v.mp4'
import { confettiActions } from '../../store'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'

export default function HireMe() {
  const colorTheme = useSelector((state) => state.mode.colorTheme)
  const isHireMeSubmitted = useSelector(
    (state) => state.contactForm.isHireMeSubmitted,
  )
  const dispatch = useDispatch()
  const [handShakeVisible, setHandShakeVisible] = React.useState(false)
  const videoRef = React.useRef(null)
  const navigate = useNavigate()

  const handleClick = () => {
    setHandShakeVisible(true)
    setTimeout(() => {
      setHandShakeVisible(false)
    }, 2500)
    setTimeout(() => {
      //   window.open('mailto:bijoykar54321@gmail.com')
      navigate('/contact')
      dispatch(confettiActions.toggle())
    }, 3000)
    setTimeout(() => {
      dispatch(confettiActions.toggle())
    }, 15000)
  }

  return (
    <div
      className={` flex flex-col justify-center items-center gap-5 ${
        isHireMeSubmitted && 'hidden'
      } `}
    >
      <Button
        onClick={handleClick}
        sx={{
          color: colorTheme.primaryText,
          backgroundColor: colorTheme.primaryText + '1A',
          padding: '1rem 2rem',
          border: '1px solid ' + colorTheme.primaryText,
        }}
        size="large"
        className=" rounded-lg "
      >
        <h1 className="text-xl">Hire Me</h1>
      </Button>
      {handShakeVisible && (
        <div className="max-w-[400px] w-full">
          <video autoPlay ref={videoRef} src={handShake}></video>
        </div>
      )}
    </div>
  )
}
