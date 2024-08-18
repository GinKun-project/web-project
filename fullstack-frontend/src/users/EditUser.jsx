import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditUser() {
    let navigate = useNavigate();
    const { id } = useParams();

    const [user, setUser] = useState({
        name: "",
        username: "",
        email: ""
    });

    const [error, setError] = useState(null);

    const { name, username, email } = user;

    const onInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        loadUser();
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8087/api/users/${id}`, user);
            navigate("/");
        } catch (error) {
            console.error("Error updating user:", error);
            setError("Failed to update user. Please try again.");
        }
    }

    const loadUser = async () => {
        try {
            const result = await axios.get(`http://localhost:8087/api/users/${id}`);
            setUser(result.data);
        } catch (error) {
            console.error("Error loading user:", error);
            setError("Failed to load user data. Please try again.");
        }
    }

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    return (
        <div className={'container'}>
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p4 mt-2 shadow">
                    <h2 className={"text-center display-5 m-4"}>Edit User</h2>
                    <form onSubmit={onSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className={"form-label"}>Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                placeholder="Enter your name"
                                name="name"
                                value={name}
                                onChange={onInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="username" className={"form-label"}>Username</label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                placeholder="Enter your username"
                                name="username"
                                value={username}
                                onChange={onInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className={"form-label"}>Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                placeholder="Enter your email"
                                name="email"
                                value={email}
                                onChange={onInputChange}
                            />
                        </div>
                        <div className="text-center">
                            <button type="submit" className="btn btn-outline-primary mt-3">Submit</button>
                            <Link to="/" className="btn btn-outline-danger mt-3 mx-2">Cancel</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}