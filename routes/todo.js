const todoList = [
    {
        title: 'Shopping',
        dateCreated: 'Jan 21 2018',
        list: [
            {text: 'Node.js books', done: false},
            {text: 'Javascript books', done: false},
            {text: 'Java books', done: true},
        ]
    },
    {
        title: 'Place to visit',
        dateCreated: 'Feb 12 2018',
        list: [
            {text: 'Nairobi', done: false},
            {text: 'Milan', done: false},
            {text: 'Naples', done: true},
        ]
    }
]

module.exports = [
    {
        method: 'GET',
        path: '/todo', // get all
        handler: (request, reply) => reply(todoList)
    },
    {
        method: 'GET',
        path: '/todo/{id}', // get specific id
        handler: (request, reply) => {
            const id = request.params.id - 1
            if (todoList[id]) return reply(todoList[id])
            return reply({ message: 'Not found' }).code(404)
        }
    },
    {
        method: "POST",
        path: '/todo', // add to list
        handler: (request, reply) => {
            const todo = request.payload
            todoList.push(todo)
            return reply({ message: 'Created' })
        }
    },
    {
        method: "PUT",
        path: '/todo/{id}', // update a specific id
        handler:(request, reply) => {
            const index = request.params.id -1
            todoList[index] = request.payload
            return reply({ message: 'updated' })
        }
    },
    {
        method: 'PATCH',
        path: '/todo/{id}',
        handler: (request, reply) => {
            const index = request.params.id -1
            const todo = todoList[index]
            Object.keys(request.payload).forEach(key => {
                if (key in todo) {
                    todo[key] = request.payload[key]
                }
            })
            return reply({ message: 'patched' })
        }
    },
    {
        method: 'DELETE',
        path: '/todo/{id}',
        handler: (request, reply) => {
            const index = request.params.id -1
            delete todoList[index]
            return reply({ message: 'deleted' })
        }
    }
]
