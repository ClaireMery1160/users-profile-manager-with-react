import React, { FunctionComponent, useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import UserForm from '../components/user-form';
import User from '../models/user';
import UserService from '../services/user-service';
import formatName from '../helpers/format-name';
import Loader from '../components/loader';
  
type Params = { id: string };
  
const UserEdit: FunctionComponent<RouteComponentProps<Params>> = ({ match }) => {
    
  const [user, setUser] = useState<User|null>(null);
  
  useEffect(() => {
    UserService.getUser(+match.params.id).then(user =>setUser(user));
  }, [match.params.id]);
    
  return (
    <div>
      { user ? (
        <div className="row">
            <h2 className="header center play white-font">
              Éditer le profil de <span> </span>
              { formatName(user.firstname)   } { formatName(user.lastname) }
            </h2>
            <UserForm user={user} isEditForm={true}></UserForm>
        </div>
      ) : (
        <div className="center loader"><Loader/></div>
      )}
    </div>
  );
}
  
export default UserEdit;