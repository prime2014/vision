import React, { useState } from 'react';
import '../../index.css';
import { loginAPI } from "../../Api/login/login";
import { Link } from "react-router-dom";


const Home = (props) => {
    let [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });



    let handleUsername = event => {
        setCredentials({
            username: event.target.value,
            password: credentials.password
        })
    }

    let handlePassword = event => {
        setCredentials({
            username: credentials.username,
            password: event.target.value
        })
    }

    let submitCredentials = event => {
        event.preventDefault();
        loginAPI.loginService(credentials).then(resp => {
            localStorage.setItem('token', resp.token);
            localStorage.setItem('user', resp.user);
            props.history.push('/home');
        })
    }

    return (
        <div>
            <h1>Welcome to the Home Page</h1>
            <form className="login-form py-2 px-2" onSubmit={submitCredentials}>
                <div className="pb-2">
                    <label>Enter Username*</label>
                    <input className="form-control" onChange={handleUsername} type="text" name="username" value={credentials.username} placeholder="Enter the username" />
                </div>
                <div className="pb-2">
                    <label>Enter password*</label>
                    <input className="form-control" onChange={handlePassword} type="password" name="password" value={credentials.password} placeholder="Enter the password" />
                </div>
                <div>
                    <p>Don't have an account? <Link to="/auth/sign-up">Sign Up</Link></p>
                </div>
                <button className="login-btn">Login</button>
            </form>
        </div>
    );
}

export default Home;
