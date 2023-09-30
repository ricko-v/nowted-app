import React from 'react'
import Notes from '../molecules/Notes'
import { Link } from 'react-router-dom'

const ListNotes = ({ idCurrent, data, isFromFavorite }) => {
  return (
    <div>
      {
        data.map((x) => (
          <Link to={isFromFavorite ? `/view/${x.id_dir}?id_note=${x.id}` : `?id_note=${x.id}`}>
            <Notes isActive={idCurrent == x.id} id={x.id} date={x.create_date} title={x.title} contents={x.contents} />
          </Link>
        ))
      }
    </div>
  )
}

export default ListNotes
