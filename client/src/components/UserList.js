import axios from 'axios';
import React, { useEffect, useState } from 'react';
import baseUrl from '../config';
import { Link } from 'react-router-dom';
import { Pagination } from 'semantic-ui-react';
import history from '../history';
import './styles/UserList.css';
import {Redirect} from 'react-router-dom';

const UserList = () => {
    const [list, setList] = useState([]);
    const [number, setNumber] = useState(0);
    const [sortFilter, setSortFilter] = useState('');
    const [searchFilter, setSearchFilter] = useState('');
    const [pagination, setPagination] = useState({
        size: 10,
        page: 0,
        totalPages: 0,
        totalElements: 0,
        numberOfElements: 0
    })

    useEffect(() => {
        axios.get(`${baseUrl}/users`)
            .then((resp) => {
                setList(resp.data.content.map((i, index) => ({
                    id: i.id,
                    firstName: i.firstName,
                    lastName: i.lastName,
                    userName: i.userName,
                    password: i.password,
                    email: i.email,
                    status: i.status,
                    code: i.code,
                    description: i.description
                })));
                setPagination({
                    size: resp.data.size,
                    page: resp.data.number,
                    totalPages: resp.data.totalPages,
                    totalElements: resp.data.totalElements,
                    numberOfElements: resp.data.numberOfElements
                })
            })
            .catch(e => console.log(e));
        
    }, []);

    useEffect(() => {
        axios.get(`${baseUrl}/users?page=${number}&sort=${sortFilter}`)
            .then((resp) => {
                setList(resp.data.content.map((i, index) => ({
                    id: i.id,
                    firstName: i.firstName,
                    lastName: i.lastName,
                    userName: i.userName,
                    password: i.password,
                    email: i.email,
                    status: i.status,
                    code: i.code,
                    description: i.description
                })));
                setPagination({
                    size: resp.data.size,
                    page: resp.data.number,
                    totalPages: resp.data.totalPages,
                    totalElements: resp.data.totalElements,
                    numberOfElements: resp.data.numberOfElements
                })
            })
            .catch(e => console.log(e));
        
    }, [number, sortFilter]);

    const handleChange = (name) => (event) => {
        setSortFilter(name);
        setNumber(0);
    }

    const handleSearchChange = (name) => (event) => {
    };

    function changeCurrentPage(e) {
        e.preventDefault();
        if(e.target.text === '⟨') {
            if(number <= 0) {
                return;
            }
            setNumber(number -1);
        } else if(e.target.text === '⟩') {
            setNumber(number + 1);
        } else {

            // Pageable starts with 0
            let x = parseInt(e.target.text);
            setNumber(x-1);
        }
    }

    function handleDelete(id) {
        axios.delete(`http://localhost:8080/users/delete-user/${id}`)
            .then(resp => {
                history.push('/');
            }).catch(error => console.log(error));
    }


    return (
        <div className='userList-container'>
            <div className="table-wrapper">
                <div className='header-wrapper'>
                    <div className='header-item' onClick={handleChange('id')}>ID</div>
                    <div className='header-item' onClick={handleChange('firstName')}>Firstname</div>
                    <div className='header-item' onClick={handleChange('lastName')}>Lastname</div>
                    <div className='header-item' onClick={handleChange('userName')}>Username</div>
                    <div className='header-item' onClick={handleChange('password')}>Password</div>
                    <div className='header-item' onClick={handleChange('email')}>Email</div>
                    <div className='header-item' onClick={handleChange('status')}>Status</div>
                    <div>Permissions</div>
                    {/* <div>Description</div> */}
                    {/* <div>Edit</div>
                    <div>Delete</div>
                    <div>Assign permissions</div> */}
                </div>
                <div className='body-wrapper'>
                    {!!list && list.map((i, index) => (
                        <div key={index}>
                            <div className='body-item'>
                                <div>{i.id}</div>
                                <div>{i.firstName}</div>
                                <div>{i.lastName}</div>
                                <div>{i.userName}</div>
                                <div>{i.password}</div>
                                <div>{i.email}</div>
                                <div>{i.status}</div>
                                <div>code</div>
                                <Link to={`/edit-user/${i.id}`}><button className='edit-button'>Edit</button></Link>
                                <button className='delete-button' onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) handleDelete(i.id) } }>Delete</button>
                                <Link to={`/assign-permission/${i.id}`}><button className='assign-permissions'>Assign permissions</button></Link>
                            </div>
                            <hr className="hr"/>
                        </div>
                    ))}
                </div>
            </div>
            <div>
            <div className='search-filter-container'>
                <form>
                    <select className='filter-dropdown'>
                        <option className="filter-option" defaultValue={'id'}>Default</option>
                        <option className="filter-option">Firstname</option>
                        <option className="filter-option">Lastname</option>
                        <option className="filter-option">Username</option>
                        <option className="filter-option">Email</option>
                        <option className="filter-option">Status</option>
                    </select>
                    <input type='text' name='searchFilter' value={searchFilter} onChange={handleSearchChange} required />
                    <button>Search</button>
                </form>
                
            </div>
            <Link to='/create-user'><button className='create-new-user'>Create new user</button></Link>
            <Pagination
                activePage={number + 1}
                boundaryRange={0}
                ellipsisItem={null}
                firstItem={null}
                lastItem={null}
                siblingRange={1}
                totalPages={pagination.totalPages}
                onPageChange={(e) => changeCurrentPage(e)}
                style={{ margin: 'auto', marginTop: '30px'}}
            />
            </div>
        </div>
    )
}

export default UserList;