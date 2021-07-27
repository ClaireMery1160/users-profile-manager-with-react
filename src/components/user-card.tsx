import { generateKeyPair } from "crypto";
import React, { FunctionComponent, useState } from "react";
import { getJSDocReturnType } from "typescript";
import User from "../models/user";
import'./user-card.css';
import formatDate from "../helpers/format-date";
import formatType from "../helpers/format-type";
import {useHistory} from 'react-router-dom';
import formatName from "../helpers/format-name";

type Props = {
    user: User, 
    borderColor?: string
};

const UserCard: FunctionComponent<Props> = ({user, borderColor = "#80cad9"}) => {

    const [color, setColor] = useState<string>();
    const history = useHistory();

    const showBorder = () => {
        setColor(borderColor);
    }

    const hideBorder = () => {
        setColor("#ddd");
    }

    const gotToUser = (id:number) => {
        history.push(`/users/${id}`);
    }

    return ( 
        <div className="col s6 m4" onClick={ () => gotToUser(user.id)} onMouseEnter={ showBorder } onMouseLeave = { hideBorder }>
            <div className="card horizontal z-depth-4 " style= {{ borderColor: color }}>
                <div className="card-image valign-wrapper"> 
                    <img src={user.picture} alt={user.lastname}/>
                </div>
                <div className="card-stacked center">
                    <div className="card-content">
                        <p><span>{ formatName(user.firstname) } </span> <span>{ formatName(user.lastname) }</span></p>
                        <p className="center"><small>{ formatDate(user.created) }</small></p>
                        {user.types.map((type) => (
                            <span key= {type} className={formatType(type)}> {type} </span>
                        ))}
                    </div>
                </div>
            </div> 
        </div>
    );
}

export default UserCard;
