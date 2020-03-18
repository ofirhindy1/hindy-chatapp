const request = require('request')

 const url = "https://api.darksky.net/forecast/9c45f95a15b16373bf2904d38593816c/37.8267,-122.4233?units=si"
 const urlmap = "https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1Ijoib2ZpcjA4IiwiYSI6ImNrN3c0MDVpcjAwY3UzaHQyY2F2OWNrcmwifQ.Gpe2et2NevQA8Ua_U9-6Ew"
 request({ url:url, json:true}, (error,response)=>{
    console.log(response.body.daily.data[0].summary+". Currently: "+response.body.currently.temperature+" deg out")    
})
request({url: urlmap, json:true},(error, response)=>{
    console.log(response.body.features[0].center[0]+" geo")
})