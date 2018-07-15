var express = require('express');
var router = express.Router();
var FilmFavorite = require('./../models/film.favorite.model');


router.get('/', function(request, response){
    return response.send({message: '|Connected to the server via the port 3000!'});
});


router.get('/favorites', function(req, res) {
        var query = { _id: { $in: req.query.filmIds.split(',')} };
        FilmFavorite.find(query, function(err, favorites) {
            if (err) throw err;
            res.send(favorites);
        });
    });
router.post('/favorites', function(req, res) {
        var favorite = new FilmFavorite({
            _id: req.body.filmId,
            favorite: true
        });
        favorite.save(function(err) {
            if (err) throw err;
            res.send(favorite);
        });
    }).delete('/favorites/:id', function(req, res) {
        var query = { _id:  req.params.id };
        FilmFavorite.deleteOne(query, function(err) {
            if (err) throw err;
            res.send({ _id:  req.params.filmId });
        });
    });

module.exports = router;
