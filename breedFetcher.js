// REQUIRE LIBRARY & MODULES
const request = require('request');

// FUNCTIONS DECLARATIONS
const fetchBreedDescription = function(breedName, callback) {
  const endpoint = 'https://api.thecatapi.com/v1/breeds/search';

  // MAKE GET REQUEST TO API END POINT
  request(`${endpoint}?q=${breedName}`, (error, response, body) => {
    // ERRORS IN REQUEST
    if (error) {
      // If there's an error (ex. typo in domain name URL)
      callback('Request Failed! Invalid domain name', null);
      return;
    }
    if (response.statusCode !== 200) {
      // If request was successful (correct domain) but something is wrong in rest of URL
      callback(`Request Failed! Status Code: ${response.statusCode}`, null);
      return;
    }
    // IF REQUEST WAS SUCCESSFUL
    // Convert JSON string into actual object if request goes well
    const data = JSON.parse(body);

    // If data received is an empty array (meaning the name of the breed was invalid)
    if (data.length === 0) {
      callback('Requested breed not found!', null);
    } else {
      callback(error, data[0].description);
    }
  });
};

module.exports = { fetchBreedDescription };