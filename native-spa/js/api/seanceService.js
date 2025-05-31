
const baseUrl = 'http://cinema.test/cinema_backend'; 

export const getSeances = async () => {
        const response = await fetch(`${baseUrl}/api/v1/seances`);
        return await response.json();
};

export const getSeance = async (id) => {
        const response = await fetch(`${baseUrl}/api/v1/seances/${id}`);
        return await response.json();
};

export const updateSeancePlaces = async (id, newPlacesDisponibles) => {
        const response = await fetch(`${baseUrl}/api/v1/seances/${id}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify({ placesDisponibles: newPlacesDisponibles }),
        });
        return await response.json();
};

