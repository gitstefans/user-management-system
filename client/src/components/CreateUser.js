import react, { useState } from 'react';
import axios from 'axios';
import baseUrl from '../config';
import './styles/CreateUser.css';
import { useNavigate } from "react-router-dom";
import validator from 'validator';

const CreateUser = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [createUser, setCreateUser] = useState({
        firstName: '',
        lastName: '',
        userName: '',
        password: '',
        email: '',
        status: ''
    });
    let navigate = useNavigate();

    const handleChange = (event) => {
        setCreateUser({ ...createUser, [event.target.name]: event.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrorMessage('');

        if(createUser.firstName == null || createUser.firstName.trim() === '' || !createUser.firstName) {
            setErrorMessage('Firstname is required!');
            return;
        }

        if(createUser.lastName == null || createUser.lastName.trim() === '' || !createUser.lastName) {
            setErrorMessage('Lastname is required!');
            return;
        }

        if(createUser.userName == null || createUser.userName.trim() === '' || !createUser.userName) {
            setErrorMessage('Username is required!');
            return;
        }

        if(createUser.password == null || createUser.password.trim() === '' || !createUser.password) {
            setErrorMessage('Password is required!');
            return;
        }

        if(createUser.password.length < 6) {
            setErrorMessage('Password is too short, enter 6 or more characters!');
            return;
        }

        if(createUser.email == null || createUser.email.trim() === '' || !createUser.email) {
            setErrorMessage('Email is required!');
            return;
        }

        if(!validator.isEmail(createUser.email)) {
            setErrorMessage('Enter valid email address!');
            return;
        }

        if(createUser.status == null || createUser.status.trim() === '' || !createUser.status) {
            setErrorMessage('Status is required!');
            return;
        }

        axios.post(`${baseUrl}/users/add-user`, createUser)
            .then((resp) => {
                console.log('resp', resp);
                navigate("/");
            }).catch(error => {
                console.log('er', error.response.data);
                setErrorMessage(error.response.data);
            });   
    }

    return (
        <div className="create-user-container">
            <div className='form-wrapper'>
                <h3 className='title-create'>Create new user</h3>
                <form className='form-wrapper-form' onSubmit={(e) => handleSubmit(e)}>
                    <input className='input-create' type='text' name='firstName' value={createUser.firstName} onChange={handleChange} placeholder='Firstname' />
                    <input className='input-create' type='text' name='lastName' value={createUser.lastName} onChange={handleChange} placeholder='Lastname' />
                    <input className='input-create' type='text' name='userName' value={createUser.userName} onChange={handleChange} placeholder='Username' />
                    <input className='input-create' type='text' name='password' value={createUser.password} onChange={handleChange} placeholder='Password' />
                    <input className='input-create' type='text' name='email' value={createUser.email} onChange={handleChange} placeholder='Email' />
                    <input className='input-create' type='text' name='status' value={createUser.status} onChange={handleChange} placeholder='Status' />
                    <button className='save-btn'>Save</button>
                </form>
                <div className='error-message'>{errorMessage}</div>
            </div>
            
        </div>
    )
}

export default CreateUser;