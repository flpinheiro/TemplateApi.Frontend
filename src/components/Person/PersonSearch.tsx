import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";
import { PersonQuery, PERSON_QUERY_INITIALIZER } from "../../models/person";

const PersonSearch = ({ setQuery, query }: PersonSearchProps) => {
    const [name, setName] = useState('');
    const [cpf, setCpf] = useState('');

    useEffect(() => {
        if(query.name!== name || query.cpf!== cpf){
            setName(query.name);
            setCpf(query.cpf);
        }
    }, [query])

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let query: PersonQuery = { name: name, cpf: cpf };
        setQuery(query);
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
    setQuery: (state: PersonQuery) => void;
    query: PersonQuery;
}

export default PersonSearch;