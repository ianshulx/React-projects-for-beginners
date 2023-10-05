import React from 'react'
import ImageListItem from '@mui/material/ImageListItem'
import ImageListItemBar from '@mui/material/ImageListItemBar'
import PropType from 'prop-types'

HobbiyCard.propTypes = {
  image: PropType.string.isRequired,
  title: PropType.string.isRequired,
  description: PropType.string,
  cols: PropType.number,
}

HobbiyCard.defaultProps = {
  cols: 1,
}

export default function HobbiyCard({ image, title, cols }) {
  return (
    <ImageListItem className="cursor-pointer" cols={cols}>
      <img src={image} alt="hobby" loading="lazy" />
      <ImageListItemBar title={title} />
    </ImageListItem>
  )
}
