import React from 'react'
import PropTypes from 'prop-types'
import {
  Card,
  CardContent,
  CardMedia,
  CardActions,
  CardActionArea,
  Button,
} from '@mui/material'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'

ProjectCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  delay: PropTypes.number,
}

ProjectCard.defaultProps = {
  delay: 0,
}

export default function ProjectCard({
  title,
  description,
  image,
  link,
  delay,
}) {
  const colorTheme = useSelector((state) => state.mode.colorTheme)
  const theme = useSelector((state) => state.mode.darkMode)

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: delay }}
      className=""
    >
      <div className="hidden lg:block">
        <Card
          sx={{
            maxWidth: 305,
            boxShadow: `0 0 10px ${theme ? '#000000' : '#dddddd'}`,
            backgroundColor: colorTheme.secondaryBg,
            color: colorTheme.primaryText,
          }}
        >
          <CardActionArea>
            <CardMedia component="img" height="140" image={image} alt={title} />
            <CardContent>
              <h3 className="text-xl font-bold text-start mb-2">{title}</h3>
              <p className="text-start text-md">{description}</p>
            </CardContent>
            <CardActions>
              <Button size="small" href={link}>
                View
              </Button>
            </CardActions>
          </CardActionArea>
        </Card>
      </div>
      <CardActionArea>
        <div
          style={{
            backgroundColor: colorTheme.secondaryBg,
          }}
          className="flex lg:hidden rounded-lg w-full shadow-md"
        >
          <img
            src={image}
            className="max-h-full max-w-[100px] rounded-l-lg "
            alt=""
          />
          <div className="py-2 px-4 relative">
            <h3 className="text-xl font-bold text-start mb-2">{title}</h3>
            <p className="text-start text-md overflow-hidden  h-[50px] ">
              {description}
              <span className="absolute bottom-2 right-[3px]">...</span>
            </p>
          </div>
          <div className="flex items-center">
            <Button size="small" href={link}>
              View
            </Button>
          </div>
        </div>
      </CardActionArea>
    </motion.div>
  )
}
