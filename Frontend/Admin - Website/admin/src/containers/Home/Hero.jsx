import React from 'react'
import Header from '../../components/Home/Header'

const Hero = () => {
    return (
        <>
            <Header />
            <div className="w-full h-[60vh] flex">
                <div className="relative w-[60%] h-full">
                    <img
                        className='object-cover  w-full h-full'
                        src="https://source.unsplash.com/white-and-brown-floral-long-sleeve-shirt-7F7kEHj72MQ"
                        alt="asd" />
                        <div className="absolute top-[40%] left-[50%] translate-x-[-50%] translate-y-1-[-50%] w-full flex flex-col justify-center items-center gap-4">
                        <h1
                            className='text-[50px] font-semibold text-white text-center'
                        >
                            Dowload the App
                        </h1>
                        <button
                            className='w-[10rem] h-[2rem] border border-[#111] border-solid duration-300 ease bg-[#111] hover:bg-white hover:border-[#fff] hover:text-black text-white'
                        >
                            Explore
                        </button>
                    </div>
                </div>
                <div className="relative w-[40%] h-full">
                    <img
                        className='object-cover w-full h-full'
                        src="https://plus.unsplash.com/premium_photo-1675695700239-44153e6bf430?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y3J1bXBsZWQlMjBwYXBlcnxlbnwwfHwwfHx8MA%3D%3D"
                        alt="asd" />
                    <div className="absolute top-[25%] left-[50%] translate-x-[-50%] translate-y-1-[-50%] w-[20rem] flex flex-col justify-center items-center gap-4">
                        <h1
                            className='text-[90px] font-semibold'
                        >
                            PRADA
                        </h1>
                        <p className='text-center text-[30px] font-semibold text-[#444]'>Big Fashion Festival <br />50% - 80% off</p>
                        <button
                            className='w-[10rem] h-[2rem] border border-black border-solid duration-300 ease hover:bg-[#111] hover:text-white'
                        >
                            Explore
                        </button>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Hero