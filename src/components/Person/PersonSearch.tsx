import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { Pagination, PAGINATION_INITIALIZER, PersonQuery, PERSON_QUERY_INITIALIZER } from "../../models/person";

const PersonSearch = ({ setQuery, query, setPagesQuery }: PersonSearchProps) => {
    const [name, setName] = useState('');
    const [cpf, setCpf] = useState('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setQuery({ ...query, name: name, cpf: cpf });
    }

    const handleReset = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        setName('');
        setCpf('');
        setQuery(PERSON_QUERY_INITIALIZER);
        setPagesQuery(PAGINATION_INITIALIZER);
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
                <span className="p-buttonset">
                    <Button label="Submit" aria-label="Submit" />
                    <Button label="Reset" aria-label="Reset" onClick={handleReset} />
                </span>
            </div>
        </form>
    </>);
}

export interface PersonSearchProps {
    setQuery: (state: PersonQuery) => void;
    setPagesQuery: (state: Pagination) => void;
    query: PersonQuery;
}

export default PersonSearch;