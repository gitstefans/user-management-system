import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import './styles/AssignPermission.css';

const AssignPermission = () => {
    const params = useParams();
    const [user, setUser] = useState({
        id: '',
        firstName: '',
        lastName: '',
        userName: '',
        password: '',
        email: '',
        status: '',
        authority: []
    });
    const [roles, setRoles] = useState([]);
    

    useEffect(() => {
        axios.get(`http://localhost:8080/users/${params.id}`).then((resp) => {
            setUser({
                id: resp.data.id,
                firstName: resp.data.firstName,
                lastName: resp.data.lastName,
                userName: resp.data.userName,
                password: resp.data.password,
                email: resp.data.email,
                status: resp.data.status
            });
            }).catch(error => console.log(error));  

        axios.get('http://localhost:8080/users/authorities')
            .then((resp) => {
                setRoles(resp.data.content.map((i, index) => ({
                    id: i.id,
                    code: i.code,
                    description: i.description
                })))
            }).catch(error => console.log(error));
    }, []);

    function submitForm(e) {
        e.preventDefault();
        const checkedBoxes = document.getElementsByName('check-permission');
        let array = [];

        for(let i = 0; i < checkedBoxes.length; i++) {
            if(checkedBoxes[i].checked === true)  {
                console.log(checkedBoxes[i].value);
                switch(i) {
                    case 0:
                        array.push({id: i+1, code: i+1, description: 'Read a file'});
                        break;
                    case 1:
                        array.push({id: i+1, code: i+1, description: ' Write or modify a file'});
                        break;
                    case 2:
                        array.push({id: i+1, code: i+1, description: 'Delete a file'});
                        break;
                    case 3:
                        array.push({id: i+1, code: i+1, description: 'Create a file'});
                        break;
                    default:
                        break;
                }
            }
        }
        setUser({ ...user, authority: [...array] });
    }

    useEffect(() => {
           axios.post('http://localhost:8080/users/add-authorities', user)
            .then((resp) => {
                console.log('ok');
            }).catch(error => console.log(error)); 
    }, [user.authority]);

    return (
        <div className="permissions-container">
            <div className="user-details-wrapper">
                <h3>User Details</h3>
                {!!user && <div className="user-details">
                    <div>Firstname: {user.firstName}</div>
                    <div>Lastname {user.lastName}</div>
                    <div>Username {user.userName}</div>
                    <div>Password: {user.password}</div>
                    <div>Email: {user.email}</div>
                    <div>Status: {user.status}</div>
                </div>}
            </div>
            <div className="permissions">
                <h3 className="perm-title">Permissions</h3>
                
                <form className="permission-form" onSubmit={(e) => submitForm(e)}>
                    {!!roles && roles.map((i, index) => (
                        <div className="perm-item" key={index+10000}>
                            <input type='checkbox' name='check-permission' value={i.id} />
                            <div className="">Id: {i.id}</div>
                            <div>Code: {i.code}</div>
                            <div>Description: {i.description}</div>
                        </div>
                    ))}
                    <button className='add-permissions'>+ Add Permissions</button>
                </form>
            </div>
            
            
            
        </div>
    )
}

export default AssignPermission;