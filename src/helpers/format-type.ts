const formatType = (type: string) => {
    let color: string;

    switch(type) {
        case 'Direction':
            color = 'purple accent-3';
            break;
          case 'IT': 
            color = 'blue lighten-1'; 
            break; 
          case 'Production': 
            color = 'cyan lighten-1'; 
            break; 
          case 'Administration': 
            color = 'pink accent-2'; 
            break; 
          case 'Sales': 
            color = 'cyan accent-2'; 
            break; 
        default:
            color = '#80cad9';
            break;
    }
    return `chip ${color}`;
};

export default formatType;