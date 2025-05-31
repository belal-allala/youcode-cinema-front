const ShowClientModal = ({ id, name, email, phone }) => {
    const modalWrapper = document.createElement('div');
    modalWrapper.className = 'modal fade';
    modalWrapper.id = 'clientShowModal';
    modalWrapper.tabIndex = -1;
    modalWrapper.setAttribute('aria-hidden', 'true');

    modalWrapper.innerHTML = `
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Détails du client : ${name}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body text-center">
            <p><strong>ID Client :</strong> ${id}</p>
            <p><strong>Nom :</strong> ${name}</p>
            <p><strong>Email :</strong> ${email}</p>
            <p><strong>Téléphone :</strong> ${phone}</p>
          </div>
        </div>
      </div>
    `;

    return modalWrapper;
};

export default ShowClientModal;