export const stringToDate = (str: string| Date) =>{
    if(str instanceof Date) return str;
    const [year, month, day] = str.split('-');
    return new Date(Number.parseInt(year), Number.parseInt(month)-1, Number.parseInt(day)-1)
}