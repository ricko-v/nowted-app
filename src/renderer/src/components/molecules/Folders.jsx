import React, { useState } from 'react'
import Directory from '../atoms/icons/Directory'
import Trash from '../atoms/icons/Trash'
import { Link } from 'react-router-dom';

const Folders = ({ active, text, clickedTrash }) => {
  const [showT, setShowT] = useState(false);

  return (
    <div onMouseOver={() => setShowT(true)} onMouseLeave={() => setShowT(false)} className={`d-flex cursor-pointer align-items-center py-2 ${active ? 'bg-soft-dark' : ''}`}>
      <div className="col-2 ps-3 px-0 pb-1">
        <Directory active={active} />
      </div>
      <div className="col-8 px-0 pe-3">
        <p className={`text-truncate m-0 fw-semibold ${active ? 'text-white' : 'text-unactive'}`}>{text}</p>
      </div>

      {
        showT &&
        <Link to='#' className='col-2 '>
          <div onClick={clickedTrash} className=" px-0 text-center">
            <Trash />
          </div>
        </Link>
      }
    </div>
  )
}

export default Folders
