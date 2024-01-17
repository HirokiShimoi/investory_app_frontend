import { React ,useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from './authcontext';

const useAuth = () => {
    const {login} = useContext(AuthContext)
    const navigate = useNavigate();

    useEffect(() => {
        if (login===false) {
            navigate('/')
        }
    },[login, navigate]);
};

export default useAuth;