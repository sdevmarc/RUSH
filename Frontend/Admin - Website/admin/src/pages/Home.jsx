import React, { useState } from 'react'
import './css/Home.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import address from '../config'

const Home = () => {
    const navigate = useNavigate()
    const [values, setValues] = useState({
        username: '',
        password: ''
    })

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()

            const { username, password } = values

            if (!username || !password) return alert('Please fill in the required fields!')

            const res = await axios.post(`http://${address}/api/admin/login`, values)

            if (res?.data?.success) {
                alert(res?.data?.message)
                navigate('/dashboard')
            } else {
                alert(res?.data?.message)
            }
        } catch (error) {
            alert(`Error catch login: ${error}`)
        }
    }

    const handleOnChange = (e) => {
        const { name, value } = e.target

        setValues((prev) => ({
            ...prev,
            [name]: value
        }))

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
                                name='username'
                                onChange={handleOnChange}
                                value={values?.username}
                                className='w-full h-[2.8rem] bg-[#EFEFEF] p-[.5rem] rounded-lg text-[.9rem]'
                                type="text"
                                placeholder='Enter your username here...' />
                        </div>
                        <div className="w-full flex flex-col justify-center items-start gap-[.5rem]">
                            <h1 className='text-[.9rem]'>Password</h1>
                            <input
                                name='password'
                                onChange={handleOnChange}
                                value={values?.password}
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