"use client"
import { ClerkProvider, useAuth } from '@clerk/nextjs'
import { ConvexReactClient } from 'convex/react'
import { ConvexProviderWithClerk } from 'convex/react-clerk'
import React from 'react'


const convex= new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!)
//Creates a Convex database client using your Convex deployment URL


const ConvexClientProvider = ({children}:{children:React.ReactNode}) => {
  return (
    //Authentication Layer: ClerkProvider wraps your app with Clerk authentication
    // Database Integration: ConvexProviderWithClerk connects Convex database with Clerk auth
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}>
        <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
            {children}
        </ConvexProviderWithClerk>

    </ClerkProvider>
  )
}

export default ConvexClientProvider