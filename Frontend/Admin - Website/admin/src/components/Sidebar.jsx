import React from 'react'
import { NavLink } from 'react-router-dom'
import GridViewIcon from '@mui/icons-material/GridView'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import SellIcon from '@mui/icons-material/Sell'
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount'
import StorefrontIcon from '@mui/icons-material/Storefront'
import './css/Sidebar.css'
import { Button } from '@mui/material'
import FlagIcon from '@mui/icons-material/Flag'
import axios from 'axios'
import address from '../config'

const LinksTop = [
    { id: 1, linkto: '/dashboard', icon: <GridViewIcon />, name: 'Dashboard' },
    { id: 2, linkto: '/users', icon: <PeopleAltIcon />, name: 'Users' },
    { id: 3, linkto: '/renters', icon: <SellIcon />, name: 'Renters' },
    { id: 4, linkto: '/rentees', icon: <SupervisorAccountIcon />, name: 'Rentee' },
    { id: 5, linkto: '/shops', icon: <StorefrontIcon />, name: 'Shops' },
    { id: 6, linkto: '/shops', icon: <FlagIcon />, name: 'Reports' }
]


export default function Sidebar() {

    const handleBackup = async () => {
        const res = await axios.get(`http://${address}/api/admin/backup`)
        if (res?.data?.success) {
            alert(res?.data?.message)
        } else {
            alert(res?.data?.message)
        }

    }

    const handleRestore = async () => {
        const res = await axios.get(`http://${address}/api/admin/restore`)

        if (res?.data?.success) {
            alert(res?.data?.message)
        } else {
            alert(res?.data?.message)
        }
    }

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
                <div className="w-full flex flex-col justify-start items-start gap-[.3rem]">
                    <Button
                        onClick={handleBackup}
                        variant="contained" sx={{ width: '100%', background: 'transparent', color: '#222', justifyContent: 'flex-start' }}>
                        Backup
                    </Button>
                    <Button
                        onClick={handleRestore}
                        variant="contained" sx={{ width: '100%', background: 'transparent', color: '#222', justifyContent: 'flex-start' }}>
                        Restore
                    </Button>
                </div>
            </div>
        </>
    )
}
