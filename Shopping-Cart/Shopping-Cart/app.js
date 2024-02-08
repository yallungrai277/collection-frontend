const client = contentful.createClient({
    // This is the space ID. A space is like a project folder in Contentful terms
    space: "wdwxzblt86kf",
    // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
    accessToken: "vh5ac-1fhxx1nkmSeqzN96S5Q2y7GMQ7BKiB1DWtOR4"
});
// This API call will request an entry with the specified ID from the space defined at the top, using a space-specific access token.

const cartBtn = document.querySelector('.cart-btn')
const closeCartBtn = document.querySelector('.close-cart')
const clearCartBtn = document.querySelector('.clear-cart')
const cartDOM = document.querySelector('.cart')
const cartOverlay = document.querySelector('.cart-overlay')
const cartItems = document.querySelector('.cart-items')
const cartTotal = document.querySelector('.cart-total')
const cartContent = document.querySelector('.cart-content')
const productsDOM = document.querySelector('.products-center')

//cart
let cart = []
//
let buttonDOMS = []

//getting the products class
class Products {
    async getProducts () {
        try {
            let contentful = await client.getEntries({
                content_type: 'javascriptShoppingProducts'
            })

            // let result = await fetch('products.json')
            // let data = await result.json()

            let items = contentful.items
            items = items.map(item => {
                const { title, price } = item.fields
                const { id } = item.sys
                const image = item.fields.image.fields.file.url
                return { id, title, price, image }
            })
            return items
        } catch (error) {
            console.log(error)
        }
    }
}

// display Products class
class UI {

    setupAPP () {
        cart = Storage.getCart()
        this.setCartValues(cart)
        this.populateCart(cart)
        cartBtn.addEventListener('click', this.showCart)
        closeCartBtn.addEventListener('click', this.hideCart)
    }

    displayProducts (products) {
        let result = ''
        products.forEach(product => {
            result += `
            <article class="product">
                <div class="img-container">
                    <img
                    src="${product.image}"
                    alt="product"
                    class="product-img"
                    />
                    <button class="bag-btn" data-id="${product.id}">
                    <i class="fas fa-shopping-cart"></i>
                    Add to bag
                    </button>
                </div>
                <div class="product-details">
                    <h3>${product.title}</h3>
                    <h4>$ ${product.price}</h4>
                </div>
            </article>`
        });
        productsDOM.innerHTML = result

    }

    getBagButton () {
        const buttons = [...document.querySelectorAll('.bag-btn')]
        buttonDOMS = buttons
        buttons.forEach(button => {
            let id = button.dataset.id
            let inCart = cart.find(item => item.id === id)
            if (inCart) {
                button.innerText = "Already in Cart"
                button.style.disabled = true
            }
            else {
                button.addEventListener('click', (e) => {
                    e.target.innerText = 'In Cart'
                    e.target.disabled = true
                    //get product from products
                    let cartItem = { ...Storage.getProduct(id), amount: 1 }
                    //add product to the cart
                    cart = [...cart, cartItem]
                    //save cart in local storage
                    Storage.saveCart(cart)
                    //set cart values
                    this.setCartValues(cart)
                    //display cart items
                    this.addCartItem(cartItem)
                    //show the cart
                    this.showCart()
                })
            }
        });
    }

    setCartValues (cart) {
        let tempTotal = 0
        let itemsTotal = 0
        cart.map(item => {
            tempTotal += item.price * item.amount
            itemsTotal += item.amount
        })
        cartTotal.innerText = parseFloat(tempTotal.toFixed(2))
        cartItems.innerText = itemsTotal
    }

    addCartItem (item) {
        const div = document.createElement('div')
        div.classList.add('cart-item')
        div.innerHTML = `
            <img src="${item.image}" alt="Product" />
            <div>
              <h4>Queen Bed</h4>
              <h5>$ ${item.price}</h5>
              <span class="remove-item" data-id="${item.id}">Remove</span>
            </div>
            <div>
              <i class="fas fa-chevron-up" data-id="${item.id}"></i>
              <p class="item-amount">${item.amount}</p>
              <i class="fas fa-chevron-down" data-id="${item.id}"></i>
            </div>`
        cartContent.appendChild(div)
    }

    showCart () {
        cartOverlay.classList.add('transparentBcg')
        cartDOM.classList.add('showCart')
    }

    populateCart () {
        cart.forEach(item => this.addCartItem(item))
    }

    hideCart () {
        cartOverlay.classList.remove('transparentBcg')
        cartDOM.classList.remove('showCart')
    }

    cartLogic () {
        //Clear cart button
        clearCartBtn.addEventListener('click', () => {
            this.clearCart()
        })
        //cart functionality
        cartContent.addEventListener('click', (event) => {
            if (event.target.classList.contains('remove-item')) {
                let removeItem = event.target
                let id = removeItem.dataset.id
                cartContent.removeChild(removeItem.parentElement.parentElement)
                this.removeItem(id)
            } else if (event.target.classList.contains('fa-chevron-up')) {
                let addAmount = event.target
                let id = addAmount.dataset.id
                let tempItem = cart.find(item => item.id === id)
                tempItem.amount = tempItem.amount + 1
                Storage.saveCart(cart)
                this.setCartValues(cart)
                addAmount.nextElementSibling.innerText = tempItem.amount
            } else if (event.target.classList.contains('fa-chevron-down')) {
                let lowerAmount = event.target
                let id = lowerAmount.dataset.id
                let tempItem = cart.find(item => item.id === id)
                tempItem.amount = tempItem.amount - 1
                if (tempItem.amount > 0) {
                    Storage.saveCart(cart)
                    this.setCartValues(cart)
                    lowerAmount.previousElementSibling.innerText = tempItem.amount
                }
                else {
                    cartContent.removeChild(lowerAmount.parentElement.parentElement)
                    this.removeItem(id)
                }
            }
        })
    }

    clearCart () {
        let cartItemIDs = cart.map(item => item.id)
        cartItemIDs.forEach(id =>
            this.removeItem(id)
        )
        while (cartContent.lastChild) {
            cartContent.removeChild(cartContent.lastChild)
        }
        this.hideCart()
    }

    removeItem (id) {
        cart = cart.filter(item => item.id != id)
        this.setCartValues(cart)
        Storage.saveCart(cart)
        let button = this.getSingleButton(id)
        button.innerHTML = `<i class="fas fa-shopping-cart"></i> Add to Bag`
        button.disabled = false
    }

    getSingleButton (id) {
        return buttonDOMS.find(button => button.dataset.id === id)
    }
}

// Storage class
class Storage {
    static saveProducts (products) {
        localStorage.setItem('products', JSON.stringify(products))
    }

    static getProduct (id) {
        let products = JSON.parse(localStorage.getItem('products'))
        if (products.length > 0) {
            return products.find(product => product.id === id)
        }
    }

    static saveCart (cart) {
        localStorage.setItem('cart', JSON.stringify(cart))
    }

    static getCart () {
        return localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const ui = new UI()
    const products = new Products()
    //set up app
    ui.setupAPP()
    //get all products
    products.getProducts().then(products => {
        ui.displayProducts(products)
        Storage.saveProducts(products)
    }).then(() => {
        ui.getBagButton()
        ui.cartLogic()
    })

})

