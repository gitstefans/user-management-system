import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import baseUrl from '../config';
import './styles/EditUser.css';
import { useNavigate } from "react-router-dom";

const EditUser = () => {
    let navigate = useNavigate();
    const params = useParams();
    const [user, setUser] = useState({
        id: null,
        firstName: '',
        lastName: '',
        userName: '',
        email: '',
        status: ''
    });

    useEffect(() => {
        axios.get(`${baseUrl}/users/${params.id}`).then((resp) => {
                setUser({
                  id: resp.data.id,
                  firstName: resp.data.firstName,
                  lastName: resp.data.lastName,
                  userName: resp.data.userName,
                  email: resp.data.email,
                  status: resp.data.status
                });
            }).catch(error => console.log(error));  
    }, []);

    const handleChange = (event) => {
        setUser({ ...user, [event.target.name]: event.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`${baseUrl}/users/edit-user`, user)
            .then((resp) => {
                navigate("/");
            }).catch(error => console.log(error));
        
    }

    return (
        <div className="edit-user-container">
            <div className="edit-user-wrapper">
                <h3 className="edit-user-title">Edit user</h3>
                <form className="edit-user-form" onSubmit={(e) => handleSubmit(e)}>
                    <input className="input-edit" type='text' name='firstName' value={user.firstName} onChange={handleChange} required />
                    <input className="input-edit" type='text' name='lastName' value={user.lastName} onChange={handleChange} required />
                    <input className="input-edit" type='text' name='email' value={user.email} onChange={handleChange} required />
                    <input className="input-edit" type='text' name='status' value={user.status} onChange={handleChange} required />
                    <button className="edit-user-btn">Save</button>
                </form>
            </div>
        </div>
    )
}

export default EditUser;