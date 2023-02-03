import { Person } from "../../models/person";
import { InputText } from 'primereact/inputtext';
import { InputMask, InputMaskChangeEvent } from 'primereact/inputmask';
import { Calendar, CalendarChangeEvent } from 'primereact/calendar';
import { Button } from 'primereact/button';

const PersonForm = ({ onSubmit, handleChange, person }: PersonFormProps) => {

    return (<form onSubmit={onSubmit}>
        <div>
            <span className="p-float-label">
                <InputText id="name" name="name" onChange={handleChange} value={person.name} />
                <label htmlFor="name">Name</label>
            </span>

            <span className="p-float-label">
                <InputText id="surname" name="surname" onChange={handleChange} value={person.surname} />
                <label htmlFor="surname">Surname</label>
            </span>

            <span className="p-float-label">
                <InputText id="email" name="email" onChange={handleChange} value={person.email} type="email" />
                <label htmlFor="email">Email</label>
            </span>

            <span className="p-float-label">
                <InputMask id="cpf" name="cpf" mask="999.999.999-99" />
                <label htmlFor="cpf">CPF</label>
            </span>

            <span className="p-float-label">
                <Calendar id="calendar" value={person.birthday} onChange={handleChange} dateFormat="dd/mm/yy" maxDate={new Date()} placeholder="enter birthday"/>
                <label htmlFor="cpf">birthday</label>
            </span>

            <Button label="Submit" aria-label="Submit" />
        </div>
    </form>);
}

export interface PersonFormProps {
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
    handleChange: (event: React.ChangeEvent<HTMLInputElement> | InputMaskChangeEvent | CalendarChangeEvent) => void
    person: Person
}

export default PersonForm;