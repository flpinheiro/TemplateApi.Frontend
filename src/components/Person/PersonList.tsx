import { Person } from "../../models/person";

import { DataTable } from 'primereact/datatable';
import { Column, ColumnBodyOptions } from "primereact/column";

function dateTemplate(data: any, options: ColumnBodyOptions) {
    return data[options.field].toLocaleDateString();
}

const PersonList = ({ list }: PersonListProps) => {

    return (
        <DataTable value={list} responsiveLayout="scroll">
            <Column field="name" header="name"/>
            <Column field="surname" header="surname"/>
            <Column field="email" header="email"/>
            <Column field="cpf" header="cpf"/>
            <Column field="birthday" header="birthday"  body={dateTemplate}/>
        </DataTable>
    );
}

export interface PersonListProps {
    list: Person[];
}

export default PersonList;