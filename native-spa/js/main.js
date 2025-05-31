// cinema_frontend/native-spa/js/main.js

import HomePageLayout from './layouts/HomePageLayout.js';
// Correction ici : nous n'avons plus besoin de setBookingModalFunction dans main.js
// car renderSeances gère directement l'appel à showBookingModal.
import { renderSeances } from './components/SeanceList.js';

document.addEventListener('DOMContentLoaded', () => {
    init(); // Initialise le layout

    // Appel initial pour rendre les séances
    renderSeances();

    // Ancien code d'exemple Employee (supprimé pour la clarté)
    // document.getElementById('addEmployeeBtn').addEventListener('click', () => {
    //     showEmployeeFormModal();
    // });
    // const searchInput = document.getElementById('searchInput');
    // searchInput.addEventListener('input', () => {
    //     renderEmployeeTable(searchInput.value);
    // });
});

const init = () => {
    const root = document.getElementById('root');
    root.innerHTML = HomePageLayout();
}