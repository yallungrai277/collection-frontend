const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const giveAway = document.querySelector('.giveaway')
const deadline = document.querySelector('.deadline')
const items = document.querySelectorAll('.deadline-format h4')

let tempDate = new Date()
let tempYear = tempDate.getFullYear()
let tempMonth = tempDate.getMonth()
let tempDay = tempDate.getDate()

// let futureDate = new Date(2021, 0, 25, 11, 7, 0)
const futureDate = new Date(tempYear, tempMonth, tempDay + 10, 11, 30, 0)
const year = futureDate.getFullYear()
const hours = futureDate.getHours()
const minutes = futureDate.getMinutes()

let month = futureDate.getMonth()
month = months[month]

const date = futureDate.getDate()

let weekday = futureDate.getDay()
weekday = weekdays[weekday]

giveAway.textContent = `Giveaway ends on ${weekday}, ${date} ${month}  ${year} ${hours}:${minutes}`
//future time in ms
const futureTime = futureDate.getTime()

const getRemainingTime = (futureTime) => {
  const todaysTime = new Date().getTime()
  const t = futureTime - todaysTime //in milliseconds      
  //1s = 1000ms
  //1m = 60s
  //1hr = 60min
  //1d = 24hr
  //value in milliseconds
  const oneDay = 24 * 60 * 60 * 1000
  const oneHour = 60 * 60 * 1000
  const oneMinute = 60 * 1000
  //Calculate days
  const days = Math.floor(t / oneDay)
  const hours = Math.floor((t % oneDay) / oneHour)
  const minutes = Math.floor((t % oneHour) / oneMinute)
  const seconds = Math.floor((t % oneMinute) / 1000)

  //set values array
  const values = [days, hours, minutes, seconds]

  const format = item => {
    if (item < 10) {
      return item = `0${item}`
    }
    else {
      return item
    }
  }
  items.forEach((item, index) => {
    item.innerHTML = format(values[index])
  })
  if (t < 0) {
    clearInterval(countdown)
    deadline.innerHTML = `<h4 class="expired">Sorry this giveaway has expired</h4>`
  }
}
//countdown
let countdown = setInterval(() => {
  getRemainingTime(futureTime)
}, 1000)

