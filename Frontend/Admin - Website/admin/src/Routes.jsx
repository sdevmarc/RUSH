import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import Admin from './pages/Admin'

const Routes = createBrowserRouter([
    { path: '/', element: <Home /> },
    { path: '/admin', element: <Admin /> }
])

export default Routes