import { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from 'primereact/dialog';
import { Paginator, PaginatorPageChangeEvent } from 'primereact/paginator';
import { Pagination, Person, PersonQuery, PERSON_INITIALIZER, PERSON_QUERY_INITIALIZER, PAGINATION_INITIALIZER } from "../../models/person";
import PersonService from "../../Services/PersonService";
import PersonForm from "./PersonForm";
import PersonList from "./PersonList";
import PersonSearch from "./PersonSearch";
import { stringToDate } from "../../helpers/PersonHelpers";

const PersonIndex = () => {
    const [id, setId] = useState<string>()
    const [people, setPeople] = useState<Person[]>([]);
    const [query, setQuery] = useState<PersonQuery>(PERSON_QUERY_INITIALIZER);
    const [person, setPerson] = useState<Person>(PERSON_INITIALIZER);
    const [pagesQuery, setPagesQuery] = useState<Pagination>(PAGINATION_INITIALIZER);
    const [totalRecords, setTotalRecords] = useState<number>(0);
    const [first, setFirst] = useState<number>(0);
    const [visible, setVisible] = useState(false);

    const personService = new PersonService();

    const onPageChange = (event: PaginatorPageChangeEvent) => {
        setFirst(event.first);
        setPagesQuery({ ...pagesQuery, Row: event.rows, Page: event.page })
    };

    useEffect(() => {
        fetchPeople();
        fetchCount();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query, pagesQuery]);

    const onSubmit = (person: Person) => {
        personService.submitPerson(person)
            .then(response => {
                setVisible(false);
                setQuery(PERSON_QUERY_INITIALIZER);
                return response.data;
            })
            .then(data => console.log(data))
            .catch(err => console.log(err));
    }

    const fetchPeople = () => {
        personService.getPeople(query, pagesQuery)
            .then(response => {
                setPeople(response.data)
            })
            .catch(err => console.log(err));
    }
    const fetchCount = () => {
        personService.countPage(query)
            .then(response => response.data)
            .then(data => {
                setTotalRecords(data.Total);
            })
            .catch(err => console.log(err));
    }

    const onAddnew = () => {
        setId(undefined);
        setPerson(PERSON_INITIALIZER);
        setVisible(true)
    }

    const onEdit = (id: string) => {
        personService.getPerson(id)
            .then(response => response.data)
            .then(data => {
                const person: Person = { ...data, Birthday: stringToDate(data.Birthday) }
                console.log("fetch person", person)
                setId(id);
                setPerson(person);
                setVisible(true);
            })
            .catch(err => console.log(err));
    }
    const onDelete = (id: string) => {
        personService.deletePerson(id)
            .then(() => fetchPeople())
            .catch(err => console.log(err));
    }

    const exportToExcel = () => {
        personService.exportPeopleToExcel(query);
    }

    return (
        <>
            <h1>Person</h1>
            <span className="p-buttonset">
                <Button label="Add new Person" icon="pi pi-plus" onClick={() => onAddnew()} />
            </span>
            <Dialog header="Add new Person" visible={visible} onHide={() => setVisible(false)}
                style={{ width: '50vw' }} breakpoints={{ '960px': '75vw', '641px': '100vw' }}>
                <PersonForm person={person} onSubmit={onSubmit} id={id} />
            </Dialog>
            <PersonSearch query={query} setQuery={setQuery} setPagesQuery={setPagesQuery} />

            <span className="p-buttonset">
                <Button label="Export To Excel" onClick={() => exportToExcel()} />
            </span>

            <PersonList list={people} onEdit={onEdit} onDelete={onDelete} />

            <div className="card">
                <Paginator first={first} rows={pagesQuery.Row} totalRecords={totalRecords} rowsPerPageOptions={[10, 25, 50, 100]} onPageChange={onPageChange} />
            </div>
        </>);
}

export default PersonIndex;