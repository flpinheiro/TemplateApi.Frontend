export const stringToDate = (str: string | Date) => {
    if (str instanceof Date) return str;
    const [year, month, day] = str.split('-');
    return new Date(Number.parseInt(year), Number.parseInt(month) - 1, Number.parseInt(day) - 1)
}

export const formatDate = (date: Date | string | undefined): string => {
    if (date === undefined) return '';
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}