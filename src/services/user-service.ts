import { pathToFileURL } from "url";
import User from "../models/user";
 
export default class UserService {
 
  static getUsers(): Promise<User[]> {
    return fetch('http://localhost:3001/users')
      .then(response => response.json())
      .catch(error => this.handleError(error));
  }
 
  static getUser(id: number): Promise<User|null> {
    return fetch(`http://localhost:3001/users/${id}`)
      .then(response => response.json())
      .then(data => this.isEmpty(data) ? null : data)
      .catch(error => this.handleError(error));
  }

  static updateUser(user: User): Promise<User>{
    return fetch(`http://localhost:3001/users/${user.id}`, {
        method: 'PUT',
        body: JSON.stringify(user), 
        headers: {'Content-type': 'application/json'}
    })
    .then(response => response.json())
    .catch(error => this.handleError(error));
  }

  static deleteUser(user: User): Promise<{}>{
    return fetch(`http://localhost:3001/users/${user.id}`, {
        method: 'DELETE',
        headers: {'Content-type': 'application/json'}
    })
    .then(response => response.json())
    .catch(error => this.handleError(error)); 
  }

  static addUser(user: User): Promise<User>{
    delete user.created;
    return fetch(`http://localhost:3001/users`, {
      method:'POST',
      body: JSON.stringify(user),
      headers: { 'Content-type': 'application/json'}
    })
    .then (response => response.json())
    .catch(error => this.handleError(error));
  }


  static searchUser(term: string): Promise<User[]> {
      return fetch(`http://localhost:3001/users?q=${term}`)
      .then(response =>response.json())
      .catch(error =>this.handleError(error));
  }
 
  static isEmpty(data: Object): boolean {
    return Object.keys(data).length === 0;
  }

  static handleError(error: Error):void {
    alert(error);
  }
}