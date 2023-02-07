import { Person, PersonQuery } from "../models/person";
import api from "./api";


class PersonService {
    getPerson(query: PersonQuery) {
        const searchParams =  new URLSearchParams({...query});
        console.log("get person", searchParams.toString())
        return api.get<Person[]>(`/person?${searchParams.toString()}`);
    }

    submitPerson(person: Person) {
        return person.id ?
            api.put(`/person/${person.id}`, person) :
            api.post('/person', person);
    }

    deletePerson(id: string) {
        return api.delete(`/person/${id}`);
    }
}

export default PersonService;