import React from 'react'
import { useSelector } from 'react-redux'

export default function SkillsIntro() {
  const colorTheme = useSelector((state) => state.mode.colorTheme)
  return (
    <div
      style={{
        color: colorTheme.primaryText,
      }}
      className="flex flex-col justify-center items-center gap-4 max-w-[600px] w-full"
    >
      <h1 className="text-center text-4xl font-bold">My Skills</h1>

      <p className="text-center text-xl">
        I have worked with a range of technologies in the web development world.
        From Back-end To Frontend.
      </p>
    </div>
  )
}
