import React, { createContext, useContext, useState, useEffect }from 'react';
import axios from 'axios';
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [ login, setLogin ] = useState(null)
    const [ user, setUser ] = useState(null)

    useEffect(() => {

        const token = localStorage.getItem('token');
        if (token) {
            // トークンを使ってバックエンドに認証リクエストを送る
            axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/verify-token`, { token })
                .then(response => {
                    if (response.data.isValid) {
                        setLogin(true);
                    }
                })
                .catch(error => {
                    console.log(error);
                    localStorage.removeItem('token');
                });
        }
    },[]);

    const loginUser = (token, userInfo) => {
        localStorage.setItem('token', token);
        setLogin(true);
        setUser(userInfo)
    };

    const logout = () => {
        setLogin(false);
        setUser(null);
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ login, setLogin, user, setUser, logout, loginUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthProvider,AuthContext };
