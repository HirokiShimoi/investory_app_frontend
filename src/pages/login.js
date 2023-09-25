import React, { ReactNode, useContext, useEffect,useState } from 'react';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../context/authcontext';
import '../css/style.css';
import axios from 'axios';


function Login() {
    const {register, handleSubmit, formState: { errors }} = useForm();
    const [errorMessage, setErrorMessage] = useState(null);
    const { login, setLogin ,user ,setUser } = useContext(AuthContext)

    const onSubmit = (data) => {
        axios.post('http://127.0.0.1:8000/api/user_login/',data)
        .then(response => {
            if(setUser) {
                setUser(response.data);
                setLogin(true)
                localStorage.setItem('token', response.data.token);
            }
        })
        .catch(error => {
            if(error.response) {
                setErrorMessage(error.response.data.error);
            } else {
                setErrorMessage(error.message);
            }
        });
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
                        <button type='submit'>送信する</button>                    
                </form>
                </div>
            </div>
        </div>
    )
}

export default Login