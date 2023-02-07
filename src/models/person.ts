export interface Person {
    id: string | null;
    name: string;
    surname: string;
    cpf: string;
    email: string;
    birthday: Date | undefined;
}

export interface PersonQuery {
    name: string;
    cpf: string;
}

export const PERSON_INITIALIZER: Person = {
    id: null,
    name: "",
    surname: "",
    email: "",
    cpf: "",
    birthday: undefined
}

export const PERSON_QUERY_INITIALIZER: PersonQuery = {
    name: '',
    cpf: '',
}

export const PersonLIstMock: Person[] = [
    {
        id: "test-id",
        name: "Felipe",
        surname: "Pinheiro",
        email: "felipe.pinheiro@react.com",
        cpf: "000.000.000-00",
        birthday: new Date(),
    }
]