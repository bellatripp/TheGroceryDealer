// --------------------------> Jquery <--------------------------
// function that includes showing/hiding (can be found on the Our Story page, move the mouse over the three pictures at the bottom of the page)
$(document).ready(function(){
    $(".ourStoryPics").mouseenter(function(){
        $(".jQueryAnimate").toggle();
    });
});
// I remembered how to do this from the previous task

// Function that includes an animation effect (can be found on the homepage, click on the three images at the bottom of the page)
$(document).ready(function(){
    $(".homepageImgs").click(function(){
        $(this).animate({left: '25px'});
    });
});
// https://www.w3schools.com/jquery/event_toggle.asp#:~:text=The%20toggle()%20method%20attaches,Effects%20method%20called%20toggle().

// Function that includes a chained effect (found on the homepage)
$(document).ready(function(){
    $(".jQueryBtn").click(function(){
        $(".jQueryBtn")
        .css("color", "red")
        .slideUp(1000)
        .slideDown(1000)
        .fadeOut(1000)
        .fadeIn(1000)
        .animate({
            left: "96%"
        });
    });
});
// https://www.tutorialrepublic.com/faq/how-to-create-jquery-slide-left-and-right-toggle-effect.php

// Function that created the dropdown menu
$(function() {
    $('.dropdownTitle').click(function() { $(this).next('.dropdownContent').slideToggle();
    });
    
    $(document).click(function(e) 
    { 
    var target = e.target; 
    if (!$(target).is('.dropdownTitle') && !$(target).parents().is('.dropdownTitle')) 
        { $('.dropdownContent').slideUp(); }
    });
    });
// Got a lot of help from https://codepen.io/feillyne/pen/JLGwap

$(document).ready(function(){
    $(".btnCoupon").click(function(){
        $(".DiscountTotalContainer").toggle()
    });
});

// ------------------------------>Cart Button and Cart Page Functions <------------------------------
// I got all of my help to create this cart button and checkout page from Telmo Sampaio's Javascript Shopping Cart Tutorial Udemy course: https://www.udemy.com/share/106iko3@G4Bll9_2wV34YXWTcxwwG4aD4MRNScgVfR9CHgcBJtJln4EmYWHkaX6n7SxLWrqvEQ==/

// linking the Quick Add to Cart button to JS
let carts = document.querySelectorAll('.btnCart');
let cartCost = sessionStorage.getItem('totalCost');

// Array for the products
let products = [
    {
        name: "Dragon Fruit",
        tag: "dragonfruit",
        price: 30,
        inCart: 0,

    },
    {
        name: "Mango",
        tag: "mango",
        price: 30,
        inCart: 0,
    },
    {
        name: "Pomergranate",
        tag: "pomergranate",
        price: 35,
        inCart: 0,
    },
    {
        name: "Litchi",
        tag: "litchi",
        price: 60,
        inCart: 0,
    },
    {
        name: "Broccoli",
        tag: "broccoli",
        price: 20,
        inCart: 0,
    },
    {
        name: "Baby Marrow",
        tag: "babymarrow",
        price: 35,
        inCart: 0,
    },
    {
        name: "Aubergine",
        tag: "aubergine",
        price: 15,
        inCart: 0,
    },
    {
        name: "Radish",
        tag: "radish",
        price: 40,
        inCart: 0,
    },
    {
        name: "Lentils",
        tag: "lentils",
        price: 30,
        inCart: 0,
    },
    {
        name: "Kidney Beans",
        tag: "kidneybeans",
        price: 30,
        inCart: 0,
    },
    {
        name: "Cannellini Beans",
        tag: "cannellinibeans",
        price: 30,
        inCart: 0,
    },
    {
        name: "Chickpeas",
        tag: "chickpeas",
        price: 30,
        inCart: 0,
    }
];



// Loop that lets items be added to the cart 
for (let i=0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i]);
    })
};

// Function that stores the items in the cart even when you refresh the page
function onLoadCartNumbers() {
    let productNumbers = sessionStorage.getItem('cartNumbers');

    if(productNumbers) {
        document.querySelector('.addToCart span').textContent = productNumbers;
    }
};

// Function that adds the items to cart and stores them, as well as makes the number in the cart button at the top of the page increase
function cartNumbers(product, action) {
    let productNumbers = sessionStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);

    let cartItems = sessionStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if(action == "decrease") {
        sessionStorage.setItem('cartNumbers', productNumbers - 1);
        document.querySelector('.addToCart span').textContent = productNumbers - 1;
    } else if(productNumbers) {
        sessionStorage.setItem("cartNumbers", productNumbers + 1);
        document.querySelector('.addToCart span').textContent = productNumbers + 1;
    } else{
        sessionStorage.setItem('cartNumbers', 1);
        document.querySelector('.addToCart span').textContent = 1
    }
    setItems(product)
};

// Function that sets the products into the local storage
function setItems(product){
    let cartItems = sessionStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if (cartItems != null) {
        let currentProduct = product.tag
        
            if (cartItems[currentProduct] == undefined) {
                cartItems = {
                    ...cartItems,
                    [currentProduct]: product
                }
            }
        cartItems[currentProduct].inCart += 1;
    } else {
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        }
    }
    sessionStorage.setItem("productsInCart", JSON.stringify(cartItems));
};

// Function that calculates the total cost of the basket
function totalCost(product, action) {
    let cartCost = sessionStorage.getItem('totalCost');

    if(action == "decrease"){
        cartCost = parseInt(cartCost);

        sessionStorage.setItem('totalCost', cartCost - product.price);
    } else if(cartCost != null) {
        cartCost = parseInt(cartCost)
        sessionStorage.setItem("totalCost", cartCost + product.price);
    } else {
        sessionStorage.setItem("totalCost", product.price);
    }
};

// Function for the Shopping Cart Checkout Page
function displayCart() {
    let cartItems = sessionStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems)

    let productContainer = document.querySelector(".products")

    let cartCost = sessionStorage.getItem('totalCost');
    cartCost = parseInt(cartCost)

    let VATTotal = parseFloat(cartCost * 0.14).toFixed(2);
    
    if(cartItems && productContainer){
        productContainer.innerHTML ='';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += 
            `<div class="products">
                <ion-icon name="close-circle"></ion-icon>
            <span>${item.name}</span>
            </div>
            <div class="price">R${item.price},00</div>
            <div class="quantity">
                <ion-icon class="decrease" 
                name="arrow-dropleft-circle"></ion-icon>
                    <span>${item.inCart}</span>
                <ion-icon class="increase" 
                name="arrow-dropright-circle"></ion-icon>   
            </div>
            <div class="total">R${item.inCart * item.price},00</div>
            `;
        });
        productContainer.innerHTML += `
        <div class="VATTotalContainer">
            <h4 class="VATTotalTitle" style="font-size: medium">Total VAT Included</h4>
            <h4 class"VATTotal" style="font-size: medium">R${VATTotal}</h4>
        </div>
        `;
        productContainer.innerHTML += `
        <div class="cartTotalContainer">
            <h4 class="cartTotalTitle">Basket Total</h4>
            <h4 class"cartTotal">R${cartCost}</h4>
        </div>
        `;
        productContainer.innerHTML += `
        <div class="deliveryRadioContainer">
            <form class="deliveryForm">
                <div>
                    <h4>Delivery or Collection?</h4>
                </div>
                <div>
                    <input type="radio" id="delivery" name="methodOfDelivery" value="Delivery">
                    <label for="delivery">Delivery</label><br>
                    <input type="radio" id="collection" name="methodOfDelivery" value="Collection">
                    <label for="collection">Collection</label><br>
                </div>
            </form>
        </div>
        `
        ;
        productContainer.innerHTML += `
        <div class="deliveryRadioContainer">
            <form class="deliveryForm">
                <div>
                    <h4>Cape Town or Surrounds?</h4>
                    <h5 style="font-size: small">(For delivery only, ignore this box if collection selected above and go straight to confirm order)</h5>
                </div>
                <div>
                    <input type="radio" id="capeTown" name="locationOfDelivery" value="Cape Town" onClick="window.location.reload()">
                    <label for="delivery">Cape Town (R60)</label><br>
                    <input type="radio" id="capeTownSurrounds" name="locationOfDelivery" value="Cape Town Surrounds" onClick="window.location.reload()">
                    <label for="collection">Cape Town Surrounds (R100)</label><br>
                </div>
            </form>
        </div>
        `
        productContainer.innerHTML += `
            <div class="confirmOrderContainer" style="text-align: center">
                <h4 style="font-size: medium">Once your delivery method has been selected and the cart has been updated, press confirm order.</h4>
                <button onclick="confirmationNotification()" class="confirmOrderBtn">Confirm Order</button>
            </div>
        `
    }
    
    deleteButton()
    manageQuantity()
}

// How I got the VAT to 2 decimal places: https://www.geeksforgeeks.org/how-to-parse-float-with-two-decimal-places-in-javascript/#:~:text=To%20limit%20the%20number%20of,2%20places%20after%20the%20decimal.

// Function that created the delete items in cart buttons
function deleteButton() {
    let deleteButton = document.querySelectorAll('.products ion-icon');
    let productName;
    let productNumbers = sessionStorage.getItem('cartNumbers');
    let cartItems = sessionStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let cartCost = sessionStorage.getItem('totalCost');

    for(let i=0; i < deleteButton.length; i++) {
        deleteButton[i].addEventListener('click', () => {
            productName = deleteButton[i].parentElement.textContent.trim().toLowerCase().replace(/ /g, '');

            sessionStorage.setItem('cartNumbers', productNumbers - cartItems[productName].inCart);
            sessionStorage.setItem('totalCost', cartCost - (cartItems[productName].price * cartItems[productName].inCart));

            delete cartItems[productName];
            sessionStorage.setItem('productsInCart', JSON.stringify(cartItems));
            
            displayCart();
            onLoadCartNumbers();
        });
    }
}

// Function that allows you to add or takeaway products that are already in your cart
function manageQuantity() {
    let decreaseButton = document.querySelectorAll('.decrease');
    let increaseButton = document.querySelectorAll('.increase');
    let cartItems = sessionStorage.getItem('productsInCart');
    let currentQuantity = 0;
    let currentProduct = '';
    cartItems = JSON.parse(cartItems);

    for(let i=0; i < decreaseButton.length; i++) {
        decreaseButton[i].addEventListener('click', () => {
            currentQuantity = decreaseButton[i].parentElement.querySelector('span').textContent;
            currentProduct = decreaseButton[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLowerCase().replace(/ /g, '').trim();

            if(cartItems[currentProduct].inCart > 1) {
                cartItems[currentProduct].inCart -= 1;
                cartNumbers(cartItems[currentProduct], "decrease");
                totalCost(cartItems[currentProduct], "decrease");
                sessionStorage.setItem('productsInCart', JSON.stringify(cartItems));
                displayCart();
            }
        });
    }
    
    for(let i=0; i < increaseButton.length; i++) {
        increaseButton[i].addEventListener('click', () => {
            currentQuantity = increaseButton[i].parentElement.querySelector('span').textContent;

            currentProduct = increaseButton[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLowerCase().replace(/ /g, '').trim();

                cartItems[currentProduct].inCart += 1;
                cartNumbers(cartItems[currentProduct]);
                totalCost(cartItems[currentProduct]);
                sessionStorage.setItem('productsInCart', JSON.stringify(cartItems));
                displayCart();
        });
    }
}

// -------------------------> Delivery and Coupon changes to cart total <-----------------------------
// Function to add delivery price for cape town delivery
function deliveryCapeTown(){
    let cartCost = sessionStorage.getItem('totalCost');
    let capeTownDelivery = document.getElementById("capeTown")
    let num1 = 60;
    cartCost = parseInt(cartCost);
    num1 = parseInt(num1);

    capeTownDelivery.addEventListener('click', () =>{
        sessionStorage.setItem('totalCost', cartCost + num1);
    });
    
}
// I worked out how to do this myself from what I learnt in the Shopping Cart Tutorial from Udemy that I used to help me with the above code

// Function to add delivery price for cape town surrounds delivery
function deliverySurrounds() {
    let cartCost = sessionStorage.getItem('totalCost');
    let surroundsDelivery = document.getElementById("capeTownSurrounds"); 
    let num2 = 100;
    cartCost = parseInt(cartCost);
    num2 = parseInt(num2);

    surroundsDelivery.addEventListener('click', () =>{
        sessionStorage.setItem('totalCost', cartCost + num2);
    });
}
// I worked out how to do this myself from what I learnt in the Shopping Cart Tutorial from Udemy that I used to help me with the above code

// Function that makes coupon code work (type in anything into discount code box and click apply for it to take R20 off the total cart)
function couponDiscount() {
    let cartCost = sessionStorage.getItem('totalCost');
    let couponDiscount = document.querySelector(".btnCoupon");
    let num3 = 20;
    cartCost = parseInt(cartCost);
    num3 = parseInt(num3);

    couponDiscount.addEventListener('click', () =>{
        sessionStorage.setItem('totalCost', cartCost - num3);
    });
}
// I worked out how to do this myself from what I learnt in the Shopping Cart Tutorial from Udemy that I used to help me with the above code

// Function that alerts the customer of the new total of their cart when they add something to their cart
function totalAlert() {
    let cartCost = sessionStorage.getItem('totalCost');
    cartCost = parseInt(cartCost);

    alert("Your new total is: R " + cartCost + ".00");
}


onLoadCartNumbers()
displayCart()
deliveryCapeTown()
deliverySurrounds()
couponDiscount()

// ---------------------->Confirmation Button<----------------------
function confirmationNotification() {
    confirm("Order Successful! Your unique confirmation number is " + Math.floor(Date.now() * Math.random()));
}
// https://stackoverflow.com/questions/8012002/create-a-unique-number-with-javascript-time#:~:text=You%20will%20do%20have%20duplicates,random()%20makes%20it%20unique.