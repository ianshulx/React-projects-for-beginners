import React from 'react'
import { useSelector } from 'react-redux'

export default function AboutIntro() {
  const colorTheme = useSelector((state) => state.mode.colorTheme)
  return (
    <div
      style={{
        color: colorTheme.primaryText,
      }}
      className="text-center mt-4 max-w-[800px]"
    >
      <h1 className="text-4xl font-bold">Hi, I am Bijoy Kar</h1>
      <div className="mt-2">
        <span className=" hover:text-[#FD8D14] font-bold cursor-pointer">
          Developer
        </span>{' '}
        | {` `}
        <span className=" hover:text-[#FD8D14] font-bold cursor-pointer">
          Student
        </span>{' '}
        | {` `}
        <span className=" hover:text-[#FD8D14] font-bold cursor-pointer">
          Leaner
        </span>{' '}
        | {` `}
        <span className=" hover:text-[#FD8D14] font-bold cursor-pointer">
          Tect Enthusiast
        </span>
      </div>
      <p className="text-xl mt-8">
        Hi there! {`I'm`} a full stack web developer and a CS student who loves
        to create awesome web applications. I am more confident in frontend than
        backend, but I am still learing about databases and backend concepts. As
        a developer I enjoy learning new technologies and solving challenging
        problems. {`I'm`} always looking for opportunities to improve my skills
        and work on exciting projects. You can check out some of my work on
        GitHub or on my personal website. Thanks for stopping by!
      </p>
    </div>
  )
}
