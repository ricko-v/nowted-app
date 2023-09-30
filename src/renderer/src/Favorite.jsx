import React, { useEffect, useState } from 'react'
import ListNotes from './components/organism/ListNotes'
import Star from './components/atoms/icons/Star'
import { useOutletContext } from 'react-router-dom'

const Favorite = () => {
  const [data, setData] = useState([]);
  const ctx = useOutletContext();


  const getDataLokal = () => {
    let getLokal = window.db.store.get("db_nowted");

    if (!getLokal) {
      window.db.store.set('db_nowted', JSON.stringify([]));
      setData([]);
    } else {
      let a = JSON.parse(getLokal);
      let r = [];
      a.map((x) => {
        x.child.map((z) => {
          if (z.favorited) {
            r.push(z)
          }
        })
      });
      setData(r);
    }
  }

  useEffect(() => {
    if (ctx.onDeletedDir) {
      getDataLokal();
      ctx.setOnDeletedDir(false);
    }
  }, [ctx.onDeletedDir]);


  useEffect(() => {
    getDataLokal();
  }, []);
  return (
    <div className='row min-vh-100' style={{ maxHeight: '100vh', overflow: 'hidden' }}>
      <div className="col-0 mt-2 px-3 col-lg-4 d-none d-lg-block" style={{ maxHeight: '100vh', overflowY: 'scroll' }}>
        <div style={{ marginBottom: 6 }} className="py-4">
          <input disabled style={{ fontSize: '1.1rem' }} className='form-control px-0 bg-transparent fw-semibold border-0 text-white w-100 shadow-none' value={"Favorites"} />
        </div>
        <ListNotes isFromFavorite data={data} />
      </div>
      <div className="col-0 col-lg-8 bg-very-dark text-white" style={{ maxHeight: '100vh', overflowY: 'scroll' }}>
        <div className='col-12 d-flex min-vh-100 justify-content-center align-items-center'>
          <div className="text-center">
            <Star width={50} height={50} />

            <h4 className="fw-semibold my-3">My Favorite Note</h4>
            <small style={{ color: 'rgba(255, 255, 255, 0.6)' }}>Choose a favorite Note from the list on the left to view its contents</small>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Favorite
