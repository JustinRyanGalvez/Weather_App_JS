if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

weather = {
    temperature : 0,
    humidity : 0,
    wind : 0
}


const KEY = process.env.OPENWEATHER_API_KEY
const axios = require('axios')
const express = require('express')
const app = express()

app.use(express.json())
app.use(express.static('public'))

app.post('/weather', (req, res) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${req.body.latitude}&lon=${req.body.longitude}&appid=${KEY}&units=imperial`
    console.log(req.body)
    axios({
        url: url,
        responseType: 'json'
    }).then(data => res.json(data.data.weather)).catch(err => {console.log(err)})

    // Gets temp data from main/wind header
    fetch(url)
        .then(function(resp){
            return resp.json();
        }).catch(err => {console.log(err)})
        .then(function(data) {
            // Export this data to script file
            weather = {
                temperature : data.main.temp,
                humidity : data.main.humidity,
                wind : data.wind.speed
            }
            module.exports = {weather};
        }).catch(err => {console.log(err)})
})



app.listen(3000, () => {
    console.log('Server started')
})