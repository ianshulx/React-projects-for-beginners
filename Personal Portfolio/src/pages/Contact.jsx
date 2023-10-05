import React from 'react'
import Layout from '../Layouts/Layout'
import BackBtn from '../components/BackBtn'
import ContactForm from '../components/Contact/ContactForm'

export default function ContactPage() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-start min-h-screen mt-[4.5rem]">
        <BackBtn />
        <ContactForm />
      </div>
    </Layout>
  )
}
