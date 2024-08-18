import React, {useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import axios from "axios";

export default function ViewUser() {
    const [user, setUser] = React.useState({
        name: "",
        username: "",
        email: ""
    });

    const {id} = useParams();

    useEffect(() => {
        loadUser().then(r => console.log(r));
    }, []);

    const loadUser = async () => {
        const result = await axios.get(`http://localhost:8087/user/${id}`);
        setUser(result.data);
    }


    return (
        <div className={'container'}>
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p4 mt-2 shadow">
                    <h2 className="text-center m-4 display-4">
                        User Details
                    </h2>

                    <div className="card">
                        <div className="card-header">
                            Details of User id:
                            <ul className={"list-group list-group-flush"}>
                                <li className={"list-group-item"}>Name: {user.name}</li>
                                <li className={"list-group-item"}>Username: {user.username}</li>
                                <li className={"list-group-item"}>Email: {user.email}</li>
                            </ul>
                        </div>
                    </div>
                    <Link to={"/"} className={"btn btn-primary my-2"}>Back to Home</Link>
                </div>
            </div>


        </div>


    );
}