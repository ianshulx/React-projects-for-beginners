import React from 'react'
import Layout from '../Layouts/Layout'
import BackBtn from '../components/BackBtn'
import AboutIntro from '../components/About/AboutIntro'
import Hobbies from '../components/About/Hobbies'
import Inspiration from '../components/About/Inspiration'
import Educations from '../components/About/Educations'

export default function AboutPage() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-start min-h-screen mt-[4.5rem]">
        <BackBtn />
        <AboutIntro />
        <Inspiration />
        <Educations />
        <Hobbies />
      </div>
    </Layout>
  )
}
