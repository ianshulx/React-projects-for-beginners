import React from 'react'
import { useSelector } from 'react-redux'
import { BiSolidQuoteAltLeft, BiSolidQuoteAltRight } from 'react-icons/bi'

export default function Inspiration() {
  const colorTheme = useSelector((state) => state.mode.colorTheme)
  return (
    <div
      className="my-8 max-w-[800px] w-full "
      style={{
        color: colorTheme.primaryText,
      }}
    >
      <h1 className="text-4xl font-bold text-center">Dreams & Inspiration</h1>
      <p className="text-center text-xl mt-8">
        I am very interested in entrepreneurship and startups. I find the idea
        of creating something new and innovative to be very exciting. I believe
        that entrepreneurship is all about taking risks and being willing to
        fail in order to succeed. I also think that startups are a great way to
        create new jobs and help to drive economic growth. I am always looking
        for new opportunities to learn more about entrepreneurship and startups,
        and I hope to one day start my own business.
      </p>
      <div className=" mx-auto max-w-[500px] my-4">
        <p className="text-center text-xl">
          Inspirational quotes can be a great way to motivate yourself and
          others.
        </p>
        <h3 className="text-2xl text-center font-bold mt-4">
          My Favourite Quote
        </h3>
        <p className="text-lg text-center mt-4 ">
          <BiSolidQuoteAltLeft className="inline-block text-2xl relative top-[-.5rem]" />{' '}
          You can never cross the ocean until you have the courage to lose sight
          of the shore.{' '}
          <BiSolidQuoteAltRight className="inline-block text-2xl relative bottom-[.5rem]" />
        </p>
        <p className="text-lg mt-2 text-end">–Christopher Columbus</p>
      </div>
    </div>
  )
}
