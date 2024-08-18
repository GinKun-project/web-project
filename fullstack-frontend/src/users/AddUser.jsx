import React from 'react';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function AddUser() {

    let navigate = useNavigate();
    const [user, setUser] = React.useState({
        name: "",
        username: "",
        email: ""
    });

    const { name, username, email } = user;

    const onInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8087/api/users", user);  // Update the endpoint to match your backend
            navigate("/");
        } catch (error) {
            console.error("There was an error creating the user!", error);
        }
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p4 mt-2 shadow">
                    <h2 className="text-center display-5 m-4">Register User</h2>
                    <form onSubmit={onSubmit}>
                        <div className="mb-3">
                            <label htmlFor="Name" className="form-label">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter your name"
                                name="name"
                                value={name}
                                onChange={onInputChange}
                            />
                            <label htmlFor="username" className="form-label">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter your username"
                                name="username"
                                value={username}
                                onChange={onInputChange}
                            />
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Enter your email"
                                name="email"
                                value={email}
                                onChange={onInputChange}
                            />

                            <div className="text-center">
                                <button type="submit" className="btn btn-outline-primary mt-3">Submit</button>
                                <Link to="/" className="btn btn-outline-danger mt-3 mx-2">Cancel</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
