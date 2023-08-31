import React, { createContext, useContext, useState }from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [ login, setLogin ] = useState(null)
    const [ user, setUser ] = useState(null)
    return (
        <AuthContext.Provider value={{ login, setLogin, user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthProvider,AuthContext };
