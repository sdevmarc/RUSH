import React from 'react'
import { NavLink } from 'react-router-dom'
import GridViewIcon from '@mui/icons-material/GridView'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import SellIcon from '@mui/icons-material/Sell'
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount'
import StorefrontIcon from '@mui/icons-material/Storefront'
import SettingsIcon from '@mui/icons-material/Settings'
import './css/Sidebar.css'

const LinksTop = [
    { id: 1, linkto: '/dashboard', icon: <GridViewIcon />, name: 'Dashboard' },
    { id: 2, linkto: '/users', icon: <PeopleAltIcon />, name: 'Users' },
    { id: 3, linkto: '/renters', icon: <SellIcon />, name: 'Renters' },
    { id: 4, linkto: '/rentees', icon: <SupervisorAccountIcon />, name: 'Rentee' },
    { id: 5, linkto: '/shops', icon: <StorefrontIcon />, name: 'Shops' }
]

const LinksBottom = [
    { id: 1, linkto: '/settings', icon: <SettingsIcon />, name: 'Settings' }
]

export default function Sidebar() {
    return (
        <>
            <div className="sidebar w-[17.5%] h-[91vh] border-r border-black p-[1rem] flex flex-col justify-between items-start gap-[1rem]">
                <div className="overflow-auto w-full flex flex-col justify-start items-start gap-[.5rem]">
                    {
                        LinksTop.map((item) => (
                            <NavLink
                                key={item.id}
                                to={item.linkto}
                                className={`w-full p-[.5rem] rounded-lg flex items-center gap-[.5rem] hover:bg-[#EFEFEF] duration-300 ease`}
                            >
                                {item.icon}{item.name}
                            </NavLink>
                        ))
                    }
                </div>
                <div className="w-full flex flex-col justify-start items-start gap-[.5rem]">
                    {
                        LinksBottom.map((item) => (
                            <NavLink
                                key={item.id}
                                to={item.linkto}
                                className={`w-full p-[.5rem] rounded-lg flex items-center gap-[.5rem] hover:bg-[#EFEFEF] duration-300 ease`}
                            >
                                {item.icon}{item.name}
                            </NavLink>
                        ))
                    }
                </div>
            </div>
        </>
    )
}
