import react, { useState } from 'react';
import axios from 'axios';
import baseUrl from '../config';
import './styles/CreateUser.css';

const CreateUser = () => {
    const [createUser, setCreateUser] = useState({
        firstName: '',
        lastName: '',
        userName: '',
        password: '',
        email: '',
        status: ''
    });

    const handleChange = (event) => {
        setCreateUser({ ...createUser, [event.target.name]: event.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`${baseUrl}/users/add-user`, createUser)
            .then((resp) => {
            }).catch(error => console.log(error));   
    }

    return (
        <div className="create-user-container">
            <h3>Create new user</h3>
            <form onSubmit={(e) => handleSubmit(e)}>
                <input className='input-create' type='text' name='firstName' value={createUser.firstName} onChange={handleChange} placeholder='Firstname' required />
                <input className='input-create' type='text' name='lastName' value={createUser.lastName} onChange={handleChange} placeholder='Lastname' required />
                <input className='input-create' type='text' name='userName' value={createUser.userName} onChange={handleChange} placeholder='Username' required />
                <input className='input-create' type='text' name='password' value={createUser.password} onChange={handleChange} placeholder='Password' required />
                <input className='input-create' type='text' name='email' value={createUser.email} onChange={handleChange} placeholder='Email' required />
                <input className='input-create' type='text' name='status' value={createUser.status} onChange={handleChange} placeholder='Status' required />
                <button className='save-btn'>Save</button>
            </form>
        </div>
    )
}

export default CreateUser;