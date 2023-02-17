import { Person } from "../../models/person";
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { MouseEventHandler, useEffect, useState ,MouseEvent  } from "react";

const PersonForm = ({ onSubmit, id, person }: PersonFormProps) => {
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [email, setEmail] = useState('');
    const [cpf, setCpf] = useState('');
    const [birthday, setBirthday] = useState<Date | string>(new Date());

    useEffect(() => {
        setName(person.Name);
        setSurname(person.Surname);
        setBirthday(person.Birthday);
        setCpf(person.CPF)
        setEmail(person.Email);
    }, [person]);

    const handleReset = (event?: MouseEvent<HTMLButtonElement>) => {
        event?.preventDefault();
        setName(person.Name);
        setSurname(person.Surname);
        setBirthday(person.Birthday);
        setCpf(person.CPF)
        setEmail(person.Email);
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let data: Person = {
            Id: id,
            Name: name,
            Surname: surname,
            Email: email,
            CPF: cpf,
            Birthday: birthday,
        }
        onSubmit(data);
    }

    return (<form onSubmit={handleSubmit}>
        <div>
            <span className="p-float-label">
                <InputText id="name" name="name" onChange={(e) => setName(e.target.value)} value={name} />
                <label htmlFor="name">Name</label>
            </span>

            <span className="p-float-label">
                <InputText id="surname" name="surname" onChange={(e) => setSurname(e.target.value)} value={surname} />
                <label htmlFor="surname">Surname</label>
            </span>

            <span className="p-float-label">
                <InputText id="email" name="email" onChange={(e) => setEmail(e.target.value)} value={email} type="email" />
                <label htmlFor="email">Email</label>
            </span>

            <span className="p-float-label">
                <InputText id="cpf" name="cpf" onChange={(e) => setCpf(e.target.value)} value={cpf} />
                <label htmlFor="cpf">CPF</label>
            </span>

            <span className="p-float-label">
                <Calendar id="birthday" name="birthday" value={birthday} onChange={(e) => { setBirthday(e.target.value as Date ?? new Date()) }} dateFormat="dd/mm/yy" maxDate={new Date()} placeholder="enter birthday" />
                <label htmlFor="cpf">birthday</label>
            </span>

            <Button label="Submit" aria-label="Submit" />
            <Button label="Reset" aria-label="Reset" onClick={handleReset} />
        </div>
    </form>);
}

export interface PersonFormProps {
    id: string | undefined;
    onSubmit: (event: Person) => void
    person: Person;
}

export default PersonForm;