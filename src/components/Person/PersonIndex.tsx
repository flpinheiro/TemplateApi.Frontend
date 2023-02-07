import { CalendarChangeEvent } from "primereact/calendar";
import { InputMaskChangeEvent } from "primereact/inputmask";

import { Dialog } from 'primereact/dialog';

import { useEffect, useState } from "react";
import { Person,  PersonQuery, PERSON_INITIALIZER, PERSON_QUERY_INITIALIZER } from "../../models/person";
import PersonForm from "./PersonForm";
import PersonList from "./PersonList";
import { Button } from "primereact/button";
import PersonSearch from "./PersonSearch";
import PersonService from "../../Services/PersonService";


const PersonIndex = () => {
    const [query, setQuery] = useState<PersonQuery>(PERSON_QUERY_INITIALIZER);
    const [person, setPerson] = useState<Person>(PERSON_INITIALIZER);
    const [people, setPeople] = useState<Person[]>([]);
    const [visible, setVisible] = useState(false);
    
    const personService = new PersonService()

    useEffect(() => {
        console.log("First call on mount..");
        fetchPeople();
        return () => console.log("Cleanup..");
    }, []);

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("submit", person)
        setPeople([...people, person])
        setPerson(PERSON_INITIALIZER);
        fetchPeople();
        setVisible(false);
        personService.submitPerson(person)
            .then(data => console.log(data))
            .catch(err => console.log(err));
    }

    const onSubmitQuery = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        fetchPeople();
    }

    const onResetQuery = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        setQuery(PERSON_QUERY_INITIALIZER);
        fetchPeople();
        
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement> | InputMaskChangeEvent | CalendarChangeEvent) => {
        setPerson({ ...person, [event.target.name]: event.target.value });
    }

    const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement> ) => {
        setQuery({ ...query, [event.target.name]: event.target.value });
    }

    const fetchPeople = () => {
        personService.getPerson(query)
            .then(response => {
                console.log(response.data)
                setPeople(response.data)
            })
            .catch(err => console.log(err));
    }

    return (
        <>
            <h1>Person</h1>
            <Button label="Add new Person" icon="pi pi-plus" onClick={() => setVisible(true)} />
            <Dialog header="Add new Person" visible={visible} onHide={() => setVisible(false)}
                style={{ width: '50vw' }} breakpoints={{ '960px': '75vw', '641px': '100vw' }}>
                <PersonForm onSubmit={onSubmit} handleChange={handleChange} person={person} />
            </Dialog>
            <PersonSearch query={query}  handleChange={handleChangeQuery} onSubmit={onSubmitQuery} onReset={onResetQuery}/>
            <PersonList list={people} />
        </>);
}

export default PersonIndex;