import React, { useContext, useState } from 'react';
import './Login.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Context } from '../../utils/context';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();

    const {setLoggedUser} = useContext(Context);

    async function submit(e) {
        e.preventDefault();
        try {
            await axios.post(`http://localhost:5000/login`, {
                email,
                password
            }).then(res=>{
                if(res.data.status!="success"){
                    setErrorMsg(res.data.status);
                }
                else{
                    setLoggedUser(`${res.data.name}`)
                    navigate("/");
                    alert("User Registered")
                }
            })
        }
        catch{

        }
    }

    return (
        <div className="form-container">
            <div className="inner-form">
                <h2>Login</h2>
                <form action="/login" method="post" onSubmit={submit}>
                    <div className="form-group">
                        <label for="name">Email:</label>
                        <input type="text" id="email" name="email" placeholder="Your email"
                            required autocomplete="off" onChange={(e) => { setEmail(e.target.value) }} />
                    </div>
                    <div className="form-group">
                        <label for="name">Password:</label>
                        <input type="password" id="password" name="password" placeholder="password"
                            required onChange={(e) => { setPassword(e.target.value) }} />
                    </div>
                    <p>{errorMsg}</p>
                    <button type="submit" className="submit-btn">Login</button>
                </form>
                <p>Don't have an account? <a onClick={()=>{navigate('/signup')}}>Signup</a> </p>
            </div>

        </div>
    );
};

export default Login;