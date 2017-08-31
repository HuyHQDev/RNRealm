class Person {

    firstName: number;
    lastName: number;
    birthday: Date;
    id: number;

}

Person.schema = {
    name: 'Person',
    primaryKey: 'id',
    properties: {
        todo: {
            type: 'Todo',
        },
        id: {
            type: 'int',
        },
        firstName: {
            type: 'string',
        },
        lastName: {
            type: 'string',
        },
        birthday: {
            type: 'date',
            optional: true,
        }
    }
};

export default Person;