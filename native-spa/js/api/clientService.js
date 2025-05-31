
const baseUrl = 'http://cinema.test/cinema_backend'; 

export const getClients = async () => {
    const response = await fetch(`${baseUrl}/api/v1/clients`);
    return await response.json();
};

export const getClient = async (id) => {
        const response = await fetch(`${baseUrl}/api/v1/clients/${id}`);
        return await response.json();
};

export const addClient = async (clientData) => {
        const response = await fetch(`${baseUrl}/api/v1/clients`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify(clientData),
        });
        return await response.json(); 
};

export const editClient = async (id, clientData) => {
        const response = await fetch(`${baseUrl}/api/v1/clients/${id}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify(clientData),
        });
        return await response.json(); 
};

export const deleteClient = async (id) => {
        const response = await fetch(`${baseUrl}/api/v1/clients/${id}`, {
            method: 'DELETE',
        });
        return true; 
};