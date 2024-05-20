import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Users from './pages/Users'
import Renters from './pages/Renters'
import Rentees from './pages/Rentees'
import Shops from './pages/Shops'

const Routes = createBrowserRouter([
    { path: '/', element: <Home /> },
    { path: '/dashboard', element: <Dashboard /> },
    { path: '/users', element: <Users /> },
    { path: '/renters', element: <Renters /> },
    { path: '/rentees', element: <Rentees /> },
    { path: '/shops', element: <Shops /> }
])

export default Routes