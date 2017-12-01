
const axios =require(`axios`)
const express = require('express')
const app = express();

//http://mydomain.com/weather?text=London
app.get('/weather', function (req, res) {
  const CITY =req.query.text;
  const WEATHERMAPAPIKEY =`bc8e073cd9f7011fd996a490fa14cf3c`;
  const WEATHERMAPURL =`http://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${WEATHERMAPAPIKEY}&unit=metric`;

  axios.get(WEATHERMAPURL)
  .then(function(response)
  {
    const weatherData =response.data;
    console.log(weatherData);
  res.json(
  {
    "text": `Weather in ${weatherData.name}(${weatherData.sys.country})`,
    "attachments": [
        {   "title" : weatherData.weather[0].description,
            "text": `The temperature is ${weatherData.main.temp}`,
		    "thumb_url" :`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`
        }
    ]
});
  })
  .catch(function (response) {
  res.json(response);
  });

});
const PORT=80;
app.listen(PORT,function()
{ console.log(`test ${PORT}!`);

});
