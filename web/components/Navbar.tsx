import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center py-6 border-b border-gray-200 px-10 bg-indigo-900">
      <Link
        href="/"
        className="text-gray-300 hover:text-gray-200 text-xl font-medium"
      >
        Mini-Market
      </Link>
    </nav>
  )
}

export default Navbar
