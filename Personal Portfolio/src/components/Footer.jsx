import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { BsLinkedin, BsGithub, BsTwitter } from 'react-icons/bs'

export default function Footer() {
  const colorTheme = useSelector((state) => state.mode.colorTheme)
  const theme = useSelector((state) => state.mode.darkMode)

  return (
    <footer
      className="flex flex-col items-center gap-3 p-4 lg:p-8 lg:pb-4 w-full border-t-[1px] border-t-[#dddddd]"
      style={{
        color: colorTheme.primaryText,
        borderColor: theme ? '#A6A9B6' : '#dddddd',
      }}
    >
      <div className="flex flex-col lg:flex-row items-center gap-5 justify-between w-full">
        <div className="flex flex-col justify-start w-full lg:w-fit ">
          <h1 className="text-2xl font-bold ">Bijoy Kar</h1>
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
          <p className="">Bijoy Kar © Copyright 2023</p>
        </div>
        <div className="flex gap-4 lg:gap-6 font-semibold justify-between w-full lg:w-fit">
          <div className="flex flex-col gap-3">
            <Link to="/about">About</Link>
            <Link to="/skills">Skills</Link>
            <Link to="/projects">Projects</Link>
            <Link to="/contact">Contact</Link>
          </div>
          <div className="flex flex-col gap-3">
            <Link to="/testimonials">Testimonials</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/resume">Resume</Link>
            <Link to="/faq">FAQ</Link>
          </div>
          <div className="flex flex-col gap-3">
            <Link to="/confetti">Confetti</Link>
            <Link to="/resources">Resources</Link>
            <Link to="/github">GitHub</Link>
            <Link to="/copyright">Copyright</Link>
          </div>
        </div>
      </div>
      <hr
        className="w-full"
        style={{ backgroundColor: colorTheme.primaryText, height: '1.5px' }}
      />
      <div className="flex gap-4 justify-center lg:justify-end w-full ">
        <Link className=" " to="https://github.com/iamBijoyKar">
          <BsGithub className="text-2xl inline-block mr-2" />
          GitHub
        </Link>
        <Link to="https://www.linkedin.com/in/iambijoykar/">
          <BsLinkedin className="text-2xl inline-block mr-2" />
          LinkedIn
        </Link>
        <Link to="https://twitter.com/iamBijoyKar">
          <BsTwitter className="text-2xl inline-block  mr-2" />
          Twitter
        </Link>
      </div>
    </footer>
  )
}
