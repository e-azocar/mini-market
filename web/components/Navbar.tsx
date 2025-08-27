import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center py-6 border-b border-gray-200 px-10 bg-gray-900">
      <Link
        href="/"
        className="text-gray-300 hover:text-gray-200 text-xl font-medium"
      >
        Mini-Market
      </Link>

      <ul className="flex space-x-4">
        <li>
          <Link href="/" className="text-gray-300 hover:text-gray-200">
            Home
          </Link>
        </li>
        <li>
          <Link href="/products" className="text-gray-300 hover:text-gray-200">
            Products
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
