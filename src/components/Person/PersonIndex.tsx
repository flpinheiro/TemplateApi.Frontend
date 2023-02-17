import { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from 'primereact/dialog';
import { Person, PersonQuery, PERSON_INITIALIZER, PERSON_QUERY_INITIALIZER } from "../../models/person";
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

    const [visible, setVisible] = useState(false);
    const personService = new PersonService();

    useEffect(() => {
        fetchPeople(query);
    }, [query]);

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

    const fetchPeople = (query: PersonQuery) => {
        personService.getPerson(query)
            .then(response => {
                setPeople(response.data)
            })
            .catch(err => console.log(err));
    }

    const onAddnew  = () => {
        setId(undefined);
        setPerson(PERSON_INITIALIZER);
        setVisible(true)
    }

    const onEdit = (id: string) => {
        personService.getPersonById(id)
            .then(response=> response.data)
            .then(data=> {
                const person: Person = {...data, Birthday: stringToDate(data.Birthday)}
                console.log("fetch person",person)
                setId(id);
                setPerson(person);
                setVisible(true);            
            })
            .catch(err=> console.log(err));
    }
    const onDelete = (id: string) => {
        personService.deletePerson(id)
            .then(response => console.log(response))
            .catch(err => console.log(err));
    }

    return (
        <>
            <h1>Person</h1>
            <Button label="Add new Person" icon="pi pi-plus" onClick={() => onAddnew()} />
            <Dialog header="Add new Person" visible={visible} onHide={() => setVisible(false)}
                style={{ width: '50vw' }} breakpoints={{ '960px': '75vw', '641px': '100vw' }}>
                <PersonForm person={person} onSubmit={onSubmit} id={id} />
            </Dialog>
            <PersonSearch query={query} setQuery={setQuery} />
            <PersonList list={people} onEdit={onEdit} onDelete={onDelete} />
        </>);
}

export default PersonIndex;