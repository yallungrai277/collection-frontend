// ****** SELECT ITEMS **********
const alert = document.querySelector('.alert')
const form = document.querySelector('.grocery-form')
const grocery = document.querySelector('#grocery')
const submitBtn = document.querySelector('.submit-btn')
const container = document.querySelector('.grocery-container')
const list = document.querySelector('.grocery-list')
const clearBtn = document.querySelector('.clear-btn')


// edit option
let editElement
let editFlag = false
let editId = ''

// ****** FUNCTIONS **********

// setup items
const setUpItems = () => {
    let items = getLocalStorage()
    if (items.length > 0) {
        items.forEach(item => {
            createDOMItems(item.id, item.value)
        })
        container.classList.add('show-container')
    }
}

//display alert
const displayAlert = (text, action) => {
    alert.textContent = text
    alert.classList.add(`alert-${action}`)

    //remove alert
    setTimeout(() => {
        alert.textContent = ''
        alert.classList.remove(`alert-${action}`)
    }, 3000);
}

//clear all items
const clearItems = () => {
    const items = document.querySelectorAll('.grocery-item')
    if (items.length > 0) {
        items.forEach(item => {
            list.removeChild(item)
        });
    }
    container.classList.remove('show-container')
    displayAlert('Shopping List is empty', 'success')
    setBackToDefault()
    localStorage.removeItem('shoppingList')
}

//setback to default
const setBackToDefault = () => {
    grocery.value = ''
    editFlag = false
    editId = ''
    submitBtn.textContent = 'submit'
}

//delete item
const deleteItem = (e) => {
    const element = e.currentTarget.parentElement.parentElement
    const currentId = element.dataset.id
    console.log(currentId)
    list.removeChild(element)
    if (list.children.length === 0) {
        container.classList.remove('show-container')
    }
    displayAlert('Item Removed', 'success')
    setBackToDefault()
    //remove from local storage
    removeFromLocalStorage(currentId)
}


//edit item
const editItem = (e) => {
    const element = e.currentTarget.parentElement.parentElement
    //set edit item
    editElement = e.currentTarget.parentElement.previousElementSibling
    //set form value
    grocery.value = editElement.innerHTML
    editFlag = true
    editId = element.dataset.id
    submitBtn.textContent = 'Edit'
}


//add item
const addItem = (e) => {
    e.preventDefault()
    const value = grocery.value.trim()
    const id = new Date().getTime().toString()
    if (value && !editFlag) {
        createDOMItems(id, value)
        //display alert
        displayAlert('Item added to the list', 'success')
        // show container
        container.classList.add('show-container')
        //add to local storage
        addToLocalStorage(id, value)
        //set back to defaul
        setBackToDefault()

    } else if (value && editFlag) {
        editElement.innerHTML = value
        displayAlert('Updated Succesfully', 'success')
        //edit local storage
        editLocalStorage(editId, value)
        setBackToDefault()
    } else {
        displayAlert('Empty Value', 'danger')
    }
}

//creating dom items
const createDOMItems = (id, value) => {
    const element = document.createElement('article')
    //add class
    element.classList.add('grocery-item')
    //add id
    const attr = document.createAttribute('data-id')
    attr.value = id
    element.setAttributeNode(attr)
    element.innerHTML = `
            <p class="title">${value}</p>
            <div class="btn-container">
              <button type="button" class="edit-btn">
                <i class="fas fa-edit"></i>
              </button>
              <button type="button" class="delete-btn">
                <i class="fas fa-trash"></i>
              </button>
            </div>`
    const deleteBtn = element.querySelector('.delete-btn')
    const editBtn = element.querySelector('.edit-btn')

    deleteBtn.addEventListener('click', deleteItem)
    editBtn.addEventListener('click', editItem)
    //Append Child
    list.appendChild(element)
}

// ****** EVENT LISTENERS **********

//submit form
form.addEventListener('submit', addItem)
//clear items
clearBtn.addEventListener('click', clearItems)
//load items
window.addEventListener('DOMContentLoaded', setUpItems)

// ****** LOCAL STORAGE **********

//add to local storage
const addToLocalStorage = (id, value) => {
    const grocery = { id, value }
    let items = getLocalStorage()
    items.push(grocery)
    localStorage.setItem('shoppingList', JSON.stringify(items))
}


const removeFromLocalStorage = (id) => {
    let items = getLocalStorage()
    items = items.filter(item => item.id !== id)
    localStorage.setItem('shoppingList', JSON.stringify(items))
}

const editLocalStorage = (id, value) => {
    let items = getLocalStorage()
    items = items.map(item => {
        if (item.id == id) {
            item.value = value
        }
        return item
    })
    localStorage.setItem('shoppingList', JSON.stringify(items))
}

const getLocalStorage = () => {
    return localStorage.getItem('shoppingList') ? JSON.parse(localStorage.getItem('shoppingList')) : []
}
