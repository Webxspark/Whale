import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/userContext';

const Redirect = () => {
    const userContext = useContext(UserContext);

    const { currentUser } = userContext;
    const navigate = useNavigate();

    useEffect(() => {
        if (!currentUser.admin) {
            navigate('/contributors');
        } else {
            navigate('/admin');
        }
    }, [])

    return (
        <div className='w-screen overflow-hidden min-h-screen bg-gradient-to-r from-pink-100 to-violet-100'>
            To the Dashboard 🐳 ......
        </div>
    )
}

export default Redirect