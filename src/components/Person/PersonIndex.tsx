import { CalendarChangeEvent } from "primereact/calendar";
import { InputMaskChangeEvent } from "primereact/inputmask";

import { Dialog } from 'primereact/dialog';

import { useEffect, useState } from "react";
import { Person, PersonLIstMock, PersonQuery, PERSON_INITIALIZER, PERSON_QUERY_INITIALIZER } from "../../models/person";
import PersonForm from "./PersonForm";
import PersonList from "./PersonList";
import { Button } from "primereact/button";
import PersonSearch from "./PersonSearc";


const PersonIndex = () => {
    const [query, setQuery] = useState<PersonQuery>(PERSON_QUERY_INITIALIZER);
    const [person, setPerson] = useState<Person>(PERSON_INITIALIZER);
    const [people, setPeople] = useState<Person[]>([]);
    const [visible, setVisible] = useState(false);

    useEffect(() => fetchPeople());

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("submit", person)
        setPeople([...people, person])
        setPerson(PERSON_INITIALIZER);
        setVisible(false);
    }

    const onSubmitQuery = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("submit", query)
        fetchPeople();
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement> | InputMaskChangeEvent | CalendarChangeEvent) => {
        setPerson({ ...person, [event.target.name]: event.target.value });
    }

    const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement> ) => {
        setQuery({ ...query, [event.target.name]: event.target.value });
    }

    const fetchPeople = () => {
        setPeople(PersonLIstMock)
    }

    return (
        <>
            <h1>Person</h1>
            <Button label="Add new Person" icon="pi pi-plus" onClick={() => setVisible(true)} />
            <Dialog header="Add new Person" visible={visible} onHide={() => setVisible(false)}
                style={{ width: '50vw' }} breakpoints={{ '960px': '75vw', '641px': '100vw' }}>
                <PersonForm onSubmit={onSubmit} handleChange={handleChange} person={person} />
            </Dialog>
            <PersonSearch query={query}  handleChange={handleChangeQuery} onSubmit={onSubmitQuery}/>
            <PersonList list={people} />
        </>);
}

export default PersonIndex;