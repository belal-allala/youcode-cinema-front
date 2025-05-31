
const BookingFormModal = ({ seance, onSubmit }) => {
    const modalWrapper = document.createElement('div');
    modalWrapper.className = 'modal fade';
    modalWrapper.id = 'bookingModal'; 
    modalWrapper.tabIndex = -1;
    modalWrapper.setAttribute('aria-labelledby', 'bookingModalLabel');
    modalWrapper.setAttribute('aria-hidden', 'true');

    modalWrapper.innerHTML = `
      <div class="modal-dialog">
        <div class="modal-content">
          <form id="bookingForm">
            <div class="modal-header">
              <h5 class="modal-title" id="bookingModalLabel">Réserver des places pour : ${seance.film} (${seance.type})</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
              <div id="formErrors" class="alert alert-danger d-none"></div>

              <p><strong>Séance :</strong> ${seance.film}</p>
              <p><strong>Horaire :</strong> ${new Date(seance.horaire).toLocaleString()}</p>
              <p><strong>Prix unitaire :</strong> ${seance.calculatedPrice.toFixed(2)} MAD</p>
              <p><strong>Places disponibles :</strong> <span id="availablePlaces">${seance.placesDisponibles}</span></p>
              <hr>

              <div class="mb-3">
                <label for="clientName" class="form-label">Nom Complet</label>
                <input type="text" class="form-control" id="clientName" required />
              </div>

              <div class="mb-3">
                <label for="clientEmail" class="form-label">Email</label>
                <input type="email" class="form-control" id="clientEmail" required />
              </div>

              <div class="mb-3">
                <label for="clientPhone" class="form-label">Téléphone</label>
                <input type="tel" class="form-control" id="clientPhone" required />
              </div>

              <div class="mb-3">
                <label for="numberOfPlaces" class="form-label">Nombre de places à réserver (Max 5 par client)</label>
                <input type="number" class="form-control" id="numberOfPlaces" min="1" max="5" value="1" required />
              </div>

              <div class="mt-4 text-end">
                <p><strong>Montant Total Estimé (hors TVA):</strong> <span id="estimatedTotal">${seance.calculatedPrice.toFixed(2)}</span> MAD</p>
              </div>

            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
              <button type="submit" class="btn btn-success">Confirmer la réservation</button>
            </div>
          </form>
        </div>
      </div>
    `;

    setTimeout(() => {
        const numberOfPlacesInput = modalWrapper.querySelector('#numberOfPlaces');
        const estimatedTotalSpan = modalWrapper.querySelector('#estimatedTotal');
        const availablePlacesSpan = modalWrapper.querySelector('#availablePlaces');
        const submitButton = modalWrapper.querySelector('button[type="submit"]');
        const formErrorsDiv = modalWrapper.querySelector('#formErrors');

        const updateEstimatedTotal = () => {
            let numPlaces = parseInt(numberOfPlacesInput.value, 10);
            if (isNaN(numPlaces) || numPlaces < 1) {
                numPlaces = 1;
                numberOfPlacesInput.value = 1;
            }
            if (numPlaces > 5) {
                numPlaces = 5;
                numberOfPlacesInput.value = 5;
            }
            const currentMax = parseInt(numberOfPlacesInput.max, 10);
            const actualMax = Math.min(seance.placesDisponibles, 5); 
            numberOfPlacesInput.max = actualMax;

            if (numPlaces > seance.placesDisponibles) {
                formErrorsDiv.textContent = `Seulement ${seance.placesDisponibles} places disponibles.`;
                formErrorsDiv.classList.remove('d-none');
                submitButton.disabled = true;
            } else if (numPlaces < 1) {
                 formErrorsDiv.textContent = 'Veuillez saisir au moins 1 place.';
                 formErrorsDiv.classList.remove('d-none');
                 submitButton.disabled = true;
            } else if (numPlaces > 5) { 
                formErrorsDiv.textContent = 'Un client peut acheter 5 tickets au maximum.';
                formErrorsDiv.classList.remove('d-none');
                submitButton.disabled = true;
            } else {
                formErrorsDiv.classList.add('d-none');
                submitButton.disabled = false;
            }

            const total = seance.calculatedPrice * numPlaces;
            estimatedTotalSpan.textContent = total.toFixed(2);
        };

        numberOfPlacesInput.addEventListener('input', updateEstimatedTotal);
        updateEstimatedTotal(); 

        modalWrapper.querySelector('#bookingForm')?.addEventListener('submit', async (e) => {
            e.preventDefault();
            formErrorsDiv.classList.add('d-none'); 

            const clientData = {
                name: modalWrapper.querySelector('#clientName').value.trim(),
                email: modalWrapper.querySelector('#clientEmail').value.trim(),
                phone: modalWrapper.querySelector('#clientPhone').value.trim(),
            };
            const numberOfPlaces = parseInt(modalWrapper.querySelector('#numberOfPlaces').value, 10);

            if (!clientData.name || !clientData.email || !clientData.phone || isNaN(numberOfPlaces) || numberOfPlaces < 1) {
                formErrorsDiv.textContent = 'Veuillez remplir tous les champs et entrer un nombre de places valide.';
                formErrorsDiv.classList.remove('d-none');
                return;
            }
            if (numberOfPlaces > seance.placesDisponibles) {
                formErrorsDiv.textContent = `Seulement ${seance.placesDisponibles} places disponibles pour cette séance.`;
                formErrorsDiv.classList.remove('d-none');
                return;
            }
            if (numberOfPlaces > 5) {
                 formErrorsDiv.textContent = 'Un client peut acheter 5 tickets au maximum.';
                 formErrorsDiv.classList.remove('d-none');
                 return;
            }

            await onSubmit({ clientData, numberOfPlaces, seanceId: seance.id });

            const bsModal = bootstrap.Modal.getInstance(modalWrapper);
            if (bsModal) bsModal.hide();
        });
    });

    return modalWrapper;
};

export default BookingFormModal;