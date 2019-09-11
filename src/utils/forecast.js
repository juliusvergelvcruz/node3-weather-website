const request = require('request')

const forecast = (longitude, latitude, callback) => {
    const url = 'https://api.darksky.net/forecast/ea141216bfe055a8b935335f4e9fd717/' + latitude + ',' + longitude

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            console.log(response.body)
            callback('Unable to connect to weather service!', undefined)
        } else if (response.body.error) {
            callback('Unable to find location', undefined)
        } else {
            const { summary,temperature,precipProbability } = response.body.daily.data[0]
            callback(undefined, 
                (summary + ". It is currently " + temperature + " degrees out. There is a " + precipProbability + "% chance of rain.")
            )   
        }
    })

}

module.exports = forecast
