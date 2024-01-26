
document.addEventListener('DOMContentLoaded', function() {
  const apiKey = '5HqJ14xp14CAsFnQltVOEQowGAeN6jvc';
  const locationKey = '37881_PC'; // locationKey for Los Angeles, CA

  // Fetch the data from the API
  fetch(`https://dataservice.accuweather.com/forecasts/v1/daily/1day/${locationKey}?apikey=${apiKey}&details=true`)

    .then(response => response.json())
    .then((data) => {
      console.log(data);

      // Write the data to the storage
      chrome.storage.local.set({data: data});

      // DOM manipulation to put sunset time in
      const sunsetTime = document.createElement('div')
      sunsetTime.innerText = data.DailyForecasts[0].Sun.Set;
      document.getElementById('data').appendChild(sunsetTime);
      console.log(data);
    })
    .catch(error => console.error('Error:', error));
  });