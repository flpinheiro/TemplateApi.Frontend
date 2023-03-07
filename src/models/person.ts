export interface Person {
    Id: string | undefined;
    Name: string;
    Surname: string;
    CPF: string;
    Email: string;
    Birthday: Date | string;
}

export interface PersonQuery {
    name: string;
    cpf: string;
}

export const PERSON_INITIALIZER: Person = {
    Id: undefined,
    Name: "",
    Surname: "",
    Email: "",
    CPF: "",
    Birthday: new Date()
}

export const PERSON_QUERY_INITIALIZER: PersonQuery = {
    name: '',
    cpf: '',
}

export interface Pagination{
    Row: number;
    Page: number;
}

export const PAGINATION_INITIALIZER : Pagination={
    Page: 0,
    Row: 10,
}

export interface PaginationResponse{
    Pages: number;
    Total: number;
}
