import React, {FunctionComponent, useState} from "react";
import UserForm from "../components/user-form";
import User from "../models/user";

const UserAdd: FunctionComponent = () =>{
    const [id] = useState<number>(new Date().getTime());
    const [firstname] = useState<string>("");
    const [lastname] = useState<string>("");
    const [user] = useState<User>(new User(id, firstname, lastname));

    return (

        <div className="row">
            <h2 className="header center play white-font"> Ajouter un profile </h2>
            <UserForm user={user} isEditForm={false}></UserForm>
        </div>
    )
}

export default UserAdd;