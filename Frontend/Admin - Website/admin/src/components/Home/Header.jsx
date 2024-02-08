import React from 'react'

const Header = () => {
    return (
        <>
            <div className="w-full h-[8vh] flex flex-col px-[15rem]">
                <div className="w-full h-full flex justify-between items-center border-b-black border-b border-solid px-[10rem]">
                    <h1
                        className='text-[20px] font-semibold cursor-pointer'
                    >
                        Logo
                    </h1>
                    <h1
                        className='text-[15px] font-semibold cursor-pointer'
                    >
                        Download
                    </h1>
                </div>
                <div className="w-full h-[5vh] flex justify-center items-center bg-[#f9faff]">
                    <h1
                        className='text-[13px] font-semibold'
                    >
                        Early access is now live!
                    </h1>
                </div>
            </div>
        </>
    )
}

export default Header