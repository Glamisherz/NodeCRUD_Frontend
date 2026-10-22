import React from 'react'
import { useState, useEffect } from 'react'

const APP_URL = "http://localhost:5000"


function StudentManagement() {

    const [students, setStudents] = useState([])
    const [fromdata, setFormData] = useState({
        name: "",
        email: "",
        course: ""
    })

    const [editId, setEditId] = useState(null)
    const [file, setFile] = useState(null) //to handle the file


    //tO READ THE STUDENT DATA
    const token = localStorage.getItem("token")
    const getstudent = () => {
        fetch(`${APP_URL}/student`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(data => {
                setStudents(data)

            })
    };

    useEffect(() => {
        getstudent()
    }, [])


    const handleSubmit = (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token")

        const formdatatosend = new FormData();
        formdatatosend.append("name", fromdata.name)
        formdatatosend.append("email", fromdata.email)
        formdatatosend.append("course", fromdata.course)

        if (file) {
            formdatatosend.append("file", file)
        }

        if (editId === null) {
            //Post Data = Add Student
            fetch(`${APP_URL}/student`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                method: "POST",
                body: formdatatosend
            })
                .then(response => response.json())
                .then(data => {
                    setStudents([...students, data])
                    resetForm(e)
                }
                )
        }

        else {
            //Put Data = Edit Student Data
            fetch(`${APP_URL}/student/${editId}`, {
                headers: {
                    Authorization: Bearer`${token}`
                },
                method: "PUT",
                body: formdatatosend
            })
                .then(response => response.json())
                .then(data => {
                    setStudents(
                        students.map(student => student._id === editId ? data : student)
                    )
                    resetForm(e)
                    setEditId(null)
                })
        }

    }

    const hanldeChange = (e) => {
        setFormData({
            ...fromdata,                    // ... spread operator
            [e.target.name]: e.target.value // name: Hassan, email: hassan@gmail.com
        })
    }

    const handlefilesubmit = (e) => {
        setFile(e.target.files[0])
    }

    //helper function
    const resetForm = (e) => {
        setFormData({
            name: "",
            email: "",
            course: ""
        })
        setFile(null)
        e.target.reset()
    }

    const handleDelete = (id) => {

        const deleteStudent = confirm("Are you sure you want to delete the student data?")

        if (!deleteStudent) {
            return
        }
        const token = localStorage.getItem("token")
        fetch(`${APP_URL}/student/${id}`, {
            headers: {
                Authorization: Bearer`${token}`
            },
            method: "DELETE"
        })
            .then(response => response.json())
            .then(data => {
                setStudents(students.filter(student => student._id !== id))
            })
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input type="text" name='name' value={fromdata.name} placeholder='Enter your name' onChange={hanldeChange} required/>
                <input type="text" name='email' value={fromdata.email} placeholder='Enter your email' onChange={hanldeChange} required/>
                <input type="text" name='course' value={fromdata.course} placeholder='Enter your course' onChange={hanldeChange} required/>
                <input type="file" name='file' onChange={handlefilesubmit} />
                <button type='submit'>Add Student</button>
            </form>

            <h1>Student Management System</h1>
            {
                students.map(student => (
                    <div key={student._id}>
                        <p>{student.name}</p>
                        <p>{student.email}</p>
                        <p>{student.course}</p>
                        <button onClick={() => {
                            setEditId(student._id)
                            setFormData({
                                name: student.name,
                                email: student.email,
                                course: student.course
                            })
                        }}>Edit</button>
                        <button onClick={() => handleDelete(student._id)}>Delete</button>
                    </div>
                ))
            }
        </>
    )
}

export default StudentManagement
