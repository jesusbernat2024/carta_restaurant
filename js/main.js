// URL del fitxer XML al teu repositori
const url = 'https://raw.github.com/jesusbernat2024/carta_restaurant/main/carta.xml';

fetch(url, { mode: 'no-cors' })
  .then(response => response.text())
  .then(data => { 
    console.log(data);
    })
  .catch(error => console.error("Error carregant l'XML:", error));
