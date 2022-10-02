const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()
const port = process.env.PORT || 3000

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewspath = path.join(__dirname, '../templates/views')
const partialspath = path.join(__dirname, '../templates/partials')

//Setup handlebars and views location
app.set('view engine', 'hbs')
app.set('views', viewspath)

//Setup partials for handlebars
hbs.registerPartials(partialspath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Mayank'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Mayank'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'Help Message',
        name: 'Mayank'
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'No location was provided'
        })
    }

    const location = req.query.address
    geocode(location, (error, { latitude, longitude, place } = {}) => {
        if (error) {
            return res.send({
                error: error
            })
        }

        forecast(latitude, longitude, (error, forecastdata) => {
            if (error) {
                return res.send({
                    error: error
                })
            }

            return res.send({
                latitude: latitude,
                longitude: longitude,
                location: place,
                temp: forecastdata
            })
        })
    })

})

app.get('/help/*', (req, res) => {
    res.render('pagenotfound', {
        title: '404',
        message: 'Help Article Not Found',
        name: 'Mayank'
    })
})

app.get('*', (req, res) => {
    res.render('pagenotfound', {
        title: '404',
        message: 'Page Not Found',
        name: 'Mayank'
    })
})

app.listen(port, () => {
    console.log('Server is up and running on port ' + port)
})