import React, { useContext } from 'react'
import { useNavigate } from 'react-router';
import { AuthContext } from '../context/authcontext'
import kagimoto from '../image/kagimoto.png'

function Header() {
    const { login, setLogin, user, setUser} = useContext(AuthContext);
    const navigate = useNavigate();

    const login_btn = (e) => {
        e.preventDefault();
        navigate("/")
    }

    const logout_btn = (event) => {
        if(window.confirm('ログアウトしますか？')) {
            setLogin(false);
            setUser?.(null);
            localStorage.removeItem('token')
        }
    };
    return (
        <header className='other-header'>
            <nav>
                <div className='container-fluid d-flex justify-content-between'>
                    <img src={kagimoto} alt="logo" width="250" className="d-inline-block align-text-top other-header-logo"/>
                </div>
                <div>
                    <span>ユーザー名: {user ? user.user : 'Loading...'}</span>
                    {login ?(
                        <button className="btn btn-primary m-2 edit-button" onClick={logout_btn}>ログアウト</button>
                    ) : (
                        <button className="btn btn-primary m-2 edit-button" onClick={login_btn}>ログイン</button>
                    )}    
                </div>
            </nav>
        </header>
    )
}

export default Header