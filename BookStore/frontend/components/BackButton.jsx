import React from 'react'
import {BsArrowLeft} from 'react-icons/bs'
import {Link} from 'react-router-dom'
const BackButton = ({destination = '..'}) => {
  return (
    <div>
      <div className="flex">
        <Link to={destination}
        className= 'bg-sky-800 text-white rounded-lg w-fit'>
             <BsArrowLeft className='text-2xl'/>
        </Link>
      </div>
    </div>
  )
}

export default BackButton
