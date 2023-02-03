import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { PersonQuery } from "../../models/person";

const PersonSearch = ({query, handleChange, onSubmit} : PersonSearchProps) => {

    return (<>
    
        <form onSubmit={onSubmit}>
        <span className="p-float-label">
            
            <InputText id="name" name="name" onChange={handleChange} value={query.name} />
            <label htmlFor="name">Name</label>
        </span>

        <Button label="Submit" aria-label="Submit" />
        </form>

    </>);
}

export interface PersonSearchProps {
    query: PersonQuery;
    handleChange: (event: React.ChangeEvent<HTMLInputElement> ) => void;
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}

export default PersonSearch;