import React from 'react'
import Layout from '../Layouts/Layout'
import BackBtn from '../components/BackBtn'
import Intro from '../components/Projects/Intro'
import Projects from '../components/Projects/Projects'

export default function ProjectsPage() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-srart min-h-screen mt-[4.5rem]">
        <BackBtn />
        <Intro />
        <Projects />
      </div>
    </Layout>
  )
}
