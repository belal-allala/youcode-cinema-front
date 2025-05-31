// cinema_frontend/native-spa/js/components/SeanceList.js

import { getSeances } from '../api/seanceService.js';
import { showToast } from './Toast.js';
import { showBookingModal } from './hooks/cinemaModals.js'; // Importez la nouvelle fonction de modale

/**
 * Rend la liste des séances dans le conteneur principal.
 */
export const renderSeances = async () => { // Assurez-vous que renderSeances est bien exporté ici
    const seancesContainer = document.getElementById('seancesContainer');
    if (!seancesContainer) {
        console.error("Conteneur des séances introuvable.");
        return;
    }

    seancesContainer.innerHTML = ''; // Vider le contenu actuel (les placeholders)

    try {
        const seances = await getSeances();

        if (seances.length === 0) {
            seancesContainer.innerHTML = '<p class="text-center text-muted">Aucune séance disponible pour le moment.</p>';
            return;
        }

        seances.forEach(seance => {
            const seanceCard = document.createElement('div');
            seanceCard.className = 'col';
            seanceCard.innerHTML = `
                <div class="card h-100">
                    <div class="card-body">
                        <h5 class="card-title">${seance.film}</h5>
                        <p class="card-text">
                            <strong>Type :</strong> ${seance.type === '2D' ? '2D' : '3D'}<br>
                            <strong>Horaire :</strong> ${new Date(seance.horaire).toLocaleString()}<br>
                            <strong>Salle :</strong> ${seance.salle}<br>
                            <strong>Places Disponibles :</strong> ${seance.placesDisponibles}<br>
                            <strong>Prix :</strong> ${seance.calculatedPrice.toFixed(2)} MAD
                            ${seance.type === '2D' ? ` <br><strong>Qualité :</strong> ${seance.qualiteImage}` : ''}
                            ${seance.type === '3D' ? ` <br><strong>Technologie 3D :</strong> ${seance.technologie3D} <br><strong>Lunettes Incluses :</strong> ${seance.lunettesIncluses ? 'Oui' : 'Non'}` : ''}
                        </p>
                        <button class="btn btn-primary reserve-btn"
                            data-seance-id="${seance.id}"
                            ${seance.placesDisponibles <= 0 ? 'disabled' : ''}>
                            Réserver
                        </button>
                    </div>
                </div>
            `;
            seancesContainer.appendChild(seanceCard);

            const reserveButton = seanceCard.querySelector('.reserve-btn');
            if (reserveButton) {
                reserveButton.addEventListener('click', () => {
                    showBookingModal(seance); // Appelle la modale de réservation
                });
            }
        });
    } catch (error) {
        showToast('Erreur lors du chargement des séances.', 'danger');
        console.error("Échec du rendu des séances :", error);
        seancesContainer.innerHTML = '<p class="text-danger text-center">Impossible de charger les séances. Veuillez réessayer plus tard.</p>';
    }
};