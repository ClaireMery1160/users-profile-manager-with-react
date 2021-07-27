export default class User {
    // typage des propriétés d'un profil
    id: number;
    firstname: string;
    lastname: string;
    picture: string;
    types: Array<string>;
    created?: Date;
     
    // valeurs par défaut des propriétés 
    constructor(
     id: number,
     firstname: string,
     lastname: string,
     picture: string = 'https://randomuser.me/api/portraits/women/xxx.jpg',
     types: Array<string> = [],
     created: Date = new Date()
    ) 
    {
     // Initialisation
     this.id = id;
     this.firstname = firstname;
     this.lastname = lastname;
     this.picture = picture;
     this.types = types;
     this.created = created;
    }
   }