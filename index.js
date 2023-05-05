const pencil = document.getElementById('pencil');

const asd = new Event('someRandomElementUKnow')

pencil.addEventListener('click', (e) => {
    pencil.classList.toggle('active')
    pencil.dispatchEvent(asd)
})

pencil.addEventListener('someRandomElementUKnow', e => console.log(e))