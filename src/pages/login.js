import React, { ReactNode, useContext, useEffect,useState } from 'react';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import '../css/style.css';
import axios from 'axios';


function Login() {
    const {register, handleSubmit, formState: { errors }} = useForm();
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();

    const onSubmit = (data) => {
        axios.post('test_endpoint',data)
        .then(response => {
            if(setUser) {
                setUser(response.data);
                setLoggin(true)
                localStorage.setItem('token', response.data.token);
                navigate("/admin")
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