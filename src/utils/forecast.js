const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=0c471475d07d6d68d216c8305265823d&query=' + decodeURIComponent(latitude) + ',' + decodeURIComponent(longitude)

    request({ url, json: true }, (error, {body} = {}) => {
        if (error) {
            callback('Unable to connect to weather service.')
        } else if (body.success == false) {
            callback('Unable to find location')
        } else {
            const temp = body.current.temperature
            callback(undefined, temp)
        }
    })
}

module.exports = forecast
