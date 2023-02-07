import { Person } from "../../models/person";
import { DataTable } from 'primereact/datatable';
import { Column, ColumnBodyOptions } from "primereact/column";

function dateTemplate(data: any, options: ColumnBodyOptions) {
    return new Date( data[options.field]).toLocaleDateString();
}

const PersonList = ({ list }: PersonListProps) => {

    return (
        <DataTable value={list} responsiveLayout="scroll">
            <Column field="Name" header="Name"/>
            <Column field="Surname" header="Surname"/>
            <Column field="Email" header="Email"/>
            <Column field="CPF" header="CPF"/>
            <Column field="Birthday" header="Birthday"  body={dateTemplate}/>
        </DataTable>
    );
}

export interface PersonListProps {
    list: Person[];
}

export default PersonList;