import React from 'react'
import Layout from '../Layouts/Layout'
import Intro from '../components/Home/Intro'
import About from '../components/Home/About'
import Projects from '../components/Home/Projects'
import Skills from '../components/Home/Skills'
import SmNav from '../components/Home/SmNav'
import Contact from '../components/Home/Contact'
import Exp from '../components/Home/Exp'

export default function Home() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center ">
        <Intro />
        <About />
        <Skills />
        <Projects />
        <div className="fixed bottom-1 right-1 lg:hidden">
          <SmNav />
        </div>
        <Exp />
        <Contact />
      </div>
    </Layout>
  )
}
