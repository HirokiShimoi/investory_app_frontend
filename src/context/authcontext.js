import React, { createContext, useContext, useState }from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [ login, setLogin ] = useState(null)
    const [ user, setUser ] = useState(null)
    const logout = () => {
        setLogin(false);
        setUser(null);
        localStorage.removeItem('token');
    };
    return (
        <AuthContext.Provider value={{ login, setLogin, user, setUser, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthProvider,AuthContext };
