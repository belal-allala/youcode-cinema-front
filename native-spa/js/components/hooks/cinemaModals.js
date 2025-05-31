import BookingFormModal from '../BookingFormModal.js';
import { showToast } from '../Toast.js';
import { getClients, addClient } from '../../api/clientService.js';
import { addTicket } from '../../api/ticketService.js';
import { updateSeancePlaces, getSeance } from '../../api/seanceService.js';

import { renderSeances } from '../SeanceList.js'; 

export const showBookingModal = (seance) => {
    const existing = document.getElementById('bookingModal');
    if (existing) existing.remove();

    const modal = BookingFormModal({
        seance: seance,
        onSubmit: async ({ clientData, numberOfPlaces, seanceId }) => {
            let currentSeance = seance; 
            let clientId = null;
            let clientExists = false;

            try {
                const allClients = await getClients();
                const existingClient = allClients.find(c => c.email.toLowerCase() === clientData.email.toLowerCase());

                if (existingClient) {
                    const response = await fetch(`${baseUrl}/api/v1/tickets?clientId=${existingClient.id}&seanceId=${seanceId}`);
                    const clientTicketsForSeance = await response.json();
                    
                    let totalTicketsForClient = 0;
                    if (clientTicketsForSeance && Array.isArray(clientTicketsForSeance)) {
                        const filteredTickets = clientTicketsForSeance.filter(ticket => 
                            ticket.clientId === existingClient.id && 
                            ticket.seanceId === seanceId && 
                            ticket.statut !== 'ANNULÉ'
                        );
                        totalTicketsForClient = filteredTickets.reduce((sum, ticket) => sum + ticket.nombrePlaces, 0);
                    }

                    if (totalTicketsForClient + numberOfPlaces > 5) {
                        showToast(`Ce client a déjà ${totalTicketsForClient} places pour cette séance. Le maximum est 5.`, 'danger');
                        return; 
                    }
                    clientId = existingClient.id;
                    clientExists = true;
                } else {
                    const newClient = await addClient(clientData);
                    clientId = newClient.id;
                }

                currentSeance = await getSeance(seanceId);

                if (currentSeance.placesDisponibles < numberOfPlaces) {
                    showToast('Désolé, pas assez de places disponibles. Veuillez rafraîchir la page.', 'danger');
                    return;
                }
                if (currentSeance.placesDisponibles <= 0) {
                    showToast('Cette séance est complète.', 'danger');
                    return;
                }

                const ticket = await addTicket({
                    clientId: clientId,
                    seanceId: seanceId,
                    nombrePlaces: numberOfPlaces
                });

                const newPlacesDisponibles = currentSeance.placesDisponibles - numberOfPlaces;
                await updateSeancePlaces(seanceId, newPlacesDisponibles);

                showToast('Réservation effectuée avec succès !', 'success');

            } catch (error) {
                console.error("Erreur lors de la réservation :", error);
                let errorMessage = 'Une erreur est survenue lors de la réservation.';
                if (error.message.includes("Email already exists") && !clientExists) {
                     errorMessage = "Cet email est déjà utilisé par un autre client.";
                } else if (error.message.includes("not enough available places")) {
                    errorMessage = "Désolé, pas assez de places disponibles.";
                } else if (error.message.includes("Client has already purchased")) {
                    errorMessage = "Ce client a déjà atteint le maximum de 5 tickets pour cette séance.";
                } else {
                    errorMessage = error.message;
                }
                showToast(errorMessage, 'danger');
            } finally {
                const bsModal = bootstrap.Modal.getInstance(modal);
                if (bsModal) bsModal.hide();
                renderSeances();
            }
        }
    });

    document.body.appendChild(modal);
    const bsModal = new bootstrap.Modal(modal);
    bsModal.show();
};