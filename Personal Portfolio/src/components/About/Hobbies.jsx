import React from 'react'
import ImageList from '@mui/material/ImageList'

import HobbiyCard from './HobbyCard'
import { useSelector } from 'react-redux'

export default function Hobbies() {
  const colorTheme = useSelector((state) => state.mode.colorTheme)

  return (
    <div
      style={{ color: colorTheme.primaryText }}
      className="text-center my-8 max-w-[1000px] "
    >
      <h1 className="text-4xl font-bold mb-8">My Hobbies</h1>
      <div className="grid grid-flow-row grid-cols-1 lg:grid-cols-2 gap-5 ">
        <div className="">
          <p className="text-xl lg:text-start ">
            I have a few hobbies that I enjoy doing in my free time. One of my
            favorite hobbies is playing football. I love the feeling of being on
            the field and working together with my teammates to achieve a common
            goal. Another hobby that I enjoy is listening to music. I find that
            music can be very relaxing and it helps me to unwind after a long
            day. Finally, I also enjoy swimming. It’s a great way to stay active
            and healthy while also having fun. These are just a few of the
            hobbies that I enjoy doing in my free time.
          </p>
        </div>
        <ImageList>
          <HobbiyCard
            title="Playing Football"
            description="I love playing football"
            image="/images/playing-football.jpg"
          />
          <HobbiyCard
            title="Listening Music"
            description="I love playing football"
            image="/images/headphones.jpg"
          />
          <HobbiyCard
            cols={2}
            title="Swimming"
            description="I love playing football"
            image="/images/swimming.jpg"
          />
        </ImageList>
      </div>
    </div>
  )
}
