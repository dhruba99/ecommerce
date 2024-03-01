import React, { useContext, useState } from 'react';
import '../Login.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Context } from "../../../utils/context";

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();

    const {setLoggedUser} = useContext(Context);

    async function submit(e) {
        e.preventDefault()
        try {
            await axios.post(`http://localhost:5000/signup`, {
                name,
                email,
                password
            }).then(res => {
                if (res.data.status === "fail") {
                    setErrorMsg("User already exists. Please choose a different email.");
                }
                else{
                    setLoggedUser(`${res.data.name}`)
                    navigate("/");
                    alert("User Registered")
                }
            })
        }
        catch {

        }
    }
    return (
        <div className="form-container">
            <div className="inner-form">
                <h2>SignUp</h2>
                <form action="/login" method="post" onSubmit={submit}>
                <div className="form-group">
                        <label for="name">Email:</label>
                        <input type="text" id="email" name="email" placeholder="Email" required
                            onChange={(e) => { setEmail(e.target.value) }} />
                    </div>
                    
                    <div className="form-group">
                        <label for="name" >Name:</label>
                        <input type="text" id="name" name="username" placeholder="Enter your name" required
                            onChange={(e) => { setName(e.target.value) }} />
                    </div>
 
                    <div className="form-group">
                        <label for="name">Password:</label>
                        <input type="password" id="Password" name="password" placeholder="password" required onChange={(e) => { setPassword(e.target.value) }} />
                    </div>
                    <p>{errorMsg}</p>
                    <button type="submit" className="submit-btn">Sign Up</button>
                </form>
                <p>Already have an account? <a onClick={()=>{navigate('/login')}}>Login</a> </p>
            </div>

        </div>
    );
};

export default SignUp;