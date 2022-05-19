import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {Redirect} from 'react-router-dom';
import baseUrl from '../config';
import './styles/EditUser.css';

const EditUser = () => {
    const params = useParams();
    const [redirectToReferrer, setRedirectToReferrer] = useState(false);
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
        console.log('user', user);
        axios.put(`${baseUrl}/users/edit-user`, user)
            .then((resp) => {
                setRedirectToReferrer(true);
            }).catch(error => console.log(error));
        
    }

    if (redirectToReferrer) {
        return (<Redirect to='/' />)
    }

    return (
        <div className="edit-user-container">
            <h3>Edit user</h3>
            <form onSubmit={(e) => handleSubmit(e)}>
                <input className="input-edit" type='text' name='firstName' value={user.firstName} onChange={handleChange} required />
                <input className="input-edit" type='text' name='lastName' value={user.lastName} onChange={handleChange} required />
                <input className="input-edit" type='text' name='email' value={user.email} onChange={handleChange} required />
                <input className="input-edit" type='text' name='status' value={user.status} onChange={handleChange} required />
                <button className="edit-user-btn">Save</button>
            </form>
        </div>
    )
}

export default EditUser;