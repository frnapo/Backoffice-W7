const fetchData = () => {
  fetch(URL, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${authToken}`,
      "Content-Type": `application/json`,
    },
  })
    .then((response) => {
      if (response.status >= 400 && response.status < 500) {
        throw new Error(`Errore client! Stato: ${response.status}`);
      } else if (response.status >= 500 && response.status < 600) {
        throw new Error(`Errore server! Stato: ${response.status}`);
      } else if (!response.ok) {
        throw new Error(`Errore HTTP! Stato: ${response.status}`);
      } else {
        console.log(`Richiesta HTTP riuscita con stato: ${response.status}`);
      }
      return response.json();
    })
    .then((products) => {
      const allProducts = document.getElementById("productsList");

      products.forEach((product) => {
        const div = document.createElement("div");
        div.className = "col-sm-6 col-md-4 col-lg-3 mt-3";

        div.innerHTML = `
        <div class="card h-100 shadow border-0 bg-white text-dark">
        <img src="${product.imageUrl}" class="card-img-top img-fluid" alt="${product.name}" style="object-fit: contain; height: 300px;">
        <div class="card-body d-flex flex-column">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text">${product.description}</p>
            <div class="d-flex justify-content-between mt-auto">
                <p class="card-text text-secondary">${product.price} €</p>
                <a href="./details.html?productId=${product._id}" class="text-decoration-none text-primary"><strong>Mostra altro</strong></a>
            </div>
        </div>
    </div>
          `;

        allProducts.appendChild(div);
      });

      console.log(products);
    })
    .catch((error) => {
      console.log("Errore fetch!", error.message);
    });
};
