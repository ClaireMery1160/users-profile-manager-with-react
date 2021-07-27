import React, { FunctionComponent } from 'react';
import UserList from './pages/user-list';
import UserDetail from './pages/user-detail';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import PageNotFound from './pages/page-not-found';
import UserEdit from './pages/user-edit';
import UserAdd from './pages/user-add';
import Login from './pages/login';
 import PrivateRoute from './PrivateRoute'; 

const App: FunctionComponent = () =>
{                 
    return (
        <Router>
            <div>
                {/* barre de navigation*/}
                <nav>
                    <div className="nav-wrapper">
                        <Link to="/" className="brand-logo left tokyo-title">Users Profile Manager</Link>
                    </div>
                </nav>
                <Switch>
                    <PrivateRoute exact path="/" component = {UserList} />
                    <Route exact path="/login" component = {Login} />
                    <PrivateRoute exact path="/users" component = {UserList} />
                    <PrivateRoute exact path="/users/add" component = {UserAdd} />
                    <PrivateRoute path="/users/edit/:id" component = {UserEdit} />
                    <PrivateRoute exact path="/users/:id" component = {UserDetail} />
                    <Route component = {PageNotFound}/>
                </Switch>
            </div>
        </Router>
    )
}
  
export default App;
