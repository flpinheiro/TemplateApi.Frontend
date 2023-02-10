import { Person } from "../../models/person";
import { DataTable } from 'primereact/datatable';
import { Column, ColumnBodyOptions } from "primereact/column";
import PersonListMenu from "./PersonListMenu";

function dateTemplate(data: any, options: ColumnBodyOptions) {
    return new Date(data[options.field]).toLocaleDateString();
}

const PersonList = ({ list, onEdit, onDelete }: PersonListProps) => {

    const optionBodyTemplate = (data: any, options: ColumnBodyOptions) => {
        let id = data[options.field];
        return <PersonListMenu onEdit={() => onEdit(id)} onDelete={() => onDelete(id)} />
    }

    return (
        <DataTable value={list} responsiveLayout="scroll">
            <Column header="" field="Id" body={optionBodyTemplate} />
            <Column field="Name" header="Name" />
            <Column field="Surname" header="Surname" />
            <Column field="Email" header="Email" />
            <Column field="CPF" header="CPF" />
            <Column field="Birthday" header="Birthday" body={dateTemplate} />
        </DataTable>
    );
}

export interface PersonListProps {
    list: Person[];
    onEdit: (event: string) => void;
    onDelete: (event: string) => void;
}

export default PersonList;