import React from 'react'

const Header = () => {
    return (
        <>
            <div className="w-full h-[8vh] bg-black flex justify-between items-center px-[15rem]">
                <div className="overflow-hidden w-[2rem] h-[2rem] bg-yellow-500">
                    <h1
                        className='w-full h-full flex justify-center items-center text-[13px]'
                    >Logo</h1>
                </div>
            </div>
        </>
    )
}

export default Header