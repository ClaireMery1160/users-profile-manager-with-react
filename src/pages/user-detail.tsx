import React, { FunctionComponent, useState, useEffect } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import User from '../models/user';
import formatName from '../helpers/format-name';
import formatType from '../helpers/format-type';
import UserService from '../services/user-service'
import Loader from '../components/loader';
  
type Params = { id: string };
  
const UserDetail: FunctionComponent<RouteComponentProps<Params>> = ({ match }) => {
    
  const [user, setUser] = useState<User|null>(null);
  
  useEffect(() => {
    UserService.getUser(+match.params.id).then(user =>setUser(user));
  }, [match.params.id]);
    
  return (
    <div>
      { user ? (
        <div className="row">
          <div className="col s12 m8 offset-m2"> 
            <h2 className="header center play white-font">{ formatName(user.firstname)   } { formatName(user.lastname) }</h2>
            <div className="card hoverable"> 
              <div className="card-image">
                <img src={user.picture} alt={user.lastname} style={{width: '250px', margin: '0 auto'}}/>
                <Link to={`/users/edit/${user.id}`} className = "btn btn-floating halfway-fab waves-effect waves-light"><i className="material-icons">edit</i></Link>
              </div>
              <div className="card-stacked">
                <div className="card-content">
                  <table className="bordered striped">
                    <tbody>
                      <tr> 
                        <td>Prénom</td> 
                        <td>{formatName(user.firstname)}</td> 
                      </tr>
                      <tr> 
                        <td>Nom</td> 
                        <td><strong>{ formatName(user.lastname) }</strong></td> 
                      </tr>
                      <tr> 
                        <td>Département(s)</td> 
                        <td>
                        {user.types.map(type => (
                           <span key={type} className={formatType(type)}>{type}</span>
                        ))}</td> 
                      </tr>  
                    </tbody>
                  </table>
                </div>
                <div className="card-action">
                  <Link to="/">Retour</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="center loader"><Loader/></div>
      )}
    </div>
  );
}
  
export default UserDetail;