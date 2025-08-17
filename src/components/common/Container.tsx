import React from 'react'

const Container = ({children}: any) => {
  return (
    <div className='max-w-[1000px] mx-auto px-4 lg:px-0'>
      {children}
    </div>
  )
}

export default Container;