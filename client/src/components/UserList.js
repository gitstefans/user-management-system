import axios from 'axios';
import React, { useEffect, useState } from 'react';
import baseUrl from '../config';
import { Pagination } from 'semantic-ui-react';
import './styles/UserList.css';

const UserList = () => {
    const [list, setList] = useState([]);
    const [number, setNumber] = useState(0);
    const [sortFilter, setSortFilter] = useState('');
    const [searchFilter, setSearchFilter] = useState('');
    //const [filterValue, setFilterValue] = useState('get-push-data');
    const [pagination, setPagination] = useState({
        size: 10,
        page: 0,
        totalPages: 0,
        totalElements: 0,
        numberOfElements: 0,
       // hasNext: false,
       // hasPrev: false
    })

    useEffect(() => {
        axios.get(`http://localhost:8080/users`)
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
                console.log('resp', resp.data);
            })
            .catch(e => console.log(e));
        
    }, []);

    useEffect(() => {
        axios.get(`http://localhost:8080/users?page=${number}&sort=${sortFilter}`)
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
                console.log('resp', resp.data);
            })
            .catch(e => console.log(e));
        
    }, [number, sortFilter]);

    const handleChange = (name) => (event) => {
        //setFilterValue(event.target.value);
        console.log('name', name);
        setSortFilter(name);
        setNumber(0);
    }

    function changeCurrentPage(e) {
        e.preventDefault();
        console.log('e', e.target.text);
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

    console.log('value', number);

    return (
        <div className='userList-container'>
            <div className="table-wrapper">
                <div className='header-wrapper'>
                    <div>#</div>
                    <div className='header-item' onClick={handleChange('firstName')}>Firstname</div>
                    <div className='header-item' onClick={handleChange('lastName')}>Lastname</div>
                    <div className='header-item' onClick={handleChange('userName')}>Username</div>
                    <div className='header-item' onClick={handleChange('password')}>Password</div>
                    <div className='header-item' onClick={handleChange('email')}>Email</div>
                    <div className='header-item' onClick={handleChange('status')}>Status</div>
                    <div>Code</div>
                    <div>Description</div>
                    <div>Edit</div>
                    <div>Delete</div>
                    <div>Assign permissions</div>
                </div>
                <div className='body-wrapper'>
                    {!!list && list.map((i, index) => (
                        <div key={index}>
                            <div className='body-item'>
                                <div>{index+1}</div>
                                <div>{i.firstName}</div>
                                <div>{i.lastName}</div>
                                <div>{i.userName}</div>
                                <div>{i.password}</div>
                                <div>{i.email}</div>
                                <div>{i.status}</div>
                                <div>code</div>
                                <div>status</div>
                                <button className='edit-button'>Edit</button>
                                <button className='delete-button'>Delete</button>
                                <button className='assign-permissions'>Assign permissions</button>
                            </div>
                            <hr className="hr"/>
                        </div>
                    ))}
                </div>
            </div>
            <div>
            {/* <select className='filter-dropdown' onChange={handleChange('filterValue')}>
                <option className="filter-option" value="id" defaultValue={'id'}>Default</option>
                <option className="filter-option" value="Firstname">Firstname</option>
                <option className="filter-option" value="Firstname">Lastname</option>
                <option className="filter-option" value="Firstname">Username</option>
                <option className="filter-option" value="Firstname">Email</option>
                <option className="filter-option" value="Firstname">Status</option>
            </select> */}
            <Pagination
                        activePage={number + 1}
                        //activePage={this}
                        boundaryRange={0}
                        //defaultActivePage={1}
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