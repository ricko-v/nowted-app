import React, { useEffect, useState } from 'react'
import Recents from '../molecules/Recents'
import { Link, useLocation, useSearchParams } from 'react-router-dom';

const ListRecents = ({ list }) => {
  const [searchParams] = useSearchParams();
  const [idActive, setIdActive] = useState(null);
  const location = useLocation();

  useEffect(() => {
    if (list.length > 0) {
      setIdActive(searchParams.get("id_note"));
    }
  }, [list]);

  useEffect(() => {
    setIdActive(null);
  }, [location]);

  if (list.length == 0) {
    return (
      <div className='px-3'>
        <p className='text-secondary text-center fw-semibold small'>Your history is empty</p>
      </div>
    )
  }

  return (
    list.map((x, index) => (
      <Link to={`/view/${x.id_dir}?id_note=${x.id}`}>
        <Recents active={index == 0 && x.id == idActive} text={x.title} />
      </Link>
    ))
  )
}

export default ListRecents
