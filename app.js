const products = [
  { id: 1, name: "Agarico", price: 10.99,stack: 100, img: 'img/Agáricos.jpeg' },
  { id: 2, name: "Apagador", price: 9.99, stack: 100,img: 'img/Apagador.jpeg' },
  { id: 3, name: "Armillaria", price: 9.99, stack: 100, img: 'img/Armillaria.jpeg' },
  { id: 4, name: "Buletus", price: 9.99, stack: 100, img: 'img/Boletus.jpeg' },
  { id: 5, name: "Champiñones común", price: 9.99, stack: 100, img: 'img/Champiñón común.jpeg' },
  { id: 6, name: "Cordyceps", price: 9.99, stack: 100, img: 'img/Cordyceps.jpeg' },
  { id: 7, name: "Cucumelo", price: 9.99, stack: 100, img: 'img/Cucumelo.jpeg' },
  { id: 8, name: "Falsa oronja", price: 9.99, stack: 100, img: 'img/Falsa oronja.jpeg' },
  { id: 9, name: "Flammulina", price: 9.99, stack: 100, img: 'img/Flammulina velutipes.jpeg' },
  { id: 10, name: "Funghi porcini", price: 9.99, stack: 100, img: 'img/Funghi porcini.jpeg' },
  { id: 11, name: "Hongo de la muerte", price: 9.99, stack: 100, img: 'img/Hongo de la muerte.jpeg' },
  { id: 12, name: "Hongo delicioso", price: 9.99, stack: 100, img: 'img/Hongo delicioso.jpeg' },
  { id: 13, name: "Hongo ostra", price: 9.99, stack: 100, img: 'img/Hongo ostra.jpeg' },
  { id: 14, name: "Hongo reishi", price: 9.99, stack: 100, img: 'img/Hongo reishi.jpeg' },
  { id: 15, name: "Melena de león", price: 9.99, stack: 100, img: 'img/Melena de león.jpeg' },
  { id: 16, name: "Rebozuelo", price: 9.99, stack: 100, img: 'img/Rebozuelo.jpeg' },
  { id: 17, name: "Seta de cardo", price: 9.99, stack: 100, img: 'img/Seta de cardo.jpeg' },
  { id: 18, name: "Shiitake", price: 9.99, stack: 100, img: 'img/Shiitake.jpeg' },
  { id: 19, name: "Tricholoma matsutake", price: 9.99, stack: 100, img: 'img/Tricholoma matsutake.jpeg' },
  { id: 20, name: "Trufas", price: 9.99, stack: 100, img: 'img/Trufas.jpeg' }
];

let cart = JSON.parse(localStorage.getItem('cart')) || []; 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
function renderizarStore(products) {
  let html = '';
  
  products.forEach(function(product) {
    html += `
      <div class="Store-item">
        <img src="${product.img}" width="150px" />
        <h3>${product.name}</h3>
        <p>Precio: ${product.price}</p> 
        <p>Stock: ${product.stack}</p>
        <button class="addCar" data-id="${product.id}">Añadir al carrito</button>
      </div>
    `;
  });
  
  $('#store').html(html);

  $('.addCar').on('click', function() {
    const productId = $(this).data('id');
    addToCart(productId);
  });
}

function addToCart(id) {
  
  const product = products.find(p => p.id === id);
  if (product && product.stack > 0) {

    product.stack -= 1;

    const cartItem = cart.find(item => item.id === id);
    if (cartItem) {
      cartItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    actualizarCarritoLocalStorage();
    renderizarCarrito();
    renderizarStore(products); 
  } else {
    alert("Lo sentimos, no hay suficiente stock disponible.");
  }
}

function removeFromCart(index) {
  const product = cart[index];


  const storeProduct = products.find(p => p.id === product.id);
  if (storeProduct) {
    storeProduct.stack += product.quantity;
  }


  cart.splice(index, 1);
  actualizarCarritoLocalStorage();
  renderizarCarrito();
  renderizarStore(products); 
}

function actualizarCarritoLocalStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function renderizarCarrito() {
  let html = '';

  if (cart.length === 0) {
    html = '<p class="empty">El carrito está vacío</p>';
  } else {
    cart.forEach(function(item, index) {
      html += `
        <div class="Cart-item">
         <img src="${item.img}" width="150px" />
          <h4>${item.name}</h4>
          <p>Precio: ${item.price}</p>
          <p>Cantidad: ${item.quantity}</p>
          <button class="removeItem" data-index="${index}">Eliminar</button>
        </div>
            <br>
                <br>

      `;
    });
    const total = calcularTotalCarrito();
    html += `<p class="total">Total del carrito: $${total}</p>`;
  }


  $('#store-car').html(html);


  $('.removeItem').on('click', function() {
    const itemIndex = $(this).data('index');
    removeFromCart(itemIndex);
  });
}

$(document).ready(function() {
  renderizarStore(products);
  renderizarCarrito();
});
function calcularTotalCarrito() {
  let total = 0;
  cart.forEach(function(item) {
    total += item.price * item.quantity;
  });
  return total 
}
