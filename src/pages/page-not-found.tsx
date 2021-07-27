import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';
  
const PageNotFound: FunctionComponent = () => {
  
  return (
    <div className="center">
      <h1 className="white-font play">Page non trouvée!</h1> 
      <Link to="/" className="waves-effect waves-teal btn-flat white-font play">
         Retourner à l'accueil 
      </Link>
    </div>
  );
}
  
export default PageNotFound;