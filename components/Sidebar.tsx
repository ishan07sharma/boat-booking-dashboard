import Link from 'next/link'
import React from 'react'

const Sidebar = () => {
  return (
    <div className="drawer-side">
    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
    <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
      {/* Sidebar content here */}
      <li>Dashboard</li>
      <li><Link href='/bookings'>Manage Bookings</Link></li>
      <li><Link href='/newboat'>Add new boat</Link></li>
      
      

    </ul>
  </div>
  )
}

export default Sidebar