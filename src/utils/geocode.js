const request = require('postman-request')

const geocode = (location, callback) => {
    const url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + decodeURIComponent(location) + '&key=AIzaSyB0zaBTkirrkosyejNU-trwmZ5Wnohh4bk'

    request({ url, json: true }, (error, {body} = {}) => {
        if (error) {
            callback('Unable to connect to geo location service.')
        } else if (body.results.length == 0) {
            callback('Unable to find location')
        } else {
            const data = {
                latitude : body.results[0].geometry.location.lat,
                longitude : body.results[0].geometry.location.lng,
                place : body.results[0].formatted_address
            }
            callback(undefined, data)
        }
    })
}

module.exports = geocode