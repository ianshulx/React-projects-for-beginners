"use client"
import LoginButton from '@/components/LoginButton'
import { SignedOut,UserButton } from '@clerk/nextjs'
import { User } from 'lucide-react'

function HeaderProfileBtn() {
  return (
    <div>
      <UserButton>
        <UserButton.MenuItems>
            <UserButton.Link
                label='Profile'
                labelIcon={<User className='size-4'/>}
                href='/profile'
            />
        </UserButton.MenuItems>
      </UserButton>
      <SignedOut>
        <LoginButton/>
      </SignedOut>

    </div>
  )
}

export default HeaderProfileBtn
