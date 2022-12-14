import React, { useState, useEffect } from 'react'
import FooterSection from '../../Layout/Footer/FooterSection'
import NavBAr from '../../Layout/header/header'

const Service = () => {
    const [users, setUsers] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    const fetchData = () => {
        try {
            setIsLoading(true)
            fetch("https://jsonplaceholder.typicode.com/users")
                .then(response => {
                    return response.json()
                })
                .then(data => {
                    setIsLoading(false)
                    setUsers(data)
                })
            
        } catch (error) {
            
            setError(error)
        }
    }

    useEffect(() => {
        try {

            fetchData()
        } catch (error) {
            setError(error)
        }
    }, [])

    return (
        <>
            <NavBAr />
            <div className='my-10 text-center'>
                <h2 className=' text-5xl font-bold'>Our users</h2>
                <div className=''>
                    <div className='flex items-center justify-center'>
                        {isLoading && <p className='rounded-[100%] w-[200px] flex items-center justify-center h-[200px] bg-green-500 text-white text-3xl'>Loading...</p>}
                    </div>

                    {error ? <p>{error}</p> : users.length > 0 && (
                        <ul className='w-full grid md:grid-cols-3 gap-3 px-3'>
                            {users.map(user => (
                                <div className='bg-zinc-300 my-4 p-4 rounded-lg text-left' key={user.id}>

                                    <p>Names: {user.name}</p>
                                    <p>Username: {user.username}</p>
                                    <p>Email: {user.email}</p>
                                    <p>Phone Number: {user.phone}</p>
                                    <p>Website: {user.website}</p>
                                    <p>Company:
                                        <li>
                                            <p className='px-0'>{user.company.name}</p>
                                            <p className='px-0'>{user.company.catchPhrase}</p>
                                            <p className='px-0'>{user.company.bs}</p>
                                        </li>
                                    </p>
                                    <p>Address:
                                        <li>
                                            <p className='px-0'>Street: {user.address.street}</p>
                                            <p className='px-0'>City: {user.address.city}</p>
                                            <p className='px-0'>suite {user.address.suite}</p>
                                        </li>
                                    </p>

                                </div>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
            <FooterSection />
        </>
    )
}

export default Service