import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useOutletContext, useParams, useSearchParams } from 'react-router-dom'
import Hero from './assets/hero.svg'
import ListNotes from './components/organism/ListNotes';
import moment from 'moment';
import More from './components/atoms/icons/More';
import Star from './components/atoms/icons/Star';
import Archive from './components/atoms/icons/Archive';
import Trash from './components/atoms/icons/Trash';
import Swal from 'sweetalert2';
import Date from './components/atoms/icons/Date';
import Directory from './components/atoms/icons/Directory';
import Editor from './components/atoms/Editor';
import Restore from './components/atoms/icons/Restore';

const View = () => {
  const { id } = useParams();
  const [idNote, setIdNote] = useState(null);
  const navigate = useNavigate();
  const ctx = useOutletContext();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [data, setData] = useState([]);
  const [note, setNote] = useState([]);
  const [editorState, setEditorState] = useState(null);
  const [isExistDir, setIsExistDir] = useState(false);

  useEffect(() => {
    getDataLokal();

    if (ctx.onAddNewNote) {
      let a = data[0];
      let ida = a.child.length == 0 ? 1 : Number(a.child[a.child.length - 1].id) + 1;
      a.child.push({
        id: ida,
        id_dir: id,
        title: "New Note",
        deleted: false,
        create_date: moment().format("DD/MM/YYYY"),
        update_date: moment().format("DD/MM/YYYY"),
        contents: ""
      });

      setData([a]);
      saveNewNote(a, ida);
    }
  }, [ctx.onAddNewNote, id]);

  useEffect(() => {
    if (ctx.onDeletedDir) {
      getDataLokal();
      ctx.setOnDeletedDir(false);
    }
  }, [ctx.onDeletedDir]);

  useEffect(() => {
    setIdNote(searchParams.get('id_note'));
  }, [location]);

  useEffect(() => {
    let i = searchParams.get('id_note');

    if (data.length > 0 && i) {
      let fil = data[0].child.filter((x) => x.id == i)
      setNote(fil);
      let recent = window.db.store.get("list_recents");
      if (!recent) {
        window.db.store.set('list_recents', JSON.stringify([]));
      } else {
        if (fil.length > 0) {
          let a = JSON.parse(recent);
          let filter = a.filter((x) => x.id != i || x.id_dir != data[0].id);
          filter.unshift({
            ...fil[0],
            id_dir: data[0].id
          })
          window.db.store.set('list_recents', JSON.stringify(filter.slice(0, 3)));
          ctx.setListRecents(filter.slice(0, 3));
        }

      }
    }
  }, [idNote, data]);

  const getDataLokal = () => {
    let getLokal = window.db.store.get("db_nowted");

    if (!getLokal) {
      window.db.store.set('db_nowted', JSON.stringify([]));
      setData([]);
    } else {
      let a = JSON.parse(getLokal);
      let r = a.filter((x) => x.id == id);
      setData(r);
      ctx.setData(a);
    }
  }

  const saveNewNote = (a, ida) => {
    let getLokal = JSON.parse(window.db.store.get("db_nowted"));
    let b = getLokal.map((x) => {
      if (x.id == id) {
        return x = a;
      } else {
        return x;
      }
    });
    window.db.store.set("db_nowted", JSON.stringify(b));
    ctx.setOnAddNewNote(false);
    navigate(`?id_note=${ida}`);
  }

  const deleteNote = () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-danger mx-3',
        cancelButton: 'btn btn-white'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Delete this note?',
      text: 'Note will be move to trash',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result) => {
      // /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        let getLokal = JSON.parse(window.db.store.get("db_nowted"));

        getLokal.map((x) => {
          if (x.id == id) {
            x.child.map((s) => {
              if (s.id == idNote) {
                s.deleted = true;
              }
            })
          }
        })
        window.db.store.set("db_nowted", JSON.stringify(getLokal));

        getDataLokal();
        Swal.fire('Success delete note!', '', 'success');
      }
    })
  }

  const favoriteNote = () => {
    let getLokal = JSON.parse(window.db.store.get("db_nowted"));

    getLokal.map((x) => {
      if (x.id == id) {
        x.child.map((s) => {
          if (s.id == idNote) {
            s.favorited = true;
          }
        })
      }
    })
    window.db.store.set("db_nowted", JSON.stringify(getLokal));

    getDataLokal();
    Swal.fire('Success add to favorite note!', '', 'success');
  }

  const unFavoriteNote = () => {
    let getLokal = JSON.parse(window.db.store.get("db_nowted"));

    getLokal.map((x) => {
      if (x.id == id) {
        x.child.map((s) => {
          if (s.id == idNote) {
            s.favorited = false;
          }
        })
      }
    })
    window.db.store.set("db_nowted", JSON.stringify(getLokal));

    getDataLokal();
    Swal.fire('Success remove from favorite note!', '', 'success');
  }

  const archiveNote = () => {
    let getLokal = JSON.parse(window.db.store.get("db_nowted"));

    getLokal.map((x) => {
      if (x.id == id) {
        x.child.map((s) => {
          if (s.id == idNote) {
            s.archived = true;
          }
        })
      }
    })
    window.db.store.set("db_nowted", JSON.stringify(getLokal));

    getDataLokal();
    Swal.fire('Success add to archived note!', '', 'success');
  }

  const unArchiveNote = () => {
    let getLokal = JSON.parse(window.db.store.get("db_nowted"));

    getLokal.map((x) => {
      if (x.id == id) {
        x.child.map((s) => {
          if (s.id == idNote) {
            s.archived = false;
          }
        })
      }
    })
    window.db.store.set("db_nowted", JSON.stringify(getLokal));

    getDataLokal();
    Swal.fire('Success remove from archived note!', '', 'success');
  }

  const changeTitle = (e) => {
    let getLokal = JSON.parse(window.db.store.get("db_nowted"));
    let a = note.map((x) => {
      return {
        ...x,
        title: e.target.value
      }
    });

    setNote(a);

    getLokal.map((x) => {
      if (x.id == id) {
        x.child.map((s) => {
          if (s.id == idNote) {
            s.title = e.target.value;
          }
        })
      }
    })
    window.db.store.set("db_nowted", JSON.stringify(getLokal));
    getDataLokal();
  }

  const changeDirectory = (e) => {
    let getLokal = JSON.parse(window.db.store.get("db_nowted"));
    let a = data.map((x) => {
      return {
        ...x,
        text: e.target.value
      }
    });

    let sama = getLokal.filter((x) => x.text == e.target.value);

    setData(a);
    if (sama.length == 0) {
      getLokal.map((x) => {
        if (x.id == id) {
          x.text = e.target.value;
        }
      })
      window.db.store.set("db_nowted", JSON.stringify(getLokal));
      ctx.setData(getLokal);
      getDataLokal();
      setIsExistDir(false);
    } else {
      setIsExistDir(true);
    }
  }

  const saveContent = (e) => {
    let getLokal = JSON.parse(window.db.store.get("db_nowted"));
    let a = note.map((x) => {
      return {
        ...x,
        contents: e
      }
    });

    setNote(a);

    getLokal.map((x) => {
      if (x.id == id) {
        x.child.map((s) => {
          if (s.id == idNote) {
            s.contents = e;
          }
        })
      }
    })
    window.db.store.set("db_nowted", JSON.stringify(getLokal));
    getDataLokal();
  }

  const restoreNote = () => {
    let getLokal = JSON.parse(window.db.store.get("db_nowted"));
    let a = note.map((x) => {
      return {
        ...x,
        deleted: false
      }
    });

    setNote(a);

    getLokal.map((x) => {
      if (x.id == id) {
        x.child.map((s) => {
          if (s.id == idNote) {
            s.deleted = false;
          }
        })
      }
    })
    window.db.store.set("db_nowted", JSON.stringify(getLokal));
    getDataLokal();
    Swal.fire('Success restore note!', '', 'success');
  }

  const deletePermanentNote = () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-danger mx-3',
        cancelButton: 'btn btn-white'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Delete permanent this note?',
      text: 'Note will be delete permanently',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete Permanently',
    }).then((result) => {
      // /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        let getLokal = JSON.parse(window.db.store.get("db_nowted"));
        let recent = JSON.parse(window.db.store.get("list_recents"));
        let r = recent.filter((x) => x.id != idNote || x.id_dir != id);
        console.log(recent, idNote, id)
        getLokal.map((x) => {
          if (x.id == id) {
            let a = [];
            x.child.map((s) => {
              if (s.id != idNote) {
                a.push(s);
              }
            });
            x.child = a;
          }
        })
        window.db.store.set("db_nowted", JSON.stringify(getLokal));
        window.db.store.set("list_recents", JSON.stringify(r));
        ctx.setListRecents(r);

        getDataLokal();
        navigate(`/view/${data[0].id}`)
        Swal.fire('Success delete permanently note!', '', 'success');
      }
    })
  }

  if (data.length == 0) {
    navigate('/')
  }

  if (data.length > 0) {
    return (
      <div className='row min-vh-100' style={{ maxHeight: '100vh', overflow: 'hidden' }}>
        <div className="col-0 mt-2 px-3 col-lg-4 d-none d-lg-block" style={{ maxHeight: '100vh', overflowY: 'scroll' }}>
          <div style={{ marginBottom: 6 }} className="py-4">
            <input onChange={changeDirectory} style={{ fontSize: '1.1rem' }} className='form-control px-0 bg-transparent fw-semibold border-0 text-white w-100 shadow-none' value={data.length > 0 ? data[0].text : ""} />
            {
              isExistDir &&
              <small className='text-danger'>Directory already exist!</small>
            }
          </div>

          <ListNotes idCurrent={idNote} data={data[0].child} />
        </div>
        <div className="col-0 col-lg-8 bg-very-dark text-white" style={{ maxHeight: '100vh', overflowY: 'scroll' }}>
          {
            idNote === null ?
              <div className='col-12 d-flex min-vh-100 justify-content-center align-items-center'>
                <div className="text-center">
                  <img src={Hero} className="h-100" alt='hero-image' style={{ height: '100px' }} />

                  <h4 className="fw-semibold my-3">Select a Note to view</h4>
                  <small style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Choose a Note from the list on the left to view its contents, or create
                    <br />
                    a new Note by click "New Note".</small>
                </div>
              </div>
              :
              note.length > 0 &&
                note[0].deleted ?
                <div className='min-vh-100 d-flex align-items-center justify-content-center'>
                  <div className='text-center'>
                    <div className='d-flex justify-content-center mb-2'>
                      <Restore />
                    </div>
                    <h4 className='fw-semibold'>Restore “{note[0].title}”</h4>
                    <small style={{ color: 'rgba(255,255,255,0.6)' }}>Don't want to lose this note? It's not too late! Just click the 'Restore' <br /> button and it will be added back to your list. It's that simple.</small>
                    <div className='d-flex gap-3 justify-content-center'>
                      <button onClick={deletePermanentNote} className='bg-danger btn px-4 mt-3 shadow-none text-white '>
                        <small>Delete Permanently</small>
                      </button>
                      <button onClick={restoreNote} className='bg-active btn px-4 mt-3 shadow-none text-white '>
                        <small>Restore Note</small>
                      </button>
                    </div>
                  </div>
                </div>
                :
                <div className='my-4 pt-1 px-3'>
                  <div className='d-flex justify-content-between'>
                    <input autoFocus onChange={changeTitle} style={{ fontSize: '1.4rem' }} className='form-control px-0 bg-transparent fw-semibold border-0 text-white w-100 shadow-none' value={note.length > 0 ? note[0].title : ""} />
                    <button className='btn btn-link shadow-none p-0' data-bs-toggle="dropdown" aria-expanded="false">
                      <More />
                    </button>
                    <ul class="dropdown-menu dropdown-menu-end bg-three">
                      {
                        note.length > 0 &&
                          note[0].favorited ?
                          <li onClick={unFavoriteNote}>
                            <span style={{ gap: '13px' }} class="cursor-pointer dropdown-item text-white d-flex align-items-center bg-three" href="#">
                              <Star />
                              Cancel to Favorites
                            </span>
                          </li>
                          :
                          <li onClick={favoriteNote}>
                            <span style={{ gap: '13px' }} class="cursor-pointer dropdown-item text-white d-flex align-items-center bg-three" href="#">
                              <Star />
                              Add to Favorites
                            </span>
                          </li>
                      }
                      {
                        note.length > 0 &&
                          note[0].archived ?
                          <li onClick={unArchiveNote}>
                            <span style={{ gap: '13px' }} class="cursor-pointer dropdown-item text-white d-flex align-items-center bg-three" href="#">
                              <Archive />
                              Cancel to Archived
                            </span>
                          </li>
                          :
                          <li onClick={archiveNote}>
                            <span style={{ gap: '13px' }} class="cursor-pointer dropdown-item text-white d-flex align-items-center bg-three" href="#">
                              <Archive />
                              Add to Archived
                            </span>
                          </li>
                      }
                      <li><hr class="dropdown-divider" /></li>
                      <li onClick={deleteNote} >
                        <span style={{ gap: '13px' }} class="cursor-pointer dropdown-item text-white d-flex align-items-center bg-three" href="#">
                          <Trash />
                          Delete
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className='mt-3'>
                    <div className='d-flex align-items-center gap-3'>
                      <Date />
                      <small style={{ color: "rgba(255,255,255,0.6)" }}>Date</small>
                      <small className='ps-5 text-decoration-underline'>{note.length > 0 ? note[0].create_date : ""}</small>
                    </div>
                    <hr />
                    <div className='d-flex align-items-center gap-3'>
                      <Directory />
                      <small style={{ color: "rgba(255,255,255,0.6)" }}>Folder</small>
                      <small className='text-decoration-underline' style={{ marginLeft: 37 }}>{data.length > 0 ? data[0].text : ""}</small>
                    </div>
                    <hr />
                  </div>

                  <div>
                    <Editor onChange={saveContent} value={note.length > 0 ? note[0].contents : ""} />
                  </div>

                  <div id='kk' />
                </div>
          }
        </div>
      </div>
    )
  }
}

export default View
