let productList = [];
let productId = 1;

document.getElementById("form").addEventListener("submit", function (event) {
  event.preventDefault();
  const productName = document.getElementById("productName").value;
  const price = document.getElementById("price").value;
  const image = document.getElementById("image").value;
  const errorMessage = document.getElementById("errorMessage");

  //   // Validation
  //   if (!isImgUrl(image)) {
  //     errorMessage.textContent = "Please enter a valid image URL.";
  //     return;
  //   }

  const newProduct = {
    id: productId++,
    productName,
    price,
    image,
  };

  productList.push(newProduct);

  displayUpload(newProduct);

  console.log(productList);
});

function displayUpload(product) {
  const displaySection = document.getElementById("displaySection");
  const card = document.createElement("div");
  card.className = "bg-white p-4 rounded-lg shadow-lg";

  card.innerHTML = `
  <div class="flex items-center space-x-4">
  <input type="checkbox" class="product-checkbox" />
  <img
    src="${product.image}"
    alt="${product.productName}"
    class="w-16 h-16 object-cover rounded"
  />
  <div>
    <h3 class="font-bold">${product.productName}</h3>
    <p class="text-gray-600">$${product.price}</p>
  </div>
</div>  `;

  displaySection.appendChild(card);
}

// function isImgUrl(image) {
//   try {
//     const input = new URL(image);
//     return /\.(jpg|jpeg|png|gif)$/.test(input.pathname);
//   } catch (_) {
//     return false;
//   }
// }
