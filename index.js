// REQUIRE LIBRARY & MODULES
const { fetchBreedDescription } = require('./breedFetcher');

// GET COMMAND LINE ARGUMENTS
const args = process.argv.slice(2);
const breedName = args[0];

// FUNCTION CALL (breedName, callback)
fetchBreedDescription(breedName, (error, desc) => {
  // Check if we have an error (error = string)
  if (error) {
    console.log('Error fetch details:', error);
  // If there's no error (error is falsy: null, undefined)
  } else {
    console.log(desc);
  }
});