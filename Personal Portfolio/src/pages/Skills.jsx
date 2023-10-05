import React from 'react'
import Layout from '../Layouts/Layout'
import BackBtn from '../components/BackBtn'
import SkillsIntro from '../components/Skills/Intro'
import Skills from '../components/Skills/Skills'

export default function SkillsPage() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-start min-h-screen mt-[4.5rem]">
        <BackBtn />
        <SkillsIntro />
        <Skills />
      </div>
    </Layout>
  )
}
