import React, { useState } from 'react'
import Star from '../atoms/icons/Star'
import Trash from '../atoms/icons/Trash';
import Archive from '../atoms/icons/Archive';
import { Link, useLocation } from 'react-router-dom';

const ListMore = () => {
  const location = useLocation();

  return (
    <>
      <Link to='/favorite'>
        <div className={`d-flex cursor-pointer align-items-center py-2 ${location.pathname == '/favorite' ? 'bg-soft-dark' : ''}`}>
          <div className="col-2 ps-3 px-0 pb-1">
            <Star active={location.pathname == '/favorite'} />
          </div>
          <div className="col-10 px-0 pe-3">
            <p className={`text-truncate m-0 fw-semibold ${location.pathname == '/favorite' ? 'text-white' : 'text-unactive'}`}>Favorites</p>
          </div>
        </div>
      </Link>

      <Link to='/trash'>
        <div className={`d-flex cursor-pointer align-items-center py-2 ${location.pathname == '/trash' ? 'bg-soft-dark' : ''}`}>
          <div className="col-2 ps-3 px-0 pb-1">
            <Trash active={location.pathname == '/trash'} />
          </div>
          <div className="col-10 px-0 pe-3">
            <p className={`text-truncate m-0 fw-semibold ${location.pathname == '/trash' ? 'text-white' : 'text-unactive'}`}>Trash</p>
          </div>
        </div>
      </Link>


      <Link to='/archive'>
        <div className={`d-flex cursor-pointer align-items-center py-2 ${location.pathname == '/archive' ? 'bg-soft-dark' : ''}`}>
          <div className="col-2 ps-3 px-0 pb-1">
            <Archive active={location.pathname == '/archive'} />
          </div>
          <div className="col-10 px-0 pe-3">
            <p className={`text-truncate m-0 fw-semibold ${location.pathname == '/archive' ? 'text-white' : 'text-unactive'}`}>Archived Notes</p>
          </div>
        </div>
      </Link>
    </>
  )
}

export default ListMore
