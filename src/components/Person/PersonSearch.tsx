import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { PersonQuery } from "../../models/person";

const PersonSearch = ({ query, handleChange, onSubmit, onReset }: PersonSearchProps) => {

    return (<>

        <form onSubmit={onSubmit}>
            <span className="p-float-label">
                <InputText id="name" name="name" onChange={handleChange} value={query.name} />
                <label htmlFor="name">Name</label>
            </span>

            <span className="p-float-label">
                <InputText id="cpf" name="cpf" onChange={handleChange} value={query.cpf} />
                <label htmlFor="cpf">CPF</label>
            </span>

            <Button label="Submit" aria-label="Submit" />
            <Button label="Reset" aria-label="Reset" onClick={onReset} />
        </form>

    </>);
}

export interface PersonSearchProps {
    query: PersonQuery;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
    onReset: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export default PersonSearch;