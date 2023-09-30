import React from 'react'
import File from '../atoms/icons/File'

const Recents = ({ active, text }) => {
  return (
    <div className={`d-flex cursor-pointer align-items-center py-2 ${active ? 'bg-active' : ''}`}>
      <div className="col-2 ps-3 px-0 pb-1">
        <File active={active} />
      </div>
      <div className="col-10 px-0 pe-3">
        <p className={`text-truncate m-0 fw-semibold ${active ? 'text-white' : 'text-unactive'}`}>{text}</p>
      </div>
    </div>
  )
}

export default Recents
