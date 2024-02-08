const colors = ["green", "red", "rgba(133,122,200)", "#f15025", "yellow", "black", "orange", "tomato", "maroon", "purple", "violet"]
const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"]

const btn = document.querySelector('#btn-flipper')
const hexBtn = document.querySelector("#btn-hex-flipper")
const color = document.querySelector('.color')

const getRandomNumber = (length) => {
    return Math.floor(Math.random() * length)
}


btn.addEventListener('click', () => {
    const randomNumber = getRandomNumber(colors.length)
    document.body.style.backgroundColor = colors[randomNumber]
    color.textContent = colors[randomNumber]
})

hexBtn.addEventListener('click', () => {
    let hexColor = '#'
    for (let index = 0; index < 6; index++) {
        hexColor += hex[getRandomNumber(hex.length)]
    }
    document.body.style.backgroundColor = hexColor
    color.textContent = hexColor
})