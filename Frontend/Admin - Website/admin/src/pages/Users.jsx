import React from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Button from '@mui/material/Button'
import { DataGrid } from '@mui/x-data-grid'
import EditIcon from '@mui/icons-material/Edit'


const renderActionButtons = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <Button variant="text">
                <EditIcon />
            </Button>
        </div>
    );
};

const columns = [
    { field: 'id', headerName: 'No.', width: 70 },
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'lastname', headerName: 'Last Name', width: 230 },
    { field: 'firstname', headerName: 'First Name', width: 230 },
    { field: 'isactive', headerName: 'Status', width: 130, align: 'center', headerAlign: 'center' },
    { field: 'actions', headerName: 'Actions', width: 200, headerAlign: 'center', renderCell: renderActionButtons }
];

const rows = [
    { id: 1, firstname: "Fernande", lastname: "Galgey", email: "fgalgey0@tmall.com", isactive: 'Inactive' },
    { id: 2, firstname: "Lonna", lastname: "Challinor", email: "lchallinor1@shinystat.com", isactive: 'Inactive' },
    { id: 3, firstname: "Ichabod", lastname: "Crannis", email: "icrannis2@who.int", isactive: 'Inactive' },
    { id: 4, firstname: "Antonin", lastname: "Claypoole", email: "aclaypoole3@patch.com", isactive: 'Inactive' },
    { id: 5, firstname: "Devland", lastname: "Brusin", email: "dbrusin4@issuu.com", isactive: 'Inactive' },
    { id: 6, firstname: "Brendis", lastname: "Borrows", email: "bborrows5@sciencedirect.com", isactive: 'Inactive' },
    { id: 7, firstname: "Briana", lastname: "Ramstead", email: "bramstead6@google.com.hk", isactive: 'Inactive' },
    { id: 8, firstname: "Ibby", lastname: "Poynton", email: "ipoynton7@themeforest.net", isactive: 'Inactive' },
    { id: 9, firstname: "Elfie", lastname: "Tomankowski", email: "etomankowski8@mysql.com", isactive: 'Inactive' },
    { id: 10, firstname: "Madlin", lastname: "Glasspool", email: "mglasspool9@foxnews.com", isactive: 'Inactive' },
    { id: 11, firstname: "Silvanus", lastname: "Maus", email: "smausa@usda.gov", isactive: 'Inactive' },
    { id: 12, firstname: "Candide", lastname: "Ibbott", email: "cibbottb@google.com.au", isactive: 'Inactive' },
    { id: 13, firstname: "Lida", lastname: "Langham", email: "llanghamc@phoca.cz", isactive: 'Inactive' },
    { id: 14, firstname: "Stephine", lastname: "Bundey", email: "sbundeyd@wisc.edu", isactive: 'Inactive' },
    { id: 15, firstname: "Uta", lastname: "Yanne", email: "uyannee@cloudflare.com", isactive: 'Inactive' },
    { id: 16, firstname: "Kirsti", lastname: "Darben", email: "kdarbenf@ycombinator.com", isactive: 'Inactive' },
    { id: 17, firstname: "Mei", lastname: "Ladbrooke", email: "mladbrookeg@patch.com", isactive: 'Inactive' },
    { id: 18, firstname: "Peirce", lastname: "Matuskiewicz", email: "pmatuskiewiczh@amazon.de" },
    { id: 19, firstname: "Inga", lastname: "Lince", email: "ilincei@netscape.com", isactive: 'Inactive' },
    { id: 20, firstname: "Ilysa", lastname: "Pettingall", email: "ipettingallj@weebly.com", isactive: 'Inactive' },
    { id: 21, firstname: "Ynes", lastname: "Suche", email: "ysuchek@myspace.com", isactive: 'Inactive' },
    { id: 22, firstname: "Kipp", lastname: "Tewelson", email: "ktewelsonl@unblog.fr", isactive: 'Inactive' },
    { id: 23, firstname: "Jeremie", lastname: "Holbie", email: "jholbiem@vk.com", isactive: 'Inactive' },
    { id: 24, firstname: "Val", lastname: "Voisey", email: "vvoiseyn@chicagotribune.com", isactive: 'Inactive' },
    { id: 25, firstname: "Lian", lastname: "Wenman", email: "lwenmano@ehow.com", isactive: 'Inactive' },
    { id: 26, firstname: "Daniella", lastname: "Cordingly", email: "dcordinglyp@sun.com", isactive: 'Inactive' },
    { id: 27, firstname: "Aeriel", lastname: "Puddefoot", email: "apuddefootq@icio.us", isactive: 'Inactive' },
    { id: 28, firstname: "Dillon", lastname: "Kiely", email: "dkielyr@techcrunch.com", isactive: 'Inactive' },
    { id: 29, firstname: "Leola", lastname: "Strase", email: "lstrases@mlb.com", isactive: 'Inactive' },
    { id: 30, firstname: "Quentin", lastname: "Crickmore", email: "qcrickmoret@rambler.ru", isactive: 'Inactive' },

]



export default function Users() {
    return (
        <>
            <div className="w-full h-screen">
                <Navbar />
                <div className="w-full h-[91%] flex">
                    <Sidebar />
                    <div className="w-[82.5%] h-full flex flex-col justify-between items-start p-[1rem]">
                        <div className="w-full h-[8%] flex justify-between items-center ">
                            <div className="h-full flex items-center gap-[1rem]">
                                <h1 className='font-[600]'>Users</h1>
                                <input
                                    className='w-[30rem] h-full rounded-lg p-[1rem] border border-black'
                                    type="text"
                                    placeholder='Search for users...'
                                />
                            </div>

                            <Button variant="contained" sx={{ background: '#333' }}>Add User</Button>
                        </div>
                        <div className="w-full h-[90%] bg-yellow flex justify-center items-center">
                            <DataGrid
                                rows={rows}
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
