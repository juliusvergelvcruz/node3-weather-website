const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoianVsaXVzdmVyZ2VsdmNydXoiLCJhIjoiY2swNTE2cWNhMmx4MDNjcWQ4OW9mMjhkMyJ9.lncDqv5ARcQD57t3KYUFwA'

    request({ url: url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            
            const { center, place_name } = body.features[0]
            console.log(center[0])
            console.log(center[1])
            console.log(place_name)
            callback(undefined, {
                latitude: center[0],
                longitude: center[1],
                location: place_name
            })
        }
    })
}

module.exports = geocode