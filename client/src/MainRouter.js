import { Route, Routes } from 'react-router-dom';
import UserList from "./components/UserList";
import EditUser from "./components/EditUser";
import CreateUser from "./components/CreateUser";
import AssignPermission from './components/AssignPermission';


const MainRouter = () => {
    return (
        <div className="router-container">
            <Routes>
                <Route exact path='/' element={<UserList />} />
                <Route exact path='/create-user' element={<CreateUser />} />
                <Route exact path='/assign-permission/:id' element={<AssignPermission />} />
                <Route exact path='/edit-user/:id' element={<EditUser />} />
            </Routes>
        </div>
    )
}

export default MainRouter;