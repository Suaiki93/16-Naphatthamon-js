let productList = [];
let productId = 1;

document.getElementById("form").addEventListener("submit", function (event) {
  event.preventDefault();
  const productName = document.getElementById("productName").value;
  const price = document.getElementById("price").value;
  const image = document.getElementById("image").value;
  const errorMessage = document.getElementById("errorMessage");

  // Validation
  if (!isImgUrl(image)) {
    errorMessage.textContent = "Please enter a valid image URL.";
    return;
  }

  const newProduct = {
    id: productId++,
    check: false,
    productName,
    price,
    image,
  };

  productList.push(newProduct);

  displayUpload(newProduct);

  // console.log(productList);
});

function displayUpload(product) {
  const displaySection = document.getElementById("displaySection");
  const card = document.createElement("div");
  card.className = "bg-white p-4 rounded-lg shadow-lg";

  card.innerHTML = `
  <div class="flex items-center space-x-4">
  <input data-id="${product.id}" onchange="chooseProduct(event)" type="checkbox" class="product-checkbox" />
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

// 3.2
function chooseProduct(event) {
  const checkbox = event.target;
  const uploadId = parseInt(checkbox.getAttribute("data-id"));
  const product = productList.find((product) => product.id === uploadId);

  if (checkbox.checked) {
    product.checked = true;
  } else {
    product.checked = false;
  }
}

document.getElementById("addBtn").addEventListener("click", () => {
  shop = productList.filter((product) => product.checked);
  displayCart(shop);
});

function displayCart(products) {
  const displayCart = document.getElementById("displayCart");
  displayCart.innerHTML = "";

  products.forEach((product) => {
    const card = document.createElement("div");
    card.className = "bg-white p-4 rounded-lg shadow-lg";

    card.innerHTML = `
      <div class="flex items-center space-x-4">
        <img src="${product.image}" alt="${product.productName}" class="w-16 h-16 object-cover rounded" />
        <div>
          <h3 class="font-bold">${product.productName}</h3>
          <p class="text-gray-600">${product.price}</p>
        </div>
      </div>
    `;

    displayCart.appendChild(card);
  });
}

// 3.3

document.getElementById("calculatePriceBtn").addEventListener("click", () => {
  const totalPrice = calculateTotalPrice();
  document.getElementById(
    "totalPrice"
  ).textContent = `You have to pay: ${totalPrice}`;
});

function calculateTotalPrice() {
  let totalPrice = 0;
  productList.forEach((product) => {
    if (product.checked) {
      totalPrice += parseFloat(product.price);
    }
  });
  return totalPrice.toFixed(2); // Return total price formatted to two decimal places
}

function isImgUrl(image) {
  try {
    const input = new URL(image);
    return /\.(jpg|jpeg|png|gif)$/.test(input.pathname);
  } catch (_) {
    return false;
  }
}
