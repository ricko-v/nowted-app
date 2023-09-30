import React from 'react'
import { Route, Routes } from 'react-router-dom'
import App from '../App'
import View from '../View'
import Favorite from '../Favorite'
import TrashPage from '../TrashPage'
import ArchivePage from '../Archivepage'

const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<App />}>
        <Route path='/view/:id' element={<View />} />
        <Route path='/favorite' element={<Favorite />} />
        <Route path='/trash' element={<TrashPage />} />
        <Route path='/archive' element={<ArchivePage />} />
      </Route>
    </Routes>
  )
}

export default Router
