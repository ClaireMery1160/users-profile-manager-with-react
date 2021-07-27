import React, { FunctionComponent, useState } from 'react';
import User from '../models/user';
import formatType from '../helpers/format-type';
import formatName from '../helpers/format-name';
import { useHistory } from 'react-router-dom';  
import UserService from '../services/user-service';

type Props = {
  user: User,
  isEditForm: boolean
};

type Field = {
    value?: any,
    error?: string,
    isValid?: boolean
};

type Form = {
    picture: Field,
    firstname: Field,
    lastname: Field,
    types: Field
};
  
const UserForm: FunctionComponent<Props> = ({user, isEditForm}) => {

    const[form, setForm] = useState<Form>({
        picture: {value: user.picture, isValid: true},
        firstname: {value: user.firstname, isValid: true},
        lastname: {value: user.lastname, isValid: true},
        types: {value: user.types, isValid: true}
    });
  
    const types: string[] = ['Direction', 'IT', 'Sales', 'Production', 'Administration'];

    const hasType = (type: string): boolean => {
        return form.types.value.includes(type);
    }

    const history = useHistory();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>):void => {
        const fieldName: string = e.target.name;
        const fieldValue: string = e.target.value;
        const newField: Field = { [fieldName]: { value: fieldValue } };

        setForm( {...form, ...newField} );
    }

    const selectType = (type: string, e: React.ChangeEvent<HTMLInputElement>): void => {
        const checked = e.target.checked;
        let newField: Field;

        if(checked){
            const newTypes: string[] = form.types.value.concat([type]);
            newField = { value: newTypes };
        }else{
            const newTypes: string[] = form.types.value.filter((currentType: string) => currentType !== type);
            newField = {value: newTypes };
        }

        setForm({...form, ...{ types: newField }});
    }

    const isAddForm = () => {
      return !isEditForm;
    }
    
    const validateForm = () => {
      let newForm: Form = form;


      // profile picture validation rule
      if(isAddForm()){
        const start = "https://randomuser.me/";
        const end = ".jpg";

        if(!form.picture.value.startsWith(start) || !form.picture.value.endsWith(end)){
          const errorMsg: string = "L'url n'est pas valide";
          const newField: Field = {value: form.picture.value, error: errorMsg, isValid: false};
          newForm = { ...form, ...{ picture: newField } };
        }else {
          const newField: Field = {value: form.picture.value, error: '', isValid: true};
          newForm = { ...form, ...{ picture: newField } };
        }
      }
      
      // firstname validation rule
      if(!/^[a-zA-Zàéèêëüç-]{1,30}$/.test(form.firstname.value)) {
        const errorMsg: string = ' Le prénom de l\'utilisateur est requis et doit faire max 30 caractères.';
        const newField: Field = { value: form.firstname.value, error: errorMsg, isValid: false };
        newForm = { ...newForm, ...{ firstname: newField } };
      } else {
        const newField: Field = { value: form.firstname.value, error: '', isValid: true };
        newForm = { ...newForm, ...{ firstname: newField } };
      }

      // lastname validation rule
      if(!/^[a-zA-Zàéèêëüç-]{1,30}$/.test(form.lastname.value)) {
        const errorMsg: string = ' Le nom de l\'utilisateur est requis et doit faire max 30 caractères.';
        const newField: Field = { value: form.lastname.value, error: errorMsg, isValid: false };
        newForm = { ...newForm, ...{ lastname: newField } };
      } else {
        const newField: Field = { value: form.firstname.value, error: '', isValid: true };
        newForm = { ...newForm, ...{ lastname: newField } };
      }
    
      setForm(newForm);
      return newForm.firstname.isValid && newForm.lastname.isValid;
    }

    const isTypesValid = (type: string): boolean => {

      if (form.types.value.length === 1 && hasType(type)) {
        return false;
      }

      if (form.types.value.length >= 3 && !hasType(type)) { 
        return false; 
      } 

      return true;
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) =>{
      e.preventDefault();
      // console.log(form);
      const isFormValid = validateForm();
      if (isFormValid) { 
        user.picture = form.picture.value;
        user.firstname = form.firstname.value;
        user.lastname = form.lastname.value;
        user.types = form.types.value;

        isEditForm ? updateUser() : addUser();
        
      }      
    }

    const addUser = () => {
      UserService.addUser(user).then(() => history.push('/users'));
    }

    const updateUser = () =>{
      UserService.updateUser(user).then(()=> history.push(`/users/${user.id}`));
    }

    const deleteUser = () => {
      UserService.deleteUser(user).then(() => history.push(`/users`));
    }


  return (
    <form onSubmit={ e => handleSubmit(e)}>

        <div className="row">

            <div className="col s12 m8 offset-m2">

                <div className="card hoverable"> 

                    {isEditForm && ( 
                    <div className="card-image">
                      <img src={user.picture} alt={user.lastname} style={{width: '250px', margin: '0 auto'}}/>
                      <span className="btn-floating halfway-fab waves-effect wave-light"><i onClick={deleteUser} className="material-icons">delete</i></span>
                    </div>
                    )}

                    <div className="card-stacked">

                        <div className="card-content">

                          {/* picture */}
                          {isAddForm() && (
                          <div className="form-group">               
                            <label htmlFor="">Photo de profil</label>
                            <input id="picture" name="picture" type="text" className="form-control" value={ form.picture.value } onChange={e => handleInputChange(e)}></input>
                            {form.picture.error && <div className="card-panel red accent-1"><i className="material-icons text-red">error</i>{form.picture.error}</div>}
                          </div>
                          )}

                          {/* firstname */}
                          <div className="form-group">               
                            <label htmlFor="">Prénom</label>
                            <input id="firstname" name="firstname" type="text" className="form-control" value={ formatName(form.firstname.value) } onChange={e => handleInputChange(e)}></input>
                            {form.firstname.error && <div className="card-panel red accent-1"><i className="material-icons text-red">error</i>{form.firstname.error}</div>}
                          </div>

                          {/*  lastname */}
                          <div className="form-group">
                            <label htmlFor="hp">Nom</label>
                            <input id="lastname" name="lastname" type="text" className="form-control" value={ formatName(form.lastname.value)} onChange={e => handleInputChange(e)}></input>
                            {form.lastname.error && <div className="card-panel red accent-1"><i className="material-icons text-red">error</i>{form.lastname.error}</div>}
                          </div>

                          {/* types */}
                          <div className="form-group"> 
                            <label>Départements</label>
                            {types.map(type => (
                              <div key={type} style={{marginBottom: '10px'}}>
                                <label>
                                  <input id={type} name="type" type="checkbox" className="filled-in" value={type} checked={hasType(type)} onChange={ e => selectType(type, e)} disabled = {!isTypesValid(type)}></input>
                                  <span>
                                    <p className={formatType(type)}>{ type }</p>
                                  </span>
                                </label>
                              </div>
                            ))}
                          </div>

                        </div>

                        <div className="card-action center">
                          {/* Submit button */}
                          <button type="submit" className="btn">Valider</button>
                        </div>

                    </div>
                  
                </div>

            </div>

        </div>

    </form>
  );
};
   
export default UserForm;