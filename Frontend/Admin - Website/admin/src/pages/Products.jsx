import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { DataGrid } from '@mui/x-data-grid'
import address from '../config'
import axios from 'axios'

const columns = [
    { field: 'id', headerName: 'No.', width: 100 },
    { field: 'productName', headerName: 'Product Name', width: 250 },
    { field: 'isAvailable', headerName: 'Availability', width: 230 },
    { field: 'price', headerName: 'Price', width: 230 },
    { field: 'shippingFee', headerName: 'Shipping Fee', width: 230 }
];


export default function Products() {
    const [values, setValues] = useState([])
    const [isSearch, setSearch] = useState([])

    useEffect(() => {
        fetchUsers()
    }, [])

    const fetchUsers = async () => {
        const res = await axios.get(`http://${address}/api/getallproducts`)

        const formattedData = res?.data?.data?.map((user) => ({
            id: user._id,
            productName: user?.productInformation?.productName,
            isAvailable: user?.productInformation?.isAvailable,
            price: user?.productInformation?.price,
            shippingFee: user?.productInformation?.shippingFee,
        }))
        setValues(formattedData)
    }

    const handleSearch = async (e) => {
        try {
            const value = e.target.value
            if (!value) {
                fetchUsers()
                setSearch([])
            } else {
                const res = await axios.get(`http://${address}/api/searchadminproduct/${value}`)
                const formattedData = res?.data?.data?.map((user) => ({
                    id: user._id,
                    productName: user?.productInformation?.productName,
                    isAvailable: user?.productInformation?.isAvailable,
                    price: user?.productInformation?.price,
                    shippingFee: user?.productInformation?.shippingFee,
                }))
                setSearch(formattedData)
            }

        } catch (error) {
            console.log(error)
        }
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
                                <h1 className='font-[600]'>Products</h1>
                                <input
                                    onChange={(item) => handleSearch(item)}
                                    className='w-[30rem] h-full rounded-lg p-[1rem] border border-black'
                                    type="text"
                                    placeholder='Search for shops...'
                                />
                            </div>
                        </div>
                        <div className="w-full h-[90%] bg-yellow flex justify-center items-center">
                            {
                                isSearch.length <= 0 ? (
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
                                ) : (
                                    <DataGrid
                                        rows={isSearch}
                                        columns={columns}
                                        initialState={{
                                            pagination: {
                                                paginationModel: { page: 0, pageSize: 5 },
                                            },
                                        }}
                                        pageSizeOptions={[5, 10]}
                                        checkboxSelection
                                    />
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
