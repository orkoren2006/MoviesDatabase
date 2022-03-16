const DAL = require('../DALs/wsDAL');
const MoviesModel = require('./moviesModel');

const getMoviesFromWS = async () => {
    let movies = [];
    let resp = await DAL.getMovies();

    resp.data.forEach(movie => {
        let obj = {};
        obj.name = movie.name
        obj.genres = movie.genres
        obj.image = movie.image
        obj.date = movie.premiered
        movies.push(obj);
    })

    _writeMovies(movies);
}


const _writeMovies = movies => {
    movies.forEach(item => {
        return new Promise((resolve, reject) => {
            let movie = new MoviesModel({
                name: item.name,
                genres: item.genres,
                image: item.image,
                date: item.date
            });

            movie.save(function (err) {
                if (err) {
                    reject(err)
                }
                else {
                    resolve('created')
                }
            })
        })
    }
    )
};

const getMovies = () => {
    return new Promise((resolve, reject) => {
        MoviesModel.find({}, function(err,data) {
            if(err) {
                reject(err)
            }else {
                resolve(data)
            }
        })
    })
};

const getMovie = id => {
    return new Promise((resolve, reject) => {
        MoviesModel.findById(id, function(err,data){
            if(err) {
                reject(err)
            }else {
                resolve(data)
            }
        })
    })
};


const createMovie = obj => {
    return new Promise((resolve, reject) => {
        let movie = new MoviesModel({
            name: obj.name,
            genres: obj.genres,
            image: {medium: obj.image, original: obj.image},
            date: obj.date
        });

        movie.save( err => {
            if (err) {
                reject(err)
            } else {
                resolve('created')
            }
        })
    })
};


const updateMovie = (id, obj) => {
    return new Promise((resolve,reject) => {
        MoviesModel.findByIdAndUpdate(id, {
            name: obj.name,
            genres:obj.genres,
            image:{medium: obj.imageUrl},
            date: obj.premiered
        }, err => {
            if(err) {
                reject(err)
            } else {
                resolve('updated mongo')
            }
        })
    })
};

const deleteMovie = id => {
    return new Promise((resolve, reject) => {
        MoviesModel.findByIdAndDelete(id, function(err) {
            if(err) {
                reject(err)
            } else {
                resolve('deleted')
            }
        })
    })
};

module.exports = { getMoviesFromWS, createMovie, updateMovie, getMovies, getMovie, deleteMovie};