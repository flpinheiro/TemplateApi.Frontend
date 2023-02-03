export interface Person {
    name: string;
    surname: string;
    cpf: string;
    email: string;
    birthday: Date | undefined;
}

export interface PersonQuery{
    name: string;
}

export const PERSON_INITIALIZER: Person = {
    name: "",
    surname: "",
    email: "",
    cpf: "",
    birthday: undefined
}

export const PERSON_QUERY_INITIALIZER: PersonQuery = {
    name:''
}

export const PersonLIstMock: Person[] = [
    {
        name: "Felipe",
        surname: "Pinheiro",
        email: "felipe.pinheiro@react.com",
        cpf: "000.000.000-00",
        birthday: new Date(),
    }
]