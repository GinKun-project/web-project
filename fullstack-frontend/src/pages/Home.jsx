import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";

export default function Home() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        try {
            const result = await axios.get("http://localhost:8087/api/users");
            setUsers(result.data);
            setError(null);
        } catch (error) {
            console.error("There was an error fetching the users!", error);
            setError("Failed to load users. Please try again later.");
        }
    };

    const deleteUser = async (id) => {
        try {
            await axios.delete(`http://localhost:8087/api/users/${id}`);
            await loadUsers();
        } catch (error) {
            console.error("Error deleting user:", error);
            setError("Failed to delete user. Please try again later.");
        }
    };

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    return (
        <div className={'container'}>
            <div className="py-4">
                <table className="table border shadow">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Username</th>
                        <th scope="col">Email</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user, index) => (
                        <tr key={user.id}>
                            <th scope="row">{index + 1}</th>
                            <td>{user.name}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>
                                <Link className="btn btn-outline-primary mx-2" to={`/viewuser/${user.id}`}>View</Link>
                                <Link className="btn btn-outline-secondary mx-2" to={`/edituser/${user.id}`}>Edit</Link>
                                <button onClick={() => deleteUser(user.id)} className="btn btn-outline-danger mx-2">Delete</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}