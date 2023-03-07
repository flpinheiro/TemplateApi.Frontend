import { formatDate } from "../helpers/PersonHelpers";
import { Pagination, PaginationResponse, Person, PersonQuery } from "../models/person";
import api, { controller } from "./api";
import { saveAs } from 'file-saver';

class PersonService {

    countPage(query: PersonQuery) {
        const searchParams = new URLSearchParams({ ...query });
        return api.get<PaginationResponse>(`/person/Count?${searchParams.toString()}`);
    }

    getPeople(query: PersonQuery, pageQuery: Pagination) {
        const searchParams = new URLSearchParams({ ...query, PageSize: pageQuery.Row.toString(), Page: pageQuery.Page.toString() });
        return api.get<Person[]>(`/person?${searchParams.toString()}`);
    }

    async exportPeopleToExcel(query: PersonQuery) {
        const searchParams = new URLSearchParams({ ...query });
        try {
            const response = await api.get<Blob>(`/person/ExportToExcel?${searchParams.toString()}`,
                {
                    responseType: 'blob'
                });

            const today = new Date();
            const dd = String(today.getDate()).padStart(2, '0');
            const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            const yyyy = String(today.getFullYear());
            const hh = String(today.getHours()).padStart(2, '0');
            const MM = String(today.getMinutes()).padStart(2, '0');
            const todayStr = `${yyyy}_${mm}_${dd}_${hh}_${MM}`;
            const filename = `people_${todayStr}.xlsx`;
            const blob = new Blob([response.data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
            saveAs(blob, filename);
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
