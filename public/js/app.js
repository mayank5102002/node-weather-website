const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const temperature = document.getElementById('temperature')
const message = document.getElementById('message')
const celsius = document.getElementById('celsius')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    const url = '/weather?address=' + location

    message.textContent = 'Loading...'
    temperature.textContent = ''
    celsius.textContent = ''

    fetch(url).then((result) => {
        result.json().then((data) => {
            if (data.error) {
                message.textContent = data.error
                temperature.textContent = ''
                celsius.textContent = ''
            } else {
                message.textContent = data.location
                temperature.textContent = data.temp
                celsius.textContent = '°C'
            }
        })
    })

})