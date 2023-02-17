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
