import { Route, Switch } from 'react-router-dom';
import UserList from "./components/UserList";
import EditUser from "./components/EditUser";
import CreateUser from "./components/CreateUser";
import AssignPermission from './components/AssignPermission';


const MainRouter = () => {
    return (
        <div className="router-container">
            <Switch>
                <Route exact path='/' component={UserList} />
                <Route exact path='/create-user' component={CreateUser} />
                <Route exact path='/assign-permission/:id' component={AssignPermission} />
                <Route exact path='/edit-user/:id' component={EditUser} />
            </Switch>
        </div>
    )
}

export default MainRouter;