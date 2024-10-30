import React, { useState } from 'react'
import { CardHeader, Typography, Card } from '@mui/material'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import ButtonGroup from '@mui/material/ButtonGroup'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import successGif from '../../assets/success-gif.gif'
import profileLink from '../../assets/linkedin-profile-link.svg'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

export default function SayHi() {
  const colorTheme = useSelector((state) => state.mode.colorTheme)
  const [isLinkedInClicked, setIsLinkedInClicked] = useState(false)
  const navigate = useNavigate()

  return (
    <div
      style={{
        color: colorTheme.primaryText,
      }}
      className="text-center max-w-[400px] w-full mx-auto"
    >
      <Card>
        <CardHeader
          title={
            <Typography variant="h5">Thank you for Contacting Me!</Typography>
          }
          subheader="I will get back to you as soon as possible."
        />
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {isLinkedInClicked ? (
            <div className="">
              <img src={profileLink} className="max-w-[150px] w-full" alt="" />
              <Typography variant="p">
                <Link
                  to="https://www.linkedin.com/in/iambijoykar/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 font-bold"
                >
                  or follow this link
                </Link>
              </Typography>
            </div>
          ) : (
            <img
              className="max-w-[150px] w-full"
              src={successGif}
              alt="success"
            />
          )}
          <br />
          <Alert severity="warning" className="w-full text-start">
            <AlertTitle>Recommended Step!</AlertTitle>
            <Typography variant="p">
              Please contact me through my LinkedIn profile as well.
            </Typography>
          </Alert>
          <CardActions>
            <ButtonGroup
              variant="contained"
              ariant="contained"
              aria-label="outlined primary button group"
            >
              <Button
                onClick={() => setIsLinkedInClicked(true)}
                sx={{ textTransform: 'capitalize' }}
                variant="contained"
              >
                Contact me on LinkedIn
              </Button>
              <Button
                onClick={() => navigate('/')}
                sx={{ textTransform: 'capitalize' }}
                variant="contained"
              >
                Skip
              </Button>
            </ButtonGroup>
            {/* <Typography variant="h6">I will get back to you soon!</Typography> */}
          </CardActions>
        </CardContent>
      </Card>
    </div>
  )
}
