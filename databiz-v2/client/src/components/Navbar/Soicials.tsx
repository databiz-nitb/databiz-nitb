import React from 'react'
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";

function Soicials() {
  return (
    <div className='bg-[#8c88f0]'>
      <div className="flex justify-end items-center px-6 py-2 space-x-4">
              <a href="#" className="text-black hover:text-gray-700">
                <FaFacebookF size={18} />
              </a>
              <a href="#" className="text-black hover:text-gray-700">
                <FaInstagram size={18} />
              </a>
              <a href="#" className="text-black hover:text-gray-700">
                <FaLinkedinIn size={18} />
              </a>
              <a href="#" className="text-black hover:text-gray-700">
                <FaTwitter size={18} />
              </a>
        </div>
    </div>
  )
}

export default Soicials
