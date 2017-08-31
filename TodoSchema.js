export const TodoSchema = {
    name: 'Todo',
    properties: {
        title: 'string',
        content: 'string',
        isCompeleted: {
            type: 'bool',
            default: false,
        },
    }
}