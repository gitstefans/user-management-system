import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import baseUrl from '../config';
import './styles/EditUser.css';
import { useNavigate } from "react-router-dom";
import validator from 'validator';

const EditUser = () => {
    let navigate = useNavigate();
    const params = useParams();
    const [errorMessage, setErrorMessage] = useState('');
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
        setErrorMessage('');

        if(user.firstName == null || user.firstName.trim() === '' || !user.firstName) {
            setErrorMessage('Firstname is required!');
            return;
        }

        if(user.lastName == null || user.lastName.trim() === '' || !user.lastName) {
            setErrorMessage('Lastname is required!');
            return;
        }

        if(user.email == null || user.email.trim() === '' || !user.email) {
            setErrorMessage('Email is required!');
            return;
        }

        if(!validator.isEmail(user.email)) {
            setErrorMessage('Enter valid email address!');
            return;
        }

        if(user.status == null || user.status.trim() === '' || !user.status) {
            setErrorMessage('Status is required!');
            return;
        }

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
                    <input className="input-edit" type='text' name='firstName' value={user.firstName} onChange={handleChange} />
                    <input className="input-edit" type='text' name='lastName' value={user.lastName} onChange={handleChange} />
                    <input className="input-edit" type='text' name='email' value={user.email} onChange={handleChange} />
                    <input className="input-edit" type='text' name='status' value={user.status} onChange={handleChange} />
                    <button className="edit-user-btn">Save</button>
                </form>
                <div className='error-message'>{errorMessage}</div>
            </div>
        </div>
    )
}

export default EditUser;