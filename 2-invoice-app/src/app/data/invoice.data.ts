import { Invoice } from "../models/invoice";

export const invoiceData: any={
    id: 1,
    name: 'componentes de pc',
    client: {
        name: 'anders',
        lastname: 'doe',
        address:{
            country : 'USA',
            city : 'los anfeles',
            street:'one street',
            number : 15
        }
    },
    company: {
        name : 'new age',
        fiscalNumber: 34656546,
    },
    items: [
        {
            id: 1,
            product : "cpu intel i9",
            price: 599,
            quantity: 1
        },
        {
            id: 2,
            product : "cpu razen i5 3600",
            price: 300,
            quantity: 2
        },
        {
            id: 3,
            product : "otra parte del pc",
            price: 250,
            quantity: 1
        },
    ]
}