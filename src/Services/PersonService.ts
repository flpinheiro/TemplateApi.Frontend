import { formatDate } from "../helpers/PersonHelpers";
import { Person, PersonQuery } from "../models/person";
import api, { controller } from "./api";
import { saveAs } from 'file-saver';

class PersonService {
    getPeople(query: PersonQuery) {
        const searchParams = new URLSearchParams({ ...query });
        return api.get<Person[]>(`/person?${searchParams.toString()}`);
    }

    async exportPeopleToExcel(query: PersonQuery) {
        const searchParams = new URLSearchParams({ ...query });
        try {
            const response = await api.get<Blob>(`/person/ExportToExcel?${searchParams.toString()}`,
                {
                    responseType: 'blob'
                });
            const blob = new Blob([response.data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
            saveAs(blob);
        } catch (err) {
            return console.log(err);
        }
    }

    getPerson(id: string) {
        return api.get<Person>(`/person/${id}`);
    }

    submitPerson(person: Person) {
        let data = { ...person, birthday: formatDate(person.Birthday) }
        return person.Id ?
            api.put(`/person/${person.Id}`, data) :
            api.post('/person', data);
    }

    deletePerson(id: string) {
        return api.delete(`/person/${id}`);
    }

    abort() {
        controller.abort();
    }
}

export default PersonService;
