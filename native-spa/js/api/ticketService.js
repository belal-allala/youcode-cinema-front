
const baseUrl = 'http://cinema.test/cinema_backend'; 

export const addTicket = async (ticketData) => {
        const response = await fetch(`${baseUrl}/api/v1/tickets`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify(ticketData),
        });
        return await response.json(); 
};
