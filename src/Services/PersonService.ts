import { Person, PersonQuery } from "../models/person";
import api from "./api";


function formatDate(date: Date | undefined): string {
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

class PersonService {
    getPerson(query: PersonQuery) {
        const searchParams = new URLSearchParams({ ...query });
        return api.get<Person[]>(`/person?${searchParams.toString()}`);
    }

    getPersonById(id: string) {
        return api.get<Person>(`/person/${id}`);
    }

    submitPerson(person: Person) {
        let data = { ...person, birthday: formatDate(person.birthday) }
        console.log("subimit person", data, JSON.stringify(data));

        return person.id ?
            api.put(`/person/${person.id}`, data) :
            api.post('/person', data);
    }

    deletePerson(id: string) {
        return api.delete(`/person/${id}`);
    }
}

export default PersonService;