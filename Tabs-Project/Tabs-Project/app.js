const btns = document.querySelectorAll('.tab-btn')
const about = document.querySelector('.about')
const articles = document.querySelectorAll('.content')

about.addEventListener('click', (e) => {
    const id = e.target.dataset.id
    if (id) {
        //remove active from other buttons and display matching one
        btns.forEach(btn => {
            btn.classList.remove('active')
            e.target.classList.add('active')
        })
        //remove articles and display matching one
        articles.forEach(article => {
            article.classList.remove('active')
        })
        const element = document.querySelector(`#${id}`)
        element.classList.add('active')
    }
})
