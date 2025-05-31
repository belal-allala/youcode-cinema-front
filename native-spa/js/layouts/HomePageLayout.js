import SeanceListLayout from './SeanceListLayout.js'; 

const HomePageLayout = () => {
    return `
        <h1 class="text-center my-4">Système de Gestion de Tickets de Cinéma</h1>

        <!-- Toast Notification (gardé car utile) -->
        <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 1055">
          <div
            id="liveToast"
            class="toast"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
          >
            <div class="toast-header">
              <strong class="me-auto">Notification</strong>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="toast"
                aria-label="Close"
              ></button>
            </div>
            <div class="toast-body"></div>
          </div>
        </div>

        <!-- Affichage de la liste des séances -->
        ${SeanceListLayout()}
    `;
}

export default HomePageLayout;