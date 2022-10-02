const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const temperature = document.getElementById('temperature')
const message1 = document.getElementById('message1')
const celsius = document.getElementById('celsius')
const message2 = document.getElementById('message2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    const url = '/weather?address=' + location

    message1.textContent = 'Loading...'
    temperature.textContent = ''
    celsius.textContent = ''
    message2.textContent = ''

    fetch(url).then((result) => {
        result.json().then((data) => {
            if (data.error) {
                message1.textContent = data.error
                temperature.textContent = ''
                celsius.textContent = ''
                message2.textContent = ''
            } else {
                message1.textContent = data.location
                temperature.textContent = data.temp
                celsius.textContent = '°C'
                message2.textContent = 'Feels like ' + data.feelslike + '°C out with humidity ' 
                + data.humidity + 'g/m³'
            }
        })
    })

})