
const Url = "https://striveschool-api.herokuapp.com/api/"

const main = document.getElementById('main-product');

const params = new URLSearchParams(location.search)
const id = params.get("id")


async function richiamaProdotto(id) {
    try {
        const response = await fetch(`${Url}product/${id}`, {
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU0ZjFjOWRmZmI4YjAwMTQ0MTNkMjQiLCJpYXQiOjE2OTMwNzQ1NTQsImV4cCI6MTY5NDI4NDE1NH0.K2cNhz8K4yJnVquGWYBO7dBiLI7UWOvEK0XQEBKVts8"
            }
        })
        const productData = await response.json()
        console.log(productData)
        printFormProduct(productData)
    } catch (error) {
        console.log('Errore recupero dati prodotti: ', error);
    }
}



const printFormProduct = (product) => {

    const nome = decodeURIComponent(product.name)
    const descrizione = decodeURIComponent(product.description)
    const brand = decodeURIComponent(product.brand)
    const immagine = decodeURIComponent(product.imageUrl)
    const prezzo = decodeURIComponent(product.price)
    const id = decodeURIComponent(product._id)

    main.innerHTML = `
    <div class="row g-0" id="basket">
    <div class="col-md-4">
        <img src="${immagine}" class="img-fluid rounded-start" alt="...">

</div>
<div class="corpo">
    <h1 class="card-title">${nome}</h1>
    <p class="card-text">${brand}</p>
    <p class="card-text price-text"><small class="text-body"><span class="price-text">Prezzo:</span> ${prezzo} €</small></p>
    <p class="description-title">Descrizione</p>
    <p class="card-text">${descrizione}</p>
    <p class="card-text">ID:${id}</p>
</div>
                    `
};



richiamaProdotto(id)





