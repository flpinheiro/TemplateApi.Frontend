import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";
import { PersonQuery, PERSON_QUERY_INITIALIZER } from "../../models/person";

const PersonSearch = ({ onSubmit }: PersonSearchProps) => {
    const [name, setName] = useState('');
    const [cpf, setCpf] = useState('');
    const [query, setQuery] = useState<PersonQuery>(PERSON_QUERY_INITIALIZER)

    useEffect(() => {
        onSubmit(query);
    }, [query]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let data: PersonQuery = { name: name, cpf: cpf };
        setQuery(data);
    }

    const handleReset = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        setName('');
        setCpf('');
        setQuery(PERSON_QUERY_INITIALIZER);
    }

    return (<>
        <form onSubmit={handleSubmit}>
            <div>
                <span className="p-float-label">
                    <InputText id="name" name="name" onChange={(e) => setName(e.target.value)} value={name} />
                    <label htmlFor="name">Name</label>
                </span>

                <span className="p-float-label">
                    <InputText id="cpf" name="cpf" onChange={(e) => setCpf(e.target.value)} value={cpf} />
                    <label htmlFor="cpf">CPF</label>
                </span>

                <Button label="Submit" aria-label="Submit" />
                <Button label="Reset" aria-label="Reset" onClick={handleReset} />
            </div>
        </form>
    </>);
}

export interface PersonSearchProps {
    onSubmit: (query: PersonQuery) => void
}

export default PersonSearch;