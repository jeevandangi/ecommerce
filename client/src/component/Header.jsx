import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { FaCartArrowDown } from "react-icons/fa";
import { FaSearch, FaSignInAlt } from 'react-icons/fa'
function Header() {
  const [searchClick, setSearchClick] = useState(false)

  const handleSearchClick = () => {
    setSearchClick((prev) => !prev)
  }

  return (
    <>
      <nav className="bg-gray-800 fixed left-0 right-0 top-0 text-white p-4 " style={{ zIndex: 1000 }}>
        <div className="container  flex justify-between items-center">

          <Link to='/' className=" hidden sm:block text-xl font-bold">
            SnapDeal
          </Link>


          <div className="flex items-center   gap-6">
            <div className="rounded-lg px-2 w-full        bg-gray-700 cursor-pointer justify-center  flex items-center   overflow-hidden">
              <input
                type="text"
                placeholder="Search..."
                className={` w-full   h-full outline-none py-2 bg-gray-700 text-white `}
              />
              <FaSearch className=" text-2xl" />
            </div>
            <Link to='/cart' className="text-sm flex items-center justify-center py-2 px-4 bg-blue-600 rounded-md hover:bg-blue-700">
              <FaCartArrowDown className="inline mr-2" />
            </Link>
            <Link to="/login" className="text-sm flex items-center justify-center py-2 px-4 bg-blue-600 rounded-md hover:bg-blue-700">
              <FaSignInAlt className="inline mr-2" /> Login
            </Link>
          </div>

        </div>
      </nav >





    </>
  )
}

export default Header