import { Link, Outlet, useLocation, useNavigate } from "react-router-dom"
import AddFolder from "./components/atoms/icons/AddFolder"
import Hero from './assets/hero.svg'
import Logo from "./components/atoms/icons/Logo"
import Plus from "./components/atoms/icons/Plus"
import Search from "./components/atoms/icons/Search"
import ListFolders from "./components/organism/ListFolders"
import ListMore from "./components/organism/ListMore"
import ListRecents from "./components/organism/ListRecents"
import { useEffect, useState } from "react"
import Swal from 'sweetalert2'
import { v4 as uuidv4 } from 'uuid';

function App() {
  const location = useLocation();
  const [name, setName] = useState("");
  const [data, setData] = useState([]);
  const [listRecents, setListRecents] = useState([]);
  const [onAddNewNote, setOnAddNewNote] = useState(false);
  const [onDeletedDir, setOnDeletedDir] = useState(false);
  const [showNewCollection, setShowNewCollection] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getDataLokal();
  }, []);

  const saveCollectionName = (e) => {
    if (e.preventDefault) {
      e.preventDefault();
    }

    let filter = data.filter((x) => x.text.toLowerCase() == name.toLowerCase());

    if (filter.length > 0) {
      Swal.fire({
        title: "Error!",
        text: "Folder name already exist."
      });
      setName("");
      setShowNewCollection(false);
    }

    else if (name == "") {
      setShowNewCollection(false);
    } else {
      let id = uuidv4();
      const dataLokal = data;
      const dataPost = {
        id: id,
        text: name,
        child: []
      }
      dataLokal.push(dataPost)
      window.db.store.set('db_nowted', JSON.stringify(dataLokal));
      setShowNewCollection(false);
      setName("");
      getDataLokal();
      navigate(`/view/${id}`)
    }
  }

  const getDataLokal = () => {
    let getLokal = window.db.store.get("db_nowted");
    let recent = window.db.store.get("list_recents");

    if (!getLokal) {
      window.db.store.set('db_nowted', JSON.stringify([]));
      setData([]);
    } else {
      let a = JSON.parse(getLokal);
      setData(a);
    }

    if (!recent) {
      window.db.store.set('list_recents', JSON.stringify([]));
      setListRecents([]);
    } else {
      let a = JSON.parse(recent);
      setListRecents(a);
    }
  }

  return (
    <div className="container-fluid w-100 min-vh-100 bg-soft-dark text-white">
      <div className='row'>
        <div className='col-12 col-md-4 col-lg-3'>
          <div className='row'>
            <div className='px-0 position-relative bg-very-dark min-vh-100' style={{ maxHeight: '100vh', overflowY: 'scroll' }}>
              <div className="py-4 px-3 d-flex justify-content-between align-items-center">
                <Link to='/'>
                  <Logo />
                </Link>
                {/* <button className="btn p-0 btn-link shadow-none">
                  <Search />
                </button> */}
              </div>
              {
                location.pathname.search('view') != -1 &&
                <div className="mb-4 px-3">
                  <button onClick={() => setOnAddNewNote(true)} style={{ background: 'rgba(255, 255, 255, 0.05)' }} className="btn btn-link text-decoration-none w-100 text-white d-flex align-items-center gap-1 justify-content-center shadow-none">
                    <Plus />
                    <span className="fw-semibold">New Note</span>
                  </button>
                </div>
              }

              <div className="mb-4">
                <div className="mb-2 px-3">
                  <small className="text-unactive fw-semibold">Recents</small>
                </div>

                <div>
                  <ListRecents list={listRecents} />
                </div>
              </div>

              <div className="mb-4">
                <div className="mb-2 px-3 d-flex align-items-center justify-content-between">
                  <small className="text-unactive fw-semibold">Folders</small>
                  <button onClick={() => setShowNewCollection(true)} className="btn btn-link shadow-none p-0">
                    <AddFolder />
                  </button>
                </div>

                {
                  showNewCollection &&
                  <div className="px-3 my-3">
                    <form onSubmit={saveCollectionName}>
                      <input onChange={(e) => setName(e.target.value)} onBlur={saveCollectionName} autoFocus className="form-control text-white fw-semibold bg-very-dark shadow-none border-white" placeholder="Add title of collection" />
                    </form>
                  </div>
                }

                {
                  data.length == 0 ?
                    <div className='px-3'>
                      <p className='text-secondary text-center fw-semibold small'>Your note or collection is empty</p>
                    </div>
                    :
                    <ListFolders data={data} onSuccessDeleteCollection={() => {
                      getDataLokal();
                      setOnDeletedDir(true);
                    }} />
                }
              </div>

              <div>
                <div className="mb-2 px-3">
                  <small className="text-unactive fw-semibold">More</small>
                </div>


                <ListMore />
              </div>

              <div class="position-absolute text-center w-100 small" style={{ bottom: '10px' }}>
                <span>v0.1</span>
              </div>
            </div>
          </div>
        </div>

        {
          location.pathname == '/' ?
            <div className='col-12 col-md-8 col-lg-9 d-flex min-vh-100 justify-content-center align-items-center'>
              <div className="text-center">
                <img src={Hero} className="h-100" alt='hero-image' style={{ height: '100px' }} />

                <h4 className="fw-semibold my-3">Select a Collection to view</h4>
                <small style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Choose a Collection from the list on the left to view its contents, or create
                  <br />
                  a new Collection to add to your collection.</small>
              </div>
            </div>
            :
            <div className='col-12 col-md-8 col-lg-9'>
              <Outlet context={{ data, onDeletedDir, setOnDeletedDir, onAddNewNote, setOnAddNewNote, setData, setListRecents }} onChangeData={getDataLokal} />
            </div>
        }
      </div >
    </div >
  )
}

export default App
