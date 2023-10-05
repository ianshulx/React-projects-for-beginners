import React, { useEffect, useState } from 'react'
import Layout from '../Layouts/Layout'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import errorImg from '../assets/404-error.png'

export default function Page404() {
  const colorTheme = useSelector((state) => state.mode.colorTheme)
  const [count, setCount] = useState(15)
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => prev - 1)
    }, 1000)
    setTimeout(() => {
      window.location.href = '/'
      clearInterval(interval)
    }, 10000)
    return () => clearInterval(interval)
  }, [])

  return (
    <Layout>
      <div
        style={{ color: colorTheme.primaryText }}
        className="flex flex-col items-center justify-start min-h-screen mt-[4.5rem]"
      >
        <div className="flex flex-col justify-center text-center items-center max-w-[600px] w-full h-full">
          <img src={errorImg} alt="404" className=" max-w-[300px] w-full" />
          <h1 className="text-4xl font-bold">Page Not Found</h1>
          <h1 className="text-3xl font-bold mt-4">Http 404 error </h1>
          <p className="text-xl mt-4">
            Go to other valid page otherwise this page will automatically
            redirect to{' '}
            <Link to={'/'} className="font-bold animate-underline">
              Home Page
            </Link>{' '}
            in {count} seconds.
          </p>
        </div>
      </div>
    </Layout>
  )
}
