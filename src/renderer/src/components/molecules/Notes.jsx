import React from 'react'

const Notes = ({ isActive, title, date, contents }) => {

  return (
    <button style={{ background: isActive ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.05)' }} className="btn mb-3 btn-link text-start p-3 text-decoration-none w-100 text-white shadow-none">
      <span className="fw-semibold">{title}</span>

      <div className='row mt-2'>
        <div className='col-4' style={{ color: 'rgba(255, 255, 255, 0.4)' }}>{date}</div>
        <div className='col-8 text-truncate' style={{ color: 'rgba(255, 255, 255, 0.6)' }}>{contents.length > 10 ? contents.slice(0, 50).replace(/<(.|\n)*?>/g, '') : ""}</div>
      </div>
    </button>
  )
}

export default Notes
