/* Importing Libraries */
const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

/* Defining Paths/Directories */
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


/* COnfiguring the (app) Express Settings */
app.set('view engine','hbs')
app.set('views', viewsPath)   //Change the path of Views folder from the default

/* Registering the Partials */
hbs.registerPartials(partialsPath)

/* Adding on the Express Middleware Stack */
app.use(express.static(publicDirectoryPath))


/* Get Requests */
app.get('' , (req , res ) => {                          // '' -> no extension. this is the homepage or index
                                                        // app.get is a listener to URL. if user request for a URL that matches this get request, it will execute the callback of it.
    res.render('index',{                                // res.render(name_of_hbs_file, callback_func)
        title: 'Weather Page',
        module: 'Weather',
        name: 'julius.vergel.v.cruz'
    })
 
})

app.get('/about' , (req , res ) => {
    res.render('about',{
        title: 'About',
        company: 'Accenture',
        name: 'julius.vergel.v.cruz'
    })
})
app.get('/help' , (req , res ) => {
    res.render('help', {
        title: 'Help Page',
        message: 'The quick brown fox jumps over a lazy dog',
        name: 'julius.vergel.v.cruz'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
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

app.get('/help/*',(req,res) =>{
    res.render('404',{
        title: 'HELP: ERROR 404',
        name: 'julius.vergel.v.cruz'
    })
})
app.get('*',(req,res) =>{
    res.render('404',{
        title: 'ERROR 404',
        name: 'julius.vergel.v.cruz'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})
