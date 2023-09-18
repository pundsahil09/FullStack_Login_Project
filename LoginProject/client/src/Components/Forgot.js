import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Forgot() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [Cpassword, setCpassword] = useState("")

    const navigate = useNavigate();

    const sendData = async(e) => {
        e.preventDefault();

        const user = {
            email,password,Cpassword
        }
        // console.log(user);

        let response = await axios.put("http://localhost:5000/forgotPass", user)
        .then(async(response)=>{
            
            console.log(response.data);

            const {message, error} = await response.data; // // destructuring message, error  from response

            if (message) {
                alert(message);
                navigate(("/"));
            }
            else {
                alert(error)

            }

        })
        .catch((err)=>{
            console.log(err.response.data);

            const {error} = err.response.data; // destructuring email from response
            
            alert(error);
        })

        



        // setEmail("");
        // setPassword("");
        // setCpassword("");
    }

    return (
        <>
            <div className="container mt-5 shadow-lg p-5 " style={{ width: '35%', borderRadius: '10px' }} >
                <h2 className="text-center text-success mb-4">Change Password Here</h2>
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
                        <label htmlFor="exampleInputPassword1" className="form-label">Confirm Password :-</label>
                        <input type="password" value={Cpassword} onChange={(e) => { setCpassword(e.target.value) }} name="Cpassword" autoComplete="off" className="form-control"
                            id="exampleInputCPassword1" required />
                    </div>

                    <div className="mb-3">
                        <Link to="/Register" className="text-danger" style={{ textDecoration: 'none' }}>Dont Have account REGISTER</Link>
                    </div>

                    <div className="d-grid">
                        <button type="submit" onClick={sendData} name="submit" className="btn btn-outline-primary">C H A N G E</button>
                    </div>
                </form>

            </div>
        </>
    )
}

export default Forgot