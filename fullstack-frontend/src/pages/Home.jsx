import React, {useEffect} from 'react';
import axios from "axios";
import {Link, useParams} from "react-router-dom";

export default function Home() {
    //create object for storing user info
    const [users, setUsers] = React.useState([]);
    useEffect(() => {
        console.log("Loads every time the page loads");
        loadUsers();
    }, []) //makes it run once and puts it into an array

    const {id} = useParams();

    const loadUsers = async () => {
        try {
            const result = await axios.get("http://localhost:8087/api/users");
            setUsers(result.data);
        } catch (error) {
            console.error("There was an error fetching the users!", error);
        }
    }


    const deleteUser = async (id) => {
        await axios.delete(`http://localhost:8087/user/${id}`);
        await loadUsers();
    }


    return (
        <div className={'container'}>
            <div className="py-4">
                <table className="table border shadow">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">username</th>
                        <th scope="col">email</th>
                        <th scope="col">action</th>
                    </tr>
                    </thead>
                    <tbody>

                    {
                        users.map((user, index) => (
                            <tr key={user.id}>
                                <th scope="row">{index + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>
                                    <Link className="btn btn-outline-primary mx-2" to={`/viewuser/${user.id}`}>View</Link>
                                    <Link className="btn btn-outline-secondary mx-2"
                                          to={`/edituser/${user.id}`}>
                                        Edit
                                    </Link>
                                    <button onClick={() => deleteUser(user.id)} className="btn btn-outline-danger mx-2">Delete</button>
                                </td>
                            </tr>
                        ))

                    }

                    </tbody>
                </table>
            </div>

        </div>
    )
}