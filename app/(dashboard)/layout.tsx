import Sidebar from '@/components/Sidebar';
import React from 'react'

const layout = ({children}: Readonly<{children: React.ReactNode;}>) => {
  return (
    <div className="drawer lg:drawer-open">
  <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
  <div className=" p-8 drawer-content flex flex-col">
    {/* Page content here */}
   {children}
    
    
    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">
      Open drawer
    </label>
  </div>
  <Sidebar/>
</div>
  )
}

export default layout