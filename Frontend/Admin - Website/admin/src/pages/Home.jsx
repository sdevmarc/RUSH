import React from 'react'
import './css/Home.css'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        navigate('/dashboard')
    }

    return (
        <>
            <div className="w-full h-screen">
                <div className="home flex justify-end items-center px-[5rem]">
                    <form
                        onSubmit={handleSubmit}
                        className='login-form w-[25rem] h-[30rem] rounded-[1.5rem] px-[1rem] flex flex-col justify-center items-center gap-[1rem]'
                    >
                        <h1 className='font-[600] text-[2rem]'>Login</h1>
                        <div className="w-full flex flex-col justify-center items-start gap-[.5rem]">
                            <h1 className='text-[.9rem]'>Username</h1>
                            <input
                                className='w-full h-[2.8rem] bg-[#EFEFEF] p-[.5rem] rounded-lg text-[.9rem]'
                                type="text"
                                placeholder='Enter your username here...' />
                        </div>
                        <div className="w-full flex flex-col justify-center items-start gap-[.5rem]">
                            <h1 className='text-[.9rem]'>Password</h1>
                            <input
                                className='w-full h-[2.8rem] bg-[#EFEFEF] p-[.5rem] rounded-lg text-[.9rem]'
                                type="password"
                                placeholder='Enter your password here...' />
                        </div>
                        <button
                            type='submit'
                            className='w-full h-[2.8rem] rounded-[1rem] bg-[#E1793C] text-white text-[.9rem]'
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Home