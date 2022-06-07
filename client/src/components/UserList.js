import axios from 'axios';
import React, { useEffect, useState } from 'react';
import baseUrl from '../config';
import { Link } from 'react-router-dom';
import { Pagination } from 'semantic-ui-react';
import './styles/UserList.css';
import { useNavigate } from "react-router-dom";
import history from '../history';

const UserList = () => {
    const [list, setList] = useState([]);
    const [number, setNumber] = useState(0);
    const [sortFilter, setSortFilter] = useState('');
    const [searchFilter, setSearchFilter] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [dropDown, setDropDown] = useState('');
    const [isFilter, setIsFilter] = useState(false);
    let navigate = useNavigate();
    const [pagination, setPagination] = useState({
        size: 10,
        page: 0,
        totalPages: 0,
        totalElements: 0,
        numberOfElements: 0
    })

    useEffect(() => {
        axios.get(`${baseUrl}/users/all-users`)
            .then((resp) => {
                setList(resp.data.data.map((i, index) => ({
                    id: i.id,
                    firstName: i.firstName,
                    lastName: i.lastName,
                    userName: i.userName,
                    password: i.password,
                    email: i.email,
                    status: i.status,
                    authorities: [...i.authority],
                    code: i.authority.map(x => x.code)
                })));
                setPagination({
                    size: resp.data.paginationDTO.size,
                    page: resp.data.paginationDTO.number,
                    totalPages: resp.data.paginationDTO.totalPages,
                    totalElements: resp.data.paginationDTO.totalElements,
                    numberOfElements: resp.data.paginationDTO.numberOfElements
                })
            })
            .catch(e => console.log(e));
        
    }, []);

    useEffect(() => {
        setErrorMessage('');
        let url;
        
        if(isFilter == false) {
            url = `${baseUrl}/users/all-users?page=${number}&sort=${sortFilter}`;
        } else {
            url = `${baseUrl}/users/filter/${dropDown}?page=${number}&${dropDown}=${searchFilter}`;
        }

        axios.get(url)
            .then(resp => {
                setList(resp.data.data.map((i, index) => ({
                    id: i.id,
                    firstName: i.firstName,
                    lastName: i.lastName,
                    userName: i.userName,
                    password: i.password,
                    email: i.email,
                    status: i.status,
                    authorities: [...i.authority],
                    code: i.authority.map(x => x.code)
                })));
                setPagination({
                    size: resp.data.paginationDTO.size,
                    page: resp.data.paginationDTO.number,
                    totalPages: resp.data.paginationDTO.totalPages,
                    totalElements: resp.data.paginationDTO.totalElements,
                    numberOfElements: resp.data.paginationDTO.numberOfElements
                })
                if(resp.data.data.length === 0) {
                    setErrorMessage('User not found!');
                }
            }).catch(error => console.log(error));
        
        
    }, [number, sortFilter, isFilter]);

    // sortiranje

    const handleChange = (name) => (event) => {
        setSortFilter(name);
        setNumber(0);
    }

    // filter search input

    const handleSearchChange = (event) => {
        setSearchFilter(event.target.value);
    };

    // dropdown

    const handleDropDown = (event) => {
        setDropDown(event.target.value);
    }

    //dropdown form

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setErrorMessage('');
        setIsFilter(true);
        setNumber(0);

        if(!!searchFilter) {
            axios.get(`${baseUrl}/users/filter/${dropDown}?${dropDown}=${searchFilter}`)
            .then(resp => {
                setList(resp.data.data.map((i, index) => ({
                    id: i.id,
                    firstName: i.firstName,
                    lastName: i.lastName,
                    userName: i.userName,
                    password: i.password,
                    email: i.email,
                    status: i.status,
                    authorities: [...i.authority],
                    code: i.authority.map(x => x.code)
                })));
                setPagination({
                    size: resp.data.paginationDTO.size,
                    page: resp.data.paginationDTO.number,
                    totalPages: resp.data.paginationDTO.totalPages,
                    totalElements: resp.data.paginationDTO.totalElements,
                    numberOfElements: resp.data.paginationDTO.numberOfElements
                })
                if(resp.data.data.length === 0) {
                    setErrorMessage('User not found!');
                }
            }).catch(error => console.log(error));
        }
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
        axios.delete(`${baseUrl}/users/delete-user/${id}`)
            .then(resp => {
                navigate(0);
            }).catch(error => console.log(error));
    }

    function resetFilter() {
        setIsFilter(false);
        setSearchFilter('');
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
                                <div>{i.code.length === 0 ? 'no roles' : i.code.toString()}</div>
                                <Link to={`/edit-user/${i.id}`}><button className='edit-button'>Edit</button></Link>
                                <button className='delete-button' onClick={() => { if (window.confirm('Are you sure you want to delete this user?')) handleDelete(i.id) } }>Delete</button>
                                <Link to={`/assign-permission/${i.id}`}><button className='assign-permissions'>Assign permissions</button></Link>
                            </div>
                            <hr className="hr"/>
                        </div>
                    ))}
                </div>
            </div>
            <div className='error-message'>{errorMessage}</div>
            <div className='footer-wrapper'>
                
                <div className='search-filter-container'>
                    <form onSubmit={(e) => handleFormSubmit(e)}>
                        <select className='filter-dropdown' onChange={handleDropDown}>
                            <option className="filter-option" defaultValue={'id'}>Id</option>
                            <option className="filter-option" value="firstName">Firstname</option>
                            <option className="filter-option" value="lastName">Lastname</option>
                            <option className="filter-option" value="userName">Username</option>
                            <option className="filter-option" value="email">Email</option>
                            <option className="filter-option" value="status">Status</option>
                        </select>
                        <input className='search-input' type='text' value={searchFilter} onChange={handleSearchChange} />
                        <button className='search-button'>Search</button>
                    </form>
                    <button className='reset-filter-button' onClick={() => resetFilter()}>Reset filter</button>
                </div>

                {/* <div className='error-message'>{errorMessage}</div> */}

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
                    style={{ margin: 'auto', position: 'absolute', marginTop: '30px'}}
                />
            </div>
        </div>
    )
}

export default UserList;