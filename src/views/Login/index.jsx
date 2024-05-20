import React from 'react';
import { login } from '../../config/firebase.jsx';
import './style.css';

function Login() {

    const handleAdminLogin = async (e) => {
        e.preventDefault();

        const email = import.meta.env.VITE_APP_AUTH;

        try{
            await login(email, e.target[0].value);
        }catch(err){
            alert(err.message);
        }
    };

    return (
        <div className='login-main-container'>
            <form onSubmit={handleAdminLogin}>
                <h1>Admin login</h1>
                <br />

                <input type="password" placeholder='Password' />
                <br />
                <button type='submit'>Login</button>
            </form>
        </div>
    );
};

export default Login;