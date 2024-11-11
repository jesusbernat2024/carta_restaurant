// URL del fitxer XML al teu repositori
const url = 'https://raw.githubusercontent.com/usuari/repositori/main/data.xml';

fetch(url)
  .then(response => response.text())
  .then(data => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(data, "application/xml");

    // Contenidor dels grups al menú de navegació
    const navList = document.querySelector('.tm-paging-links ul');
    // Contenidor principal dels plats
    const galleryContainer = document.querySelector('.tm-gallery');

    // Accedim als grups de plats de l'XML
    const grups = xmlDoc.getElementsByTagName("GRUP");
    
    Array.from(grups).forEach((grup, index) => {
      // Obtenció del nom del grup
      const nomGrup = grup.getElementsByTagName("NOM")[0].textContent;

      // Creació del nou enllaç de navegació per al grup
      const navItem = document.createElement('li');
      navItem.classList.add('tm-paging-item', 'GRUP');
      navItem.innerHTML = `<a href="#" class="tm-paging-link ${index === 0 ? 'active' : ''}">${nomGrup}</a>`;
      navList.appendChild(navItem);

      // Creació del contenidor dels plats per al grup
      const groupContainer = document.createElement('div');
      groupContainer.id = `tm-gallery-page-${nomGrup.toLowerCase()}`;
      groupContainer.classList.add('tm-gallery-page', 'row', 'GRUP');
      groupContainer.style.display = index === 0 ? 'block' : 'none'; // Mostra el primer grup, amaga els altres inicialment

      // Accedim als plats dins del grup
      const plats = grup.getElementsByTagName("PLAT");
      Array.from(plats).forEach(plat => {
        // Obtenir informació del plat
        const nomPlat = plat.getElementsByTagName("NOM")[0].textContent;
        const descripcioPlat = plat.getElementsByTagName("DESCRIPCIO")[0].textContent;
        const preuPlat = plat.getElementsByTagName("PREU")[0].textContent;

        // Creació del bloc de cada plat
        const platItem = document.createElement('article');
        platItem.classList.add('col-lg-3', 'col-md-4', 'col-sm-6', 'col-12', 'tm-gallery-item', 'PLAT');
        platItem.innerHTML = `
          <figure>
            <img src="img/gallery/01.jpg" alt="Image" class="img-fluid tm-gallery-img" />
            <figcaption>
              <h4 class="tm-gallery-title">${nomPlat}</h4>
              <p class="tm-gallery-description">${descripcioPlat}</p>
              <p class="tm-gallery-price">${preuPlat} €</p>
            </figcaption>
          </figure>
        `;

        // Afegim el plat al contenidor del grup
        groupContainer.appendChild(platItem);
      });

      // Afegim el contenidor de grup amb els seus plats al DOM
      galleryContainer.appendChild(groupContainer);
    });
  })
  .catch(error => console.error("Error carregant l'XML:", error));
