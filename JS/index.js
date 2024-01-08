let cartAllProduct = [];

function addToCart(target) {
    const getImage = target.parentNode.parentNode.parentNode.childNodes[1].childNodes[1].currentSrc;
    const getTitle = target.parentNode.parentNode.parentNode.childNodes[3].childNodes[1].innerHTML;
    const getPrice = parseFloat(target.parentNode.parentNode.parentNode.childNodes[3].childNodes[3].childNodes[0].innerText.replace('$', ''));

    const cartList = document.getElementById('cartProducts');
    const p = document.createElement('p');

    let htmlCode = '<div class="mb-2 w-72 h-40 border-zinc-200 border-4 p-2 flex gap-2">' +
                       '<div class="w-1/3 h-full">' +
                           '<figure class="w-full h-full">' +
                               '<img class="object-cover w-24 h-32 p-1 cart-img" src="" alt="">' +
                           '</figure>' +
                       '</div>' +
                       '<div class="w-2/3">' +
                           '<p class="font-bold cart-name"></p>' +
                           '<p><span class="cart-price"></span> $/each</p>' +
                           '<div class="flex justify-between items-end mt-8">' +
                               '<div>' +
                                   '<p class="text-2xl"><span class="decrease">-</span><span class="quantity p-1"></span><span class="increase">+</span></p>' +
                               '</div>' +
                               '<div>' +
                                   '<p class="flex justify-end items-end totalPrice text-xl font-medium"> $</p>' +
                               '</div>' +
                           '</div>' +
                           '<div class="text-xl font-bold my-1 removeFromCart">Remove</div>'+
                       '</div>' +
                   '</div>';

    p.innerHTML = htmlCode;
    cartList.appendChild(p);

    const cartImg = p.querySelector('.cart-img');
    const cartName = p.querySelector('.cart-name');
    const cartPrice = p.querySelector('.cart-price');
    const quantityElement = p.querySelector('.quantity');
    const totalPriceElement = p.querySelector('.totalPrice');
    const removeFromCartButton = p.querySelector('.removeFromCart');
    const decreaseButton = p.querySelector('.decrease');
    const increaseButton = p.querySelector('.increase');

    cartName.innerText = getTitle;
    cartImg.src = getImage;
    cartPrice.innerText = getPrice.toFixed(2); 
    quantityElement.innerText = 1;
    updateTotalPrice(quantityElement, totalPriceElement, getPrice);

    decreaseButton.addEventListener('click', () => decreaseQuantity(quantityElement, totalPriceElement, getPrice));
    increaseButton.addEventListener('click', () => increaseQuantity(quantityElement, totalPriceElement, getPrice));
    removeFromCartButton.addEventListener('click', () => removeFromCart(p,target));

    target.disabled = true;
    cartAllProduct.push(p);
    const indicator = document.getElementById('ind');
    indicator.innerText = cartAllProduct.length;

    // Calculate and update the total price section
    updateTotalPriceSection();
}

function removeFromCart(item,target) {
    const cartList = document.getElementById('cartProducts');
    cartList.removeChild(item);

    // Update the cartAllProduct array by removing the deleted item
    cartAllProduct = cartAllProduct.filter(cartItem => cartItem !== item);

    const indicator = document.getElementById('ind');
    indicator.innerText = cartAllProduct.length;

    // Calculate and update the total price section
    updateTotalPriceSection();
    target.disabled=false
   
}

function decreaseQuantity(quantityElement, totalPriceElement, pricePerItem) {
    let quantity = parseInt(quantityElement.innerText);
    if (quantity > 1) {
        quantity--;
        quantityElement.innerText = quantity;
        updateTotalPrice(quantityElement, totalPriceElement, pricePerItem);
    }
}

function increaseQuantity(quantityElement, totalPriceElement, pricePerItem) {
    let quantity = parseInt(quantityElement.innerText);
    quantity++;
    quantityElement.innerText = quantity;
    updateTotalPrice(quantityElement, totalPriceElement, pricePerItem);
}

function updateTotalPrice(quantityElement, totalPriceElement, pricePerItem) {
    let quantity = parseInt(quantityElement.innerText);
    const totalPrice = (quantity * pricePerItem).toFixed(2);
    totalPriceElement.innerText = '$' + totalPrice;

   
    updateTotalPriceSection();
}

function updateTotalPriceSection() {
    const tp = document.getElementById('totalPrice');
    const ind = document.getElementById('ind');

    let total = 0;
    let totalQuantity = 0;

    
    cartAllProduct.forEach(item => {
        const quantityElement = item.querySelector('.quantity');
        const totalPriceElement = item.querySelector('.totalPrice');

        totalQuantity += parseInt(quantityElement.innerText);
        total += parseFloat(totalPriceElement.innerText.replace('$', ''));
    });

    
    tp.innerText =total.toFixed(2);

   
    ind.innerText = totalQuantity;
}
