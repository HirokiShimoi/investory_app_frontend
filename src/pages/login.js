import React, { ReactNode, useContext, useEffect,useState } from 'react';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../context/authcontext';
import '../css/style.css';
import axios from 'axios';
import Alert from '@mui/material/Alert';


function Login() {
    const {register, handleSubmit, formState: { errors }} = useForm();
    const [errorMessage, setErrorMessage] = useState(null);
    const { login, setLogin ,user ,setUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data) => {
        setLoading(true)
            try {
                const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/user_login/`, data);
                if (response.data.status === 'success') {
                    setUser(response.data);
                    setLogin(true);
                    localStorage.setItem('token', response.data.token);
                    navigate('/admin');
                } else {
                    if(response.data.message === "Invalid credentials") {
                        setErrorMessage("名前かパスワードに間違いがあります")
                    } else {
                        setErrorMessage(response.data.message)
                    }
                }
    
            } catch (error) {
                setErrorMessage("通信エラーが発生しました");
            } finally {
                setLoading(false);
            }
    }

    return (
        <div>
            <div className='form-body'>
                <div className='form-container'>
                <h1>酒やの鍵本スタッフ専用</h1>
                <h1>LOGIN FORM</h1>
                <form onSubmit={handleSubmit(onSubmit)}> 

                        <label htmlFor='name'>名前</label>
                        <input id='name' type='text' {...register("username", { required: "名前は必ず入れてください"})} />
                        {errors.username && errors.username.message && <p>{errors.username.message}</p>}                    
                        <label htmlFor='password'>パスワード</label>
                        <input id='password' type='password' {...register("password", { required: "パスワードは必ず入れてください"})}  />
                        {errors.password && errors.password.message && <p>{errors.password.message}</p>}
                        <button type='submit' disabled={loading}>{loading ? '読み込み中...' : '送信する'}</button>                 
                </form>
                {errorMessage && <Alert severity="error" className="error-message">{errorMessage}</Alert>}
                </div>
            </div>
        </div>
    )
}

export default Login