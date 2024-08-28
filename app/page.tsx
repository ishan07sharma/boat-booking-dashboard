import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <>
   
    
    <div className="hero bg-base-200 min-h-screen">
  <div className="hero-content text-center">
    <div className="max-w-md">
      <h1 className="text-5xl font-bold">Hello there</h1>
      <p className="py-6">
        Use this dashboard to add new boats in the app and see the details of the bookings.
      </p>
      <Link href='/bookings'><button className="btn btn-primary">Get Started</button></Link>
      
    </div>
  </div>
</div>
    </>
  )
}

export default page