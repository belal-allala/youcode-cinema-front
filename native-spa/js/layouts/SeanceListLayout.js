const SeanceListLayout = () => {
  return `
      <div class="seance-list-container">
          <h2 class="mb-4">Séances Disponibles</h2>
          <div id="seancesContainer" class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
              <!-- Les cartes de séances seront injectées ici par JavaScript -->
              <div class="col">
                  <div class="card h-100">
                      <div class="card-body">
                          <h5 class="card-title placeholder-glow">
                              <span class="placeholder col-8"></span>
                          </h5>
                          <p class="card-text placeholder-glow">
                              <span class="placeholder col-6"></span><br>
                              <span class="placeholder col-4"></span><br>
                              <span class="placeholder col-7"></span>
                          </p>
                          <a href="#" tabindex="-1" class="btn btn-primary disabled placeholder col-6"></a>
                      </div>
                  </div>
              </div>
              <div class="col">
                  <div class="card h-100">
                      <div class="card-body">
                          <h5 class="card-title placeholder-glow">
                              <span class="placeholder col-8"></span>
                          </h5>
                          <p class="card-text placeholder-glow">
                              <span class="placeholder col-6"></span><br>
                              <span class="placeholder col-4"></span><br>
                              <span class="placeholder col-7"></span>
                          </p>
                          <a href="#" tabindex="-1" class="btn btn-primary disabled placeholder col-6"></a>
                      </div>
                  </div>
              </div>
              <div class="col">
                  <div class="card h-100">
                      <div class="card-body">
                          <h5 class="card-title placeholder-glow">
                              <span class="placeholder col-8"></span>
                          </h5>
                          <p class="card-text placeholder-glow">
                              <span class="placeholder col-6"></span><br>
                              <span class="placeholder col-4"></span><br>
                              <span class="placeholder col-7"></span>
                          </p>
                          <a href="#" tabindex="-1" class="btn btn-primary disabled placeholder col-6"></a>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  `;
}

export default SeanceListLayout;