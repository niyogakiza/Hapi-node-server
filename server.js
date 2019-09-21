const Hapi = require("hapi");
const good = require('good');

const server = new Hapi.Server()
server.connection({
    host:'localhost',
    port: 3000
})

server.route({
    method: "GET",
    path: "/",
    handler: (request, reply) => reply({ message: 'Are you happy!'})
});

const options = {
    ops: {
        interval: 100000
    },
    reporters: {
        consoleReporters: [
            { module: 'good-console'},
            'stdout'
        ]
    }
}

server.register({
    register: good,
    options,
}, (err) => {
    if (err) return console.error(err)
})

server.start(err => {
    if (err) throw err;
    console.log(`Server running at: ${server.info.uri}`);
});
