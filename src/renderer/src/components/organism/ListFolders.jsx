import React, { useEffect, useState } from 'react'
import Folders from '../molecules/Folders'
import { Link, useParams } from 'react-router-dom';
import Swal from 'sweetalert2'

const ListFolders = ({ data, onSuccessDeleteCollection }) => {
  const [seeAll, setSeeAll] = useState(false);
  const [d, setD] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    if (data.length > 0) {
      setD(data.sort((a, b) => a.text.localeCompare(b.text)));
    }
  }, [data]);

  const handleTrash = (id) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-danger mx-3',
        cancelButton: 'btn btn-white'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Delete this collection?',
      text: 'All note inside collection will be deleted',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        let recent = JSON.parse(window.db.store.get("list_recents"));
        let filter = data.filter((x) => x.id !== id);
        let a = recent.filter((x) => x.id_dir !== id);
        window.db.store.set("db_nowted", JSON.stringify(filter));
        window.db.store.set("list_recents", JSON.stringify(a));
        onSuccessDeleteCollection();
        Swal.fire('Success delete collection!', '', 'success');
      }
    })
  }

  return (
    <>
      {
        d.map((x, i) => (
          <Link to={`/view/${x.id}`}>
            <Folders active={id == x.id} key={i} text={x.text} clickedTrash={() => handleTrash(x.id)} />
          </Link>
        ))
      }
    </>
  )
}

export default ListFolders
