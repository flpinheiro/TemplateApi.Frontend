import { formatDate } from "../helpers/PersonHelpers";
import { Person, PersonQuery } from "../models/person";
import api from "./api";

class PersonService {
    getPerson(query: PersonQuery) {
        const searchParams = new URLSearchParams({ ...query });
        return api.get<Person[]>(`/person?${searchParams.toString()}`);
    }

    getPersonById(id: string) {
        return api.get<Person>(`/person/${id}`);
    }

    submitPerson(person: Person) {
        let data = { ...person, birthday: formatDate(person.Birthday) }
        console.log("subimit person", data, JSON.stringify(data));

        return person.Id ?
            api.put(`/person/${person.Id}`, data) :
            api.post('/person', data);
    }

    deletePerson(id: string) {
        return api.delete(`/person/${id}`);
    }
}

export default PersonService;