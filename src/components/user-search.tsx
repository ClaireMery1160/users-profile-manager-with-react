import React, { FunctionComponent, useState } from 'react';
import { Link } from 'react-router-dom';
import User from '../models/user';
import UserService from '../services/user-service';
import formatName from '../helpers/format-name';
 
const UserSearch: FunctionComponent = () => {
  
  const [term, setTerm] = useState<string>('');
  const [users, setUsers] = useState<User[]>([]);
 
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const term = e.target.value;
    setTerm(term);
 
    if(term.length <= 1) {
      setUsers([]);
      return;
    }
 
    UserService.searchUser(term).then(users => setUsers(users));
  }
  
  return (
    <div className="row"> 
    <div className="col s12 m6 offset-m3"> 
      <div className="card"> 
      <div className="card-content"> 
        <div className="input-field"> 
        <input type="text" placeholder="Rechercher un utilisateur par son nom sans majuscule" value={term} onChange={e => handleInputChange(e)} /> 
        </div> 
        <div className='collection'>
        {users.map((user) => (
          <Link key={user.id} to={`/users/${user.id}`} className="collection-item">
               { formatName(user.firstname)   } { formatName(user.lastname) }
          </Link>
        ))}
        </div> 
      </div> 
      </div> 
    </div> 
    </div>
  );
}
  
export default UserSearch;
