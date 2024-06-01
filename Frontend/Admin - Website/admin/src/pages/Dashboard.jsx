import React from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

export default function Dashboard() {
    return (
        <>
            <div className="w-full h-screen">
                <Navbar />
                <Sidebar />
            </div>
        </>
    )
}
