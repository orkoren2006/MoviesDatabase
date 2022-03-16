const axios = require('axios');


const getMembers = () => {
     return axios.get("http://localhost:8001/members");
 
};

const addMember = obj => {
    return axios.post("http://localhost:8001/members/", obj)
}

const updateMember = (obj,id) => {
    return axios.put("http://localhost:8001/members/"+id,obj)
}

const deleteMember = id => {
    return axios.delete("http://localhost:8001/members/"+id)
}

const getMovies = () => {
    return axios.get("http://localhost:8001/movies")
};

const getMovie = id => {
    return axios.get("http://localhost:8001/movies/"+id)
}

const addMovie = obj => {
    return axios.post("http://localhost:8001/movies", obj);
}

const updateMovie = (obj,id) => {
    return axios.put("http://localhost:8001/movies/"+id, obj)
}

const deleteMovie = id => {
    return axios.delete("http://localhost:8001/movies/"+id);
}

const getSubscriptions = () => {
    return axios.get("http://localhost:8001/subscriptions")
};


const addSubscription = obj => {
    return axios.post("http://localhost:8001/subscriptions", obj)
}

const updateSubscription = (obj,id) => {
    return axios.put("http://localhost:8001/subscriptions/"+id,obj)
};

const deleteSubscription = id => {
    return axios.delete("http://localhost:8001/subscriptions/"+id)
}


module.exports= {
    getMembers, 
    addMember,
    updateMember,
    deleteMember,
    getMovies, 
    getMovie, 
    addMovie, 
    getSubscriptions, 
    updateMovie, 
    deleteMovie, 
    addSubscription,
    updateSubscription,
    deleteSubscription
}


