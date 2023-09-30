import React from 'react'

const Star = ({ width, height }) => {
  return (
    <svg width={width ? width : 20} height={height ? height : 20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g opacity="0.6">
        <path d="M10 1.66667L12.575 6.88334L18.3334 7.72501L14.1667 11.7833L15.15 17.5167L10 14.8083L4.85002 17.5167L5.83335 11.7833L1.66669 7.72501L7.42502 6.88334L10 1.66667Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  )
}

export default Star
