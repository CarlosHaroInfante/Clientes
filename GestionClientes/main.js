import { addClient, deleteClient, updateClient, getClients } from './clienteManager.js';

const clientForm = document.getElementById('clientForm');
const clientsTable = document.getElementById('clientsTable').getElementsByTagName('tbody')[0];
let editingClientId = null;

clientForm.addEventListener('submit', function (event) {
    event.preventDefault();
    
    const name = document.getElementById('clientName').value;
    const email = document.getElementById('clientEmail').value;

    if (editingClientId !== null) {
        updateClient(editingClientId, name, email);
        editingClientId = null;
        clientForm.reset();
        document.getElementById('submitButton').innerText = 'Añadir Cliente';
    } else {
        addClient(name, email);
    }

    renderClients();
    clientForm.reset();
});

function renderClients() {
    clientsTable.innerHTML = ''; // Limpiar la tabla

    const clients = getClients();
    clients.forEach(client => {
        const row = clientsTable.insertRow();
        row.innerHTML = `
            <td>${client.id}</td>
            <td>${client.name}</td>
            <td>${client.email}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editClient(${client.id})">Editar</button>
                <button class="btn btn-danger btn-sm" onclick="deleteClient(${client.id})">Eliminar</button>
            </td>
        `;
    });
}

window.deleteClient = function (id) {
    deleteClient(id);
    renderClients();
};

window.editClient = function (id) {
    const client = getClients().find(c => c.id === id);
    if (client) {
        document.getElementById('clientName').value = client.name;
        document.getElementById('clientEmail').value = client.email;
        editingClientId = id;
        document.getElementById('submitButton').innerText = 'Actualizar Cliente';
    }
};
