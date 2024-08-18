import React, {useEffect} from 'react'
import axios from "axios";
import {Link, useNavigate, useParams} from "react-router-dom";

export default function EditUser() {

    let navigate = useNavigate();

    const {id} = useParams()

    const [user, setUser] = React.useState({
        name: "",
        username: "",
        email: ""
    });


    const {name, username, email} = user;

    const onInputChange = (e) => {
        setUser({... user, [e.target.name]: e.target.value});
    };

    useEffect(() => {
        loadUser();
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();
        console.log(e);
        await axios.put(`http://localhost:8087/user/${id}`, user);
        navigate("/");
    }

    const loadUser = async () => {
        const result = await axios.get(`http://localhost:8087/user/${id}`);
        setUser(result.data);
    }


    return (<div className={'container'}>
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p4 mt-2 shadow">
                    <h2 className={"text-center display-5 m-4"}>Edit User</h2>
                    <form onSubmit={(e) => onSubmit(e)} action="">
                        <div className="mb-3">
                            <label htmlFor={"Name"} className={"form-label"}>
                                Name
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter your name"
                                name="name"
                                value={name}
                                onChange={(e) => onInputChange(e)}
                            />
                            <label htmlFor={"username"} className={"form-label"}>
                                username
                            </label>
                            <input
                                type={"text"}
                                className="form-control"
                                placeholder="Enter your username"
                                name="username"
                                value={username}
                                onChange={(e) => onInputChange(e)}
                            />
                            <label htmlFor={"email"} className={"form-label"}>
                                email
                            </label>
                            <input type={"text"} className={"form-control"} placeholder={"Enter your email"}
                                   name={"email"}
                                   value={email}
                                   onChange={(e) => onInputChange(e)}
                            />

                            <div className="text-center">

                                <button type={"submit"} className={"btn btn-outline-primary mt-3"}>Submit</button>
                                <Link to={"/"} type={"submit"}
                                      className={"btn btn-outline-danger mt-3 mx-2"}>Cancel</Link>

                            </div>
                        </div>


                    </form>

                </div>
            </div>


        </div>

    )
}