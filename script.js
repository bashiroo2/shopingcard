// Get the buttons for adding products to the cart
const addToCartButtons = document.querySelectorAll('.product button');

// Get the cart items list
const cartItemsList = document.getElementById('cart-items');

// Create an array to store the cart items
let cartItems = [];

// Function to add a product to the cart
function addToCart(event) {
  const product = event.target.parentNode;
  const productName = product.querySelector('h2').textContent;
  const productPrice = product.querySelector('.price').textContent;

  // Check if the product is already in the cart
  const productInCart = cartItems.find(item => item.name === productName);

  if (productInCart) {
    // If the product is already in the cart, increase the quantity
    productInCart.quantity += 1;
  } else {
    // If the product is not in the cart, add it
    const newCartItem = {
      name: productName,
      price: productPrice,
      quantity: 1
    };
    cartItems.push(newCartItem);
  }

  // Update the cart display
  displayCartItems();

  // Optional: Show a confirmation message
  console.log(`${productName} added to cart.`);
}

// Function to display the cart items
function displayCartItems() {
  // Clear the cart items list
  cartItemsList.innerHTML = '';

  // Loop through the cart items and add them to the list
  cartItems.forEach(item => {
    const cartItem = document.createElement('li');
    cartItem.textContent = `${item.name} - Price: ${item.price} - Quantity: ${item.quantity}`;
    cartItemsList.appendChild(cartItem);
  });
}

// Add event listeners to the "Add to Cart" buttons
addToCartButtons.forEach(button => {
  button.addEventListener('click', addToCart);
});
// Function to increase the quantity of an item in the cart
function increaseQuantity(event) {
  const item = event.target.parentNode;
  const itemName = item.querySelector('.item-name').textContent;
  const cartItem = cartItems.find(item => item.name === itemName);
  
  if (cartItem) {
    cartItem.quantity += 1;
    displayCartItems();
  }
}

// Function to decrease the quantity of an item in the cart
function decreaseQuantity(event) {
  const item = event.target.parentNode;
  const itemName = item.querySelector('.item-name').textContent;
  const cartItem = cartItems.find(item => item.name === itemName);
  
  if (cartItem) {
    if (cartItem.quantity > 1) {
      cartItem.quantity -= 1;
    } else {
      // If the quantity becomes zero, remove the item from the cart
      const index = cartItems.indexOf(cartItem);
      cartItems.splice(index, 1);
    }
    displayCartItems();
  }
}

// Function to display the cart items
function displayCartItems() {
  // Clear the cart items list
  cartItemsList.innerHTML = '';

  // Loop through the cart items and add them to the list
  cartItems.forEach(item => {
    const cartItem = document.createElement('li');
    cartItem.innerHTML = `
      <span class="item-name">${item.name}</span>
      <span class="item-quantity">${item.quantity}</span>
      <button class="quantity-button increase">+</button>
      <button class="quantity-button decrease">-</button>
    `;
    cartItemsList.appendChild(cartItem);
    
    const increaseButton = cartItem.querySelector('.increase');
    increaseButton.addEventListener('click', increaseQuantity);
    
    const decreaseButton = cartItem.querySelector('.decrease');
    decreaseButton.addEventListener('click', decreaseQuantity);
  });
}
// Function to display the cart items and total
function displayCartItems() {
  // Clear the cart items list
  cartItemsList.innerHTML = '';

  // Initialize total price to 0
  let totalPrice = 0;

  // Loop through the cart items and add them to the list
  cartItems.forEach(item => {
    const cartItem = document.createElement('li');
    cartItem.innerHTML = `
      <span class="item-name">${item.name}</span>
      <span class="item-quantity">${item.quantity}</span>
      <span class="item-price">$${item.price}</span>
      <button class="quantity-button increase">+</button>
      <button class="quantity-button decrease">-</button>
    `;
    cartItemsList.appendChild(cartItem);
    
    const increaseButton = cartItem.querySelector('.increase');
    increaseButton.addEventListener('click', increaseQuantity);
    
    const decreaseButton = cartItem.querySelector('.decrease');
    decreaseButton.addEventListener('click', decreaseQuantity);

    // Calculate and update the total price
    const itemPrice = parseFloat(item.price.replace('$', ''));
    totalPrice += itemPrice * item.quantity;
  });

  // Display the total price
  const totalElement = document.createElement('li');
  totalElement.textContent = `Total: $${totalPrice.toFixed(2)}`;
  cartItemsList.appendChild(totalElement);
}
// Get the clear cart button
const clearCartButton = document.getElementById('clear-cart');

// Function to clear the cart
function clearCart() {
  // Empty the cart items array
  cartItems = [];

  // Update the cart display
  displayCartItems();
}

// Add event listener to the clear cart button
clearCartButton.addEventListener('click', clearCart);

// Get the buy button
const buyButton = document.getElementById('buy-button');

// Add event listener to the buy button
buyButton.addEventListener('click', buyButtonClicked);

// Function to handle the buy button click event
function buyButtonClicked() {
  // Prompt the user to enter their name, address, and phone number
  const name = prompt('Please enter your name:');
  const address = prompt('Please enter your address:');
  const phoneNumber = prompt('Please enter your phone number:');

  // Validate the input
  if (name && address && phoneNumber) {
    // If all fields are filled, show a success message
    alert(`Thank you for your purchase, ${name}! Your order will be shipped to ${address}. We will contact you at ${phoneNumber} if needed.`);
  } else {
    // If any field is empty, show an error message
    alert('Please fill in all the required information.');
  }
}

