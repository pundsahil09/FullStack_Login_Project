"use client";
import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'


function Register() {

    const [user, setuser] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        Cpassword: ""
    });

    let name, value;
    const handlechange = (e) => {
        name = e.target.name;
        value = e.target.value;

        setuser({
            ...user,
            [name]: value
        })

    };

    // const sendData = async (e) => {
    //     e.preventDefault();

    //     const { username, email, phone, password, Cpassword } = user;


    //     const result = await fetch("http://localhost:5000/register", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify({
    //             username,
    //             email,
    //             phone,
    //             password,
    //             Cpassword,
    //         }),
    //     });

    //     const data = await result.json();

    //     if (data) {
    //         console.log("Registration Successful...");
    //     } else {
    //         console.log("Error While Saving Data..");
    //     }


    // }

    const sendData = async (e) => {
        e.preventDefault(e);

        console.log(user);

        try {
            const response = await axios.post("http://localhost:5000/register", user)



            const { message, error } = await response.data;

            if (message) {
                console.log(message);
                alert(message);
                setuser({
                    name: "",
                    email: "",
                    phone: "",
                    password: "",
                    Cpassword: ""
                })
            }
            else {
                console.log(error);
            }

        } catch (error) {
            console.log(error.response.data);
            alert(error.response.data);
        }




    }

    return (
        <>
            <div className="container mt-5 shadow-lg p-5 mb-1 " style={{ width: '35%', borderRadius: '10px' }} >
                <h2 className="text-center text-success mb-3">REGISTRATION FORM</h2>
                <form action="" method="POST">
                    <div className="mb-3">
                        <label htmlFor="unm" className="form-label">User Name :-</label>
                        <input type="text" name="name" value={user.name} onChange={handlechange} autoComplete="off" className="form-control" id="userName" aria-describedby=""
                            required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email Address :-</label>
                        <input type="email" name="email" value={user.email} onChange={handlechange} autoComplete="off" className="form-control" id="exampleInputEmail1"
                            aria-describedby="emailHelp" required />
                        <div id="emailHelp" className="form-text text-primary">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPhone1" className="form-label">Phone Number :-</label>
                        <input type="number" name="phone" value={user.phone} onChange={handlechange} autoComplete="off" className="form-control" id="exampleInputPhone1"
                            aria-describedby="phoneHelp" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password :-</label>
                        <input type="password" name="password" value={user.password} onChange={handlechange} autoComplete="off" className="form-control" id="exampleInputPassword1"
                            required />
                    </div>
                    <div className="mb-1">
                        <label htmlFor="exampleInputPassword1" className="form-label">Confirm Password :-</label>
                        <input type="password" name="Cpassword" value={user.Cpassword} onChange={handlechange} autoComplete="off" className="form-control" id="exampleInputCPassword1"
                            required />
                    </div>
                    <div className="mb-3">
                        <Link to="/" className="text-danger" style={{ textDecoration: "none" }}>Already Have account LOGIN</Link>
                    </div>

                    <div className="d-grid gap-2">
                        <button type="submit" onClick={sendData} className="btn btn-outline-primary">S U B M I T</button>
                    </div>
                </form>

            </div>
        </>
    )
}

export default Register