import React from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { CardActionArea } from '@mui/material'

SkillCard.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
}

export default function SkillCard({ children, title }) {
  const colorTheme = useSelector((state) => state.mode.colorTheme)

  return (
    <div className="">
      <CardActionArea
        sx={{
          width: 'fin-content',
        }}
      >
        <div
          className="p-4 w-[108px] h-[110px] rounded flex flex-col items-center justify-start gap-2 relative cursor-pointer shadow-lg"
          style={{ backgroundColor: colorTheme.secondaryBg }}
        >
          {children}
          <span
            style={{ color: colorTheme.primaryText }}
            className="absolute bottom-1 font-bold text-md"
          >
            {title}
          </span>
        </div>
      </CardActionArea>
    </div>
  )
}
