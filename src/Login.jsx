import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'
function Login() {

    const [formdata, setFormData] = useState({
        email: "",
        password: ""
    })

    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({
            ...formdata,
            [e.target.name]: e.target.value //name: Hassan
        })
    }

    const handleLogin = (e) => {
        e.preventDefault()
        fetch("http://localhost:5000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formdata)
        })
            .then(response => response.json())
            .then(data => {
                if (data.token) {
                    localStorage.setItem("token", data.token)
                    alert("Login Successfull")
                    navigate("/")
                } else {
                    alert(data.message || "Invalid Credentials")
                }
            })
        }
       

    return (
        <div>
            <form onSubmit={handleLogin}>
                <input type="text" name='email' placeholder='Enter your email' value={formdata.email} onChange={handleChange}/>
                <input type="text" name='password' placeholder='Enter your password' value={formdata.password} onChange={handleChange} />
                <button>LogIN</button>
                <p>Don't have an account <Link to='/signup'>SignUp here</Link></p>
            </form>
        </div>
    )
}
export default Login
