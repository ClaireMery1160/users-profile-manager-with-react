import React, { FunctionComponent, useState, useEffect } from 'react';
import User from '../models/user';
import UserCard from '../components/user-card';
import UserService from '../services/user-service';
import { Link } from 'react-router-dom';
import UserSearch from '../components/user-search';
  
const UserList: FunctionComponent = () => {

   const [users, setUsers] = useState<User[]>([]);
  
  useEffect(() => {
      UserService.getUsers().then(users => setUsers(users));
  }, []);
  
  return (       
    <div className="container"> 

        <div className="row"> 

            <h1 className="center tokyo-title gradient-text">Users index</h1>

            <UserSearch />

            {users.map(user => (
                <UserCard key={user.id} user={user} />
            ))}

            <Link className="btn-floating btn-large waves-effect waves-light purple accent-3 z-depth-3"
            style={{ position:'fixed', bottom:'25px', right:'25px' }}
            to="/users/add"><i className="material-icons">add</i></Link>           

        </div>

    </div>
    
  );
}
  
export default UserList;