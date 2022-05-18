import { Switch, Route } from "react-router-dom";
import UserList from "./components/UserList";


const MainRouter = () => {
    return (
        <div>
            <Switch>
                <Route exact path='/' component={UserList} />
            </Switch>
        </div>
    )
}

export default MainRouter;