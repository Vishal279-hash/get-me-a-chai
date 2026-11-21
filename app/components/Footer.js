
import React from 'react'

const Footer = () => {
  const currentYear = 2026

  return (
    <footer className='bg-gray-900 text-white flex items-center justify-center px-3 sm:px-4 min-h-16 py-3'>
      <p className='text-center text-xs sm:text-sm md:text-base'>
        Copyright &copy; {currentYear} Get me A Chai - All rights reserved!
      </p>
    </footer>
  )
}

export default Footer
