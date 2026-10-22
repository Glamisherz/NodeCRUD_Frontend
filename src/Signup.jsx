import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

function Signup() {

    const [formdata, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        setFormData({
            ...formdata,
            [e.target.name]: e.target.value //name: Hassan
        })
    }
    const handleSuginUP = (e) => {
        fetch("http://localhost:5000/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formdata)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
            })
    }
    return (
        <div>
            <h1>Sign UP</h1>
            <form onSubmit={handleSuginUP}>
                <input type="text" name='name' placeholder='Enter your name' value={formdata.name} onChange={handleChange} />
                <input type="text" name='email' placeholder='Enter your email' value={formdata.email} onChange={handleChange} />
                <input type="text" name='password' placeholder='Enter your password' value={formdata.password} onChange={handleChange} />
                <button>SignUP</button>
                <p>Already have an account? <Link to="/login">LogIn here</Link></p>
            </form>
        </div>
    )
}

export default Signup
