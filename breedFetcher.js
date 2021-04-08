// REQUIRE LIBRARY & MODULES
const request = require('request');

// GET COMMAND LINE ARGUMENTS
const args = process.argv.slice(2);
const breed = args[0];

// CONSTANT VARIABLES
const endpoint = 'https://api.thecatapi.com/v1/breeds/search';

// FUNCTIONS DECLARATIONS
const makeRequest = (endpoint, breed) => {

  // MAKE GET REQUEST TO API END POINT
  request(`${endpoint}?q=${breed}`, (error, response, body) => {
    // EDE CASES:
    // If there's an error (ex. typo in domain name URL)
    if (error) {
      console.log(error);
      throw new Error(`Request Failed`);
    }
    // If request was successful (correct domain) but something is wrong in rest of URL
    if (response.statusCode !== 200) {
      console.log('statusCode:', response.statusCode);
      throw new Error(`Request Failed`);
    }

    // Convert JSON string into actual object if request goes well
    const data = JSON.parse(body);
    // console.log(data);
    // console.log(typeof data);

    // If data received is an empty array (meaning the name of the breed was invalid)
    if (data.length === 0) {
      throw new Error('Requested breed not found!');
    }

    // Print description of breed if all goes well
    console.log(data[0].description);
  });
};

// EXECUTIONS
makeRequest(endpoint, breed);