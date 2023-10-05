import React, { useEffect, useMemo } from 'react'
import {
  useAnimate,
  AnimatePresence,
  useMotionValue,
  motion,
} from 'framer-motion'
import { useSelector, useDispatch } from 'react-redux'
import { contactFormActions } from '../../store'
import { confettiActions } from '../../store'
import Card from '@mui/material/Card'
import { CardHeader } from '@mui/material'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import { ButtonGroup } from '@mui/material'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Hired from './Hired'
import SayHi from './SayHi'

export default function ContactForm() {
  const colorTheme = useSelector((state) => state.mode.colorTheme)
  const name = useSelector((state) => state.contactForm.name)
  const email = useSelector((state) => state.contactForm.email)
  const message = useSelector((state) => state.contactForm.message)
  const isHireMeSubmitted = useSelector(
    (state) => state.contactForm.isHireMeSubmitted,
  )
  const isSayHiSubmitted = useSelector(
    (state) => state.contactForm.isSayHiSubmitted,
  )
  const dispatch = useDispatch()

  const [animateOutRef, animateOut] = useAnimate()
  const [animateInRef, animateIn] = useAnimate()

  const y = useMotionValue(-300)

  useEffect(() => {
    if (isHireMeSubmitted || isSayHiSubmitted) {
      animateOut(
        animateOutRef.current,
        { y: 300, opacity: 0 },
        { duration: 0.5, delay: 0.5 },
      )
      setTimeout(() => {
        animateOutRef.current.style.display = 'none'
      }, 1300)
      animateIn(
        animateInRef.current,
        { y: 0, opacity: 1, display: 'block' },
        { duration: 0.5, delay: 1.5 },
      )
    }
  }, [isHireMeSubmitted, isSayHiSubmitted, animateOut])

  const hireMeHandler = () => {
    if (!isFormValid) return
    dispatch(contactFormActions.updateIsHireMeSubmitted(true))
    dispatch(confettiActions.toggle())

    setTimeout(() => {
      dispatch(confettiActions.toggle())
    }, 20000)
  }

  const sayHiHandler = () => {
    if (!isFormValid) return
    dispatch(contactFormActions.updateIsSayHiSubmitted(true))
  }

  const isEmailValid = (email) => {
    if (!email) return true
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }
  const isNameValid = (name) => {
    if (!name) return true
    return /^[a-zA-Z ]+$/.test(name)
  }
  const isMessageValid = (message) => {
    if (message === '') return true
    return message.trim().length > 0
  }

  let nameValid = useMemo(() => {
    return isNameValid(name)
  }, [name])
  let emailValid = useMemo(() => {
    return isEmailValid(email)
  }, [email])
  let messageValid = useMemo(() => {
    return isMessageValid(message)
  }, [message])

  let isFormValid =
    nameValid &&
    emailValid &&
    messageValid &&
    message.trim().length > 0 &&
    email.trim().length > 0 &&
    name.trim().length > 0

  return (
    <>
      <AnimatePresence>
        <motion.div style={{ y }} ref={animateInRef} className="hidden mt-4">
          {isHireMeSubmitted && <Hired />}
          {isSayHiSubmitted && <SayHi />}
        </motion.div>
        <div
          ref={animateOutRef}
          style={{ color: colorTheme.primaryText }}
          className={`max-w-[400px] w-full mt-4 rounded-lg`}
        >
          {/* <h1 className="text-4xl font-bold text-center mb-4">Contact Me</h1> */}
          <div
            style={{
              background: 'url(/images/form-bg2.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
            className="shadow-xl rounded-lg "
          >
            <Card
              variant="outlined"
              className="flex flex-col items-center "
              sx={{
                minWidth: 355,
                backgroundColor: '#ffffff15',
                // border: '1px solid #ffffff55',
              }}
            >
              <CardHeader
                title={
                  <Typography
                    // color={colorTheme.primaryText}
                    variant="h4"
                    component="div"
                    className="font-bold text-center mb-4"
                  >
                    Get in Touch
                  </Typography>
                }
              />

              <CardContent className="w-full">
                <TextField
                  id="fullWidth"
                  label="Name"
                  variant="outlined"
                  type="text"
                  inputMode="text"
                  error={!nameValid}
                  value={name}
                  onChange={(e) =>
                    dispatch(contactFormActions.updateName(e.target.value))
                  }
                  fullWidth
                />
                <TextField
                  id="fullWidth"
                  label="Email"
                  inputMode="email"
                  type="email"
                  variant="outlined"
                  error={!emailValid}
                  sx={{ marginTop: 2 }}
                  fullWidth
                  value={email}
                  onChange={(e) => {
                    dispatch(contactFormActions.updateEmail(e.target.value))
                  }}
                />
                <TextField
                  id="fullWidth"
                  label="Message"
                  variant="outlined"
                  sx={{ marginTop: 2 }}
                  fullWidth
                  multiline
                  rows={4}
                  error={!messageValid}
                  value={message}
                  onChange={(e) => {
                    dispatch(contactFormActions.updateMessage(e.target.value))
                  }}
                />
              </CardContent>
              <CardActions sx={{ display: 'flex', justifyContent: 'end' }}>
                <ButtonGroup>
                  <Button
                    onClick={sayHiHandler}
                    sx={{ textTransform: 'capitalize' }}
                    variant="contained"
                    size=""
                    // disabled={!isFormValid}
                  >
                    Say Hi
                  </Button>
                  <Button
                    onClick={hireMeHandler}
                    sx={{ textTransform: 'capitalize' }}
                    variant="contained"
                    size=""
                    // disabled={!isFormValid}
                  >
                    Hire Me! 🎉
                  </Button>
                </ButtonGroup>
              </CardActions>
            </Card>
          </div>
        </div>
      </AnimatePresence>
    </>
  )
}
