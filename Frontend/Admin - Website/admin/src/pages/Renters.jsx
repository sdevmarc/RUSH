import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { DataGrid } from '@mui/x-data-grid'
import address from '../config'
import axios from 'axios'

const columns = [
    { field: 'id', headerName: 'No.', width: 70 },
    { field: 'username', headerName: 'Username', width: 250 },
    { field: 'displayName', headerName: 'Display Name', width: 230 }
];

export default function Renters() {
    const [values, setValues] = useState([])

    useEffect(() => {
        fetchUsers()
    }, [])

    const fetchUsers = async () => {
        const res = await axios.get(`http://${address}/api/getrenters`)

        const formattedData = res?.data?.data?.map((user) => ({
            id: user._id,
            username: user.username,
            displayName: user?.displayName || ''
        }))
        setValues(formattedData)

    }

    return (
        <>
            <div className="w-full h-screen">
                <Navbar />
                <div className="w-full h-[91%] flex">
                    <Sidebar />
                    <div className="w-[82.5%] h-full flex flex-col justify-between items-start p-[1rem]">
                        <div className="w-full h-[8%] flex justify-between items-center ">
                            <div className="h-full flex items-center gap-[1rem]">
                                <h1 className='font-[600]'>Renters</h1>
                            </div>
                        </div>
                        <div className="w-full h-[90%] bg-yellow flex justify-center items-center">
                            <DataGrid
                                rows={values}
                                columns={columns}
                                initialState={{
                                    pagination: {
                                        paginationModel: { page: 0, pageSize: 5 },
                                    },
                                }}
                                pageSizeOptions={[5, 10]}
                                checkboxSelection
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
