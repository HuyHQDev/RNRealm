export default {
    name: 'User',
    properties: {
        name: 'string',
        birthday: 'date',
        todo: {
            type: 'list',
            objectType: 'Todo',
        },
    }
}