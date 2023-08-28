
const Url = "https://striveschool-api.herokuapp.com/api/"

async function fetchProducts() {
    try {
      const response = await fetch(`${Url}product/`, {
        headers: {
          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU0ZjFjOWRmZmI4YjAwMTQ0MTNkMjQiLCJpYXQiOjE2OTMwNzQ1NTQsImV4cCI6MTY5NDI4NDE1NH0.K2cNhz8K4yJnVquGWYBO7dBiLI7UWOvEK0XQEBKVts8"
        }
        })
        const productData = await response.json()
        console.log(productData)
        listaProdotti(productData)
    } catch (error) {
      console.log('Errore recupero dati prodotti: ', error);
    }
}


const listaProdotti = (products) => {
  const productList = document.getElementById("tabella")
  productList.innerHTML = ''

  products.forEach(prodotto => {

    const nome = decodeURIComponent(prodotto.name)
    const descrizione = decodeURIComponent(prodotto.description)
    const marchio = decodeURIComponent(prodotto.brand)
    const immagine = decodeURIComponent(prodotto.imageUrl)
    const prezzo = decodeURIComponent(prodotto.price)
    const id = decodeURIComponent(prodotto._id)

    const row = `
      <div class="card mb-3" id="pick">
        <img src="${immagine}" class="card-img-top" alt="...">
        <div class="card-body">
          <h4 class="card-title">${nome}</h4>
          <h5 class="card-title">${marchio}</h5>
          <p class="card-text">${descrizione}</p>
          <p class="card-text">${prezzo} €</p>
          <a href="prodotti.html?id=${id}" class="btn btn-danger">Info prodotto</a>
        </div>
      </div>
    `
    productList.innerHTML += row
  });
}


fetchProducts()





