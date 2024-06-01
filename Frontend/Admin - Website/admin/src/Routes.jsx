import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Employee from './pages/Employee'
import Renters from './pages/Renters'
import Rentees from './pages/Rentees'
import Shops from './pages/Shops'
import Products from './pages/Products'
import Reports from './pages/Reports'

const Routes = createBrowserRouter([
    { path: '/', element: <Home /> },
    { path: '/dashboard', element: <Dashboard /> },
    { path: '/users', element: <Employee /> },
    { path: '/renters', element: <Renters /> },
    { path: '/rentees', element: <Rentees /> },
    { path: '/shops', element: <Shops /> },
    { path: '/products', element: <Products /> },
    { path: '/reports', element: <Reports /> }
])

export default Routes