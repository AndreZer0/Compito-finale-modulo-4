
const Url = "https://striveschool-api.herokuapp.com/api/"

const nomeInput = document.getElementById('name');
const descrizioneInput = document.getElementById('description');
const brandInput = document.getElementById('brand');
const immagineInput = document.getElementById('imageUrl');
const prezzoInput = document.getElementById('price');

const form = document.getElementById("product-form")
const button = document.getElementById("buttonSubmit")

const container = document.getElementById("main-container")

const title = document.getElementById("titleAddModify")
const params = new URLSearchParams(location.search)
const id = params.get("id")


const check = () => {
  if (nomeInput.value === "" || descrizioneInput.value == "" || brandInput.value == "" || immagineInput.value == "" || prezzoInput.value == "" || checkImage == false) {
    return false
  } else {
    return true
  }
}

form.addEventListener('submit', async (event) => {

  event.preventDefault();

  const shirt = {

    name: encodeURIComponent(nomeInput.value),
    description: encodeURIComponent(descrizioneInput.value),
    brand: encodeURIComponent(brandInput.value),
    imageUrl: encodeURIComponent(immagineInput.value),
    price: encodeURIComponent(prezzoInput.value)
  }

  let URL = ""
  let method = ""
 
  
  if(id !== null && id !== "add") {
    URL = Url+"product/"+id
    method = "PUT"
  } else {
    URL = Url+"product/"
    method = "POST"
  }

  
  if(check()) {
    try {
      const response = await fetch(URL, {
        method: method,
        body: JSON.stringify(shirt),
        headers: {
          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU0ZjFjOWRmZmI4YjAwMTQ0MTNkMjQiLCJpYXQiOjE2OTMwNzQ1NTQsImV4cCI6MTY5NDI4NDE1NH0.K2cNhz8K4yJnVquGWYBO7dBiLI7UWOvEK0XQEBKVts8",
          "Content-type": "application/json; charset=UTF-8"
        }
      })
  
      if (response.ok) {
        window.location.href = 'modproducts.html'
      }
    } catch (error) {
      console.log('Errore durante il salvataggio: ', error);
      alert('Si è verificato un errore durante il salvataggio.')
    }
  } else {
    console.log("errore");
  }
  

})

async function fetchOne(id) {
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
  
  nomeInput.value = decodeURIComponent(product.name)
  descrizioneInput.value = decodeURIComponent(product.description)
  brandInput.value = decodeURIComponent(product.brand)
  immagineInput.value = decodeURIComponent(product.imageUrl)
  prezzoInput.value = decodeURIComponent(product.price)

        
};


if(id != null && id != "add") {
  title.innerHTML = "Modifica Prodotto"
  button.innerHTML = "Salva"
  fetchOne(id)
}

if(id == null) {
  form.classList.add("d-none")
  fetchProducts()
}


async function fetchProducts() {
  try {
    const response = await fetch(`${Url}product/`, {
      headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU0ZjFjOWRmZmI4YjAwMTQ0MTNkMjQiLCJpYXQiOjE2OTMwNzQ1NTQsImV4cCI6MTY5NDI4NDE1NH0.K2cNhz8K4yJnVquGWYBO7dBiLI7UWOvEK0XQEBKVts8"
      }
      })
      const productData = await response.json()
      listaProdotti(productData)
  } catch (error) {
    console.log('Errore recupero dati prodotti: ', error);
  }
}


const listaProdotti = (allProducts) => {
  let tableHtml = ``
  tableHtml = `
              <table class="table mt-3" >
                <thead>
                  <tr>
                    <th scope="col">Immagine</th>
                    <th scope="col">Nome prodotto</th>
                    <th scope="col">Prezzo (€)</th>
                    <th scope="col">Opzioni</th>
                  </tr>
                </thead>
              <tbody>
              `
  
  allProducts.forEach(element => {
   
    const nome = decodeURIComponent(element.name)
    const descrizione = decodeURIComponent(element.description)
    const brand = decodeURIComponent(element.brand)
    const immagine = decodeURIComponent(element.imageUrl)
    const prezzo = decodeURIComponent(element.price)
    const id = decodeURIComponent(element._id)
    const retro=decodeURIComponent(element.userId)
    const row = `
                <tr>
                  <th scope="row"><img src="${immagine}" class="imgspogliatoio"></th>
                  <td>${nome}</td>
                  <td>${prezzo}</td>
                  <td><a class="btn btn-success" href="modproducts.html?id=${id}" role="button"><i class="fa-solid fa-pen-to-square"></i></a> <button type="button" class="btn btn-danger" onClick="elimina('${id}')"><i class="fa-solid fa-trash"></i></button></td>
                </tr>
                `
    tableHtml += row
    
});
  tableHtml += `
      </tbody>
    </table>
  `
  container.innerHTML = tableHtml
}



async function elimina(id) {
  if (confirm('Sei sicuro di voler eliminare questo prodotto?')) {
    try {
      const response = await fetch(`${Url}product/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU0ZjFjOWRmZmI4YjAwMTQ0MTNkMjQiLCJpYXQiOjE2OTMwNzQ1NTQsImV4cCI6MTY5NDI4NDE1NH0.K2cNhz8K4yJnVquGWYBO7dBiLI7UWOvEK0XQEBKVts8"
        }
      })
  
      if (response.ok) {
        window.location.href = 'modproducts.html'
      }
    } catch (error) {
      console.log('Errore durante eliminazione prodotto: ', error);
      alert('Si è verificato un errore durante eliminazione.')
    }
  }
}


let timeout;
let checkImage

const inputImage = document.getElementById("imageUrl")


inputImage.addEventListener('input', () => {
  clearTimeout(timeout);
  
  timeout = setTimeout(() => {
    if(inputImage.value.length >= 1) {
       checkImage = true
      } 
  }, 500);
});

