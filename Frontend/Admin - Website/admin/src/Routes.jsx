import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Users from './pages/Users'
import Renters from './pages/Renters'
import Rentees from './pages/Rentees'
import Shops from './pages/Shops'
import Settings from './pages/Settings'

const Routes = createBrowserRouter([
    { path: '/', element: <Home /> },
    { path: '/dashboard', element: <Dashboard /> },
    { path: '/users', element: <Users /> },
    { path: '/renters', element: <Renters /> },
    { path: '/rentees', element: <Rentees /> },
    { path: '/shops', element: <Shops /> },
    { path: '/settings', element: <Settings /> }
])

export default Routes