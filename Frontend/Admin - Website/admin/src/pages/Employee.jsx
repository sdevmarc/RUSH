import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import address from '../config';
import axios from 'axios';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

const Users = () => {
    const [values, setValues] = useState([]);
    const [open, setOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [details, setDetails] = useState({
        username: '',
        password: '',
        confirmpass: ''
    });
    const [isSearch, setSearch] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const res = await axios.get(`http://${address}/api/admin/getall`);
        const formattedData = res?.data?.data?.map((user) => ({
            id: user._id,
            username: user.username,
        }));
        setValues(formattedData);
    };

    const handleSubmit = async () => {
        try {
            const { username, password, confirmpass } = details;
            if (!username || !password || !confirmpass) return alert('Please fill in the required fields');
            if (password !== confirmpass) return alert('Passwords do not match!');

            if (isEditMode) {
                const res = await axios.post(`http://${address}/api/admin/updateuser/${selectedUserId}`, details);
                if (res?.data?.success) {
                    handleClose();
                    alert(res?.data?.message);
                } else {
                    alert(res?.data?.message);
                }
            } else {
                const res = await axios.post(`http://${address}/api/admin/adduser`, details);
                if (res?.data?.success) {
                    handleClose();
                    alert(res?.data?.message);
                } else {
                    alert(res?.data?.message);
                }
            }
        } catch (error) {
            console.error(error);
        } finally {
            fetchUsers();
        }
    };

    const handleOpen = () => {
        setIsEditMode(false);
        setDetails({
            username: '',
            password: '',
            confirmpass: ''
        });
        setOpen(true);
    };

    const handleOpenEdit = (user) => {
        setIsEditMode(true);
        setSelectedUserId(user.id);
        setDetails({
            username: user.username,
            password: '',
            confirmpass: ''
        });
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setDetails((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSearch = async (e) => {
        try {
            const value = e.target.value;
            if (!value) {
                fetchUsers();
                setSearch([]);
            } else {
                const res = await axios.get(`http://${address}/api/admin/searchuser/${value}`);
                const formattedData = res?.data?.data?.map((user) => ({
                    id: user._id,
                    username: user.username,
                }));
                setSearch(formattedData);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const renderActionButtons = (params) => {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <Button onClick={() => handleOpenEdit(params.row)} variant="text">
                    <EditIcon />
                </Button>
            </div>
        );
    };

    const columns = [
        { field: 'id', headerName: 'No.', width: 250 },
        { field: 'username', headerName: 'Username', width: 250 },
        { field: 'actions', headerName: 'Actions', width: 200, headerAlign: 'center', renderCell: renderActionButtons }
    ];

    return (
        <>
            <div className="w-full h-screen">
                <Modal
                    open={open}
                    onClose={handleClose}
                >
                    <div className="absolute flex flex-col justify-between px-[3rem] py-[2rem] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[30rem] h-[35rem] bg-white rounded-xl">
                        <div className="w-full flex flex-col justify-center items-start gap-[1rem]">
                            <h1 className='font-[600] text-[1.3rem]'>{isEditMode ? 'Edit User' : 'Add User'}</h1>
                            <div className='w-full flex flex-col justify-start gap-[.5rem]'>
                                <h1 className='font-[600] text-[1rem]'>Username</h1>
                                <TextField
                                    name='username'
                                    value={details?.username}
                                    onChange={handleOnChange}
                                    variant="outlined"
                                    placeholder='Enter the username'
                                />
                            </div>
                            <div className='w-full flex flex-col justify-start gap-[.5rem]'>
                                <h1 className='font-[600] text-[1rem]'>Password</h1>
                                <TextField
                                    name='password'
                                    value={details?.password}
                                    onChange={handleOnChange}
                                    variant="outlined"
                                    placeholder='Enter the password'
                                />
                            </div>
                            <div className='w-full flex flex-col justify-start gap-[.5rem]'>
                                <h1 className='font-[600] text-[1rem]'>Confirm Password</h1>
                                <TextField
                                    name='confirmpass'
                                    onChange={handleOnChange}
                                    value={details?.confirmpass}
                                    variant="outlined"
                                    placeholder='Confirm your password'
                                />
                            </div>
                        </div>
                        <Button
                            onClick={handleSubmit}
                            className='w-full'
                            variant="contained"
                            sx={{ background: '#333' }}
                        >
                            {isEditMode ? 'Update' : 'Register'}
                        </Button>
                    </div>
                </Modal>
                <Navbar />
                <div className="w-full h-[91%] flex">
                    <Sidebar />
                    <div className="w-[82.5%] h-full flex flex-col justify-between items-start p-[1rem]">
                        <div className="w-full h-[8%] flex justify-between items-center ">
                            <div className="h-full flex items-center gap-[1rem]">
                                <h1 className='font-[600]'>User</h1>
                                <input
                                    onChange={(item) => handleSearch(item)}
                                    className='w-[30rem] h-full rounded-lg p-[1rem] border border-black'
                                    type="text"
                                    placeholder='Search for employees...'
                                />
                            </div>
                            <Button
                                onClick={handleOpen}
                                variant="contained" sx={{ background: '#333' }}
                            >
                                Add User
                            </Button>
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
    );
};

export default Users;
