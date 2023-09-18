import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';


function Login() {

    const [email, setEmail] = useState('')

    const [password, setPassword] = useState('')

    const sendData = async (e) => {
        e.preventDefault();


        const response = await fetch("http://localhost:5000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            }),
        });

        // console.log(await response.json());

        //  const {message, error} = await response.json();
         const {message, error} = await response.json();


        if (message) {
            console.log(message);
            alert(message);
            // console.log("Login Successful...");
            setEmail("");
            setPassword("");
        } else {
            // console.log("Invalid Login...");
            console.log(error);
            alert(error)
        }


    }

    

    return (
        <>
            <div className="container mt-5 shadow-lg p-5 " style={{ width: '35%', borderRadius: '10px' }} >
                <h2 className="text-center text-success mb-3">Login Here</h2>
                <form action="/loginPage" method="post">

                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email Address :-</label>
                        <input type="email" value={email} onChange={(e) => { setEmail(e.target.value) }} name="email" autoComplete="off" className="form-control" id="exampleInputEmail1"
                            aria-describedby="emailHelp" required />
                        <div id="emailHelp" className="form-text text-primary">We'll never share your email with anyone else.</div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password :-</label>
                        <input type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} name="password" autoComplete="off" className="form-control"
                            id="exampleInputPassword1" required />
                    </div>

                    <div className="mb-3">
                        <Link to="/forgot" className="text-danger" style={{ textDecoration: 'none' }}>Forgot Password ?</Link>
                    </div>

                    <div className="mb-3">
                        <Link to="/Register" className="text-danger" style={{ textDecoration: 'none' }}>Dont Have account REGISTER</Link>
                    </div>

                    <div className="d-grid">
                        <button type="submit" onClick={sendData} name="submit" className="btn btn-outline-primary">L O G I N</button>
                    </div>
                </form>

            </div>
        </>
    )
}

export default Login