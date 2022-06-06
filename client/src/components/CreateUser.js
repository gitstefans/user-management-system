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

        if(!validator.isEmail(createUser.email)) {
            setErrorMessage('Enter valid email address!');
            return;
        }

        if(createUser.password.length < 6) {
            setErrorMessage('Password is too short, enter 6 or more characters!');
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
                    <input className='input-create' type='text' name='firstName' value={createUser.firstName} onChange={handleChange} placeholder='Firstname' required />
                    <input className='input-create' type='text' name='lastName' value={createUser.lastName} onChange={handleChange} placeholder='Lastname' required />
                    <input className='input-create' type='text' name='userName' value={createUser.userName} onChange={handleChange} placeholder='Username' required />
                    <input className='input-create' type='text' name='password' value={createUser.password} onChange={handleChange} placeholder='Password' required />
                    <input className='input-create' type='text' name='email' value={createUser.email} onChange={handleChange} placeholder='Email' required />
                    <input className='input-create' type='text' name='status' value={createUser.status} onChange={handleChange} placeholder='Status' required />
                    <button className='save-btn'>Save</button>
                </form>
                <div className='error-message'>{errorMessage}</div>
            </div>
            
        </div>
    )
}

export default CreateUser;