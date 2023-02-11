import { useState } from "react";
import { CalendarChangeEvent } from "primereact/calendar";
import { InputMaskChangeEvent } from "primereact/inputmask";
import { Button } from "primereact/button";
import { Dialog } from 'primereact/dialog';
import { Person, PersonQuery, PERSON_INITIALIZER } from "../../models/person";
import PersonService from "../../Services/PersonService";
import PersonForm from "./PersonForm";
import PersonList from "./PersonList";
import PersonSearch from "./PersonSearch";

const PersonIndex = () => {
    const [person, setPerson] = useState<Person>(PERSON_INITIALIZER);
    const [people, setPeople] = useState<Person[]>([]);
    const [visible, setVisible] = useState(false);

    const personService = new PersonService()

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        personService.submitPerson(person)
            .then(response => {
                setPerson(PERSON_INITIALIZER);
                setVisible(false);
                //fetchPeople();
            })
            .catch(err => console.log(err));
    }

    const onSubmitQuery = (query: PersonQuery) => {
        fetchPeople(query);
    }

   const handleChange = (event: React.ChangeEvent<HTMLInputElement> | InputMaskChangeEvent | CalendarChangeEvent) => {
        setPerson({ ...person, [event.target.name]: event.target.value });
    }

    const fetchPeople = (query:PersonQuery) => {
        personService.getPerson(query)
            .then(response => {
                setPeople(response.data)
            })
            .catch(err => console.log(err));
    }

    const onEdit = (id: string) => {
        personService.getPersonById(id)
            .then(response=> response.data)
            .then(data => {
                setPerson(data);
                setVisible(true);
            })
            .catch(err => console.log(err));
    }
    const onDelete = (id: string) => {
        console.log("on delete", id)
    }

    return (
        <>
            <h1>Person</h1>
            <Button label="Add new Person" icon="pi pi-plus" onClick={() => setVisible(true)} />
            <Dialog header="Add new Person" visible={visible} onHide={() => setVisible(false)}
                style={{ width: '50vw' }} breakpoints={{ '960px': '75vw', '641px': '100vw' }}>
                <PersonForm onSubmit={onSubmit} handleChange={handleChange} person={person} />
            </Dialog>
            <PersonSearch onSubmit={onSubmitQuery} />
            <PersonList list={people} onEdit={onEdit} onDelete={onDelete} />
        </>);
}

export default PersonIndex;