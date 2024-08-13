import React from 'react'
import { LampContainer } from './lampContainer'

const Layout = ({ children }) => {
  return (
    <div className='flex flex-col justify-center'>
      <div className="mx-4 md:mx-14 py-4"><img
        src="logo.png"
        alt="Netflix Logo"
        className="w-36 h-auto"
      /></div>
      <LampContainer> {children}</LampContainer>

      {/* <div className="bg-red-600">Footer</div> */}
    </div>
  )
}

export default Layout