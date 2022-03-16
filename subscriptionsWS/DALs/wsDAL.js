const axios = require('axios');

const getMovies = () => {
   return axios.get("https://api.tvmaze.com/shows");

}

const getMembers = () => {
    return axios.get("https://jsonplaceholder.typicode.com/users")
}


module.exports = {getMovies, getMembers}