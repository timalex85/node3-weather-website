const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/getweather');
const geocode = require('./utils/geocode');
const { get } = require('request');

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve 
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Sonya Schwartz'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Sonya Schwartz'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'If you need help let us know',
        title: 'Help Page ',
        name: 'Sonya Schwartz'
    });
})

app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address,  (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({
                error
            })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({ error })
            }

        res.send({
            forecast: forecastData,
            location,
            address: req.query.address
        })

        })

    })

})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) =>{
    res.render('help404', {
        title: '404',
        message: 'Help article not found',
        name: 'Sonya Schwartz'
    })
})

app.get('*', (req, res) => {
    res.render('all404', {
        title: '404',
        message: 'Page not found',
        name: 'Sonya Schwartz'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
});
