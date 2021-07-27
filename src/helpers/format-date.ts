const formatDate = (date: Date = new Date()): string => {
    return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
    // return ` ${new Date(date).getDate()}/${new Date(date).getMonth()+1}/${new Date(date).getFullYear()} `;
}

export default formatDate;