let clients = [];
let currentId = 0;

export function addClient(name, email) {
    const client = { id: currentId++, name, email };
    clients.push(client);
    return client;
}

export function deleteClient(id) {
    clients = clients.filter(client => client.id !== id);
}

export function updateClient(id, name, email) {
    const client = clients.find(client => client.id === id);
    if (client) {
        client.name = name;
        client.email = email;
    }
}

export function getClients() {
    return clients;
}
