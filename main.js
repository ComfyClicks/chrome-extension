const apiKey = 'qGgpFFxDEDzPwlTbfIVdyPque7bG3KN2';
const locationKey = '37881_PC'; // locationKey for Los Angeles, CA

// Read the counter and the day from the storage
chrome.storage.local.get('data', result => {
  let jsonData = result.data || {counter: 0, date: null, data: {}};
  let counter = jsonData.counter;
  let storedDate = new Date(jsonData.date);

  // Get the current date
  let currentDate = new Date();

  if (currentDate.toDateString() !== storedDate.toDateString()) {
    // If the stored date is different from the current date, reset the counter
    counter = 0;
  }

  if (counter < 5) {
    fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${apiKey}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        // Increment the counter and write it back to the storage
        counter++;
        jsonData.counter = counter;
        jsonData.date = currentDate;
        jsonData.data = data;
        chrome.storage.local.set({data: jsonData});

        // DOM manipulation to put sunset time in
        const sunsetTime = document.createElement('div')
        sunsetTime.innerText = jsonData.data;
        document.getElementById('data').appendChild(sunsetTime);
        console.log(jsonData);
      })
      .catch(error => console.error('Error:', error));
  } else {
    console.log('API call limit reached for today');
  }
});

