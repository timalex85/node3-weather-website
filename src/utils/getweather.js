const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=9759995c40f1b3285e69a5172eb0d0d3&query=${latitude},${longitude}&units=f`;
    
    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to weather service', undefined);
        } else if(body.error) {
            callback('Unable to find location', undefined);
        } else {
            const data = body.current;
            callback(undefined, {
               description: data.weather_descriptions[0],
               temperature: data.temperature,
               feelslike: data.feelslike
            })
        }  
    })
}

module.exports = forecast;